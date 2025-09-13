const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

function generateSRI(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("sha384");
  hashSum.update(fileBuffer);
  const hash = hashSum.digest("base64");
  return `sha384-${hash}`;
}

const version = process.env.npm_package_version;
const environment = process.env.environment;
if (!version) {
  throw new Error(`SDK version not specified`);
}
const files = ["dist/cashover.js", "dist/cashover.min.js"];

const integrity = {
  version: version,
  environment: environment,
  generated: new Date().toISOString(),
  files: {},
};

console.log(`🚀🔐 Generating SRI hashes for ${environment}...`);

files.forEach((file) => {
  if (fs.existsSync(file)) {
    const fileName = path.basename(file);
    integrity.files[fileName] = generateSRI(file);
    console.log(
      `✅ ${fileName}: ${integrity.files[fileName].substring(0, 20)}...`
    );
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

// Write integrity file
fs.writeFileSync("dist/integrity.json", JSON.stringify(integrity, null, 2));

console.log("✅ SRI hashes generated successfully");
console.log(`📁 Files available in: dist/`);
