import terser from "@rollup/plugin-terser";
import url from "@rollup/plugin-url";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
require("dotenv").config();

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/cashover.js",
      format: "iife",
      name: "CashOver",
    },
    {
      file: "dist/cashover.min.js",
      format: "iife",
      name: "CashOver",
      plugins: [terser()],
    },
  ],
  plugins: [
    url({
      limit: 0, // Never inline
      include: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
      emitFiles: true,
      fileName: "[name][extname]", // Keep original filename
      destDir: "dist/assets",
    }),
    replace({
      preventAssignment: true,
      values: {
        __CDN_DOMAIN__: JSON.stringify(process.env.cdnDomain),
        __SDK_VERSION__: JSON.stringify(process.env.npm_package_version),
      },
    }),
    commonjs(),
    resolve(),
  ],
};
