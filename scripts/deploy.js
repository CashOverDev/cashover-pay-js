const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");
require("dotenv").config();

async function deploySdk() {
  const version = process.env.npm_package_version;
  const environment = process.env.environment;
  const projectId = process.env.projectId;
  const cdnUrl = `https://${process.env.cdnDomain}`;

  if (!version) {
    throw new Error(`SDK version not specified`);
  }
  const bucketName = `cashover-${environment}-sdks`;

  console.log(`🚀 Deploying to ${environment} CDN...`);
  console.log(`📦 Version: ${version}`);
  console.log(`🪣 Bucket: ${bucketName}`);

  const storage = new Storage({
    projectId: projectId,
  });
  const bucket = storage.bucket(bucketName);

  // Files to upload
  const filesToUpload = [
    { local: "dist/cashover.js", remote: `js-sdk/${version}/cashover.js` },
    {
      local: "dist/cashover.min.js",
      remote: `js-sdk/${version}/cashover.min.js`,
    },
    {
      local: "dist/integrity.json",
      remote: `js-sdk/${version}/integrity.json`,
    },

    // Latest symlinks
    { local: "dist/cashover.js", remote: "js-sdk/latest/cashover.js" },
    { local: "dist/cashover.min.js", remote: "js-sdk/latest/cashover.min.js" },
    { local: "dist/integrity.json", remote: "js-sdk/latest/integrity.json" },
  ];
  // Find all files under dist/assets (images, icons, etc.)
  const assetFiles = globSync("dist/assets/**/*.*", { nodir: true });

  for (const assetPath of assetFiles) {
    // Get relative path *after* dist/, e.g. "assets/logo.png"
    const relative = path.relative("dist", assetPath);

    // Upload under versioned path
    filesToUpload.push({
      local: assetPath,
      remote: `js-sdk/${version}/${relative}`,
    });
    // assets are not pushed to latest as they are always loaded from a versioned path in the code
  }

  try {
    for (const file of filesToUpload) {
      if (fs.existsSync(file.local)) {
        console.log(`⬆️  Uploading ${file.local} -> ${file.remote}`);

        const metadata = {
          contentType: getContentType(file.remote),
          cacheControl: file.remote.includes("latest/")
            ? "public, max-age=300" // 5 minutes for latest
            : "public, max-age=31536000, immutable", // 1 year for versioned
        };

        await bucket.file(file.remote).save(fs.readFileSync(file.local), {
          metadata: metadata,
        });

        console.log(`✅ Uploaded: ${file.remote}`);
      } else {
        console.log(`⚠️  File not found: ${file.local}`);
      }
    }

    // Update versions manifest
    await updateVersionsManifest(bucket, version);

    console.log(`🎉 ${environment} deployment completed!`);
    console.log(`🔗 CDN URL: ${cdnUrl}/js-sdk/${version}/`);
    console.log(`🔗 Latest:${cdnUrl}/js-sdk/latest/`);
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    ".js": "application/javascript",
    ".json": "application/json",
    ".html": "text/html",
    ".map": "application/json",
  };
  return types[ext] || "text/plain";
}

async function updateVersionsManifest(bucket, newVersion) {
  console.log("📝 Updating versions manifest...");
  const environment = process.env.environment;

  let versions = {
    versions: [],
    latest: "",
    environment: environment,
    updated: new Date().toISOString(),
  };

  try {
    const [versionFile] = await bucket.file("js-sdk/versions.json").download();
    versions = JSON.parse(versionFile.toString());
  } catch (error) {
    console.log("📄 Creating new versions manifest");
  }

  if (!versions.versions.includes(newVersion)) {
    versions.versions.push(newVersion);
    versions.versions.sort((a, b) => {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });
    versions.latest = newVersion;
    versions.updated = new Date().toISOString();
  }

  await bucket
    .file("js-sdk/versions.json")
    .save(JSON.stringify(versions, null, 2), {
      metadata: {
        contentType: "application/json",
        cacheControl: "public, max-age=300",
      },
    });

  console.log("✅ Versions manifest updated");
}

deploySdk().catch(console.error);
