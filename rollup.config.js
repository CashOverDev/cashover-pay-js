import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/cashover.js",
      format: "iife",
      name: "CashOver", // global namespace for browser
    },
    {
      file: "dist/cashover.min.js",
      format: "iife",
      name: "CashOver",
      plugins: [terser()],
    },
  ],
};
