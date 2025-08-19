import terser from "@rollup/plugin-terser";
import url from "@rollup/plugin-url";

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
    }),
  ],
};
