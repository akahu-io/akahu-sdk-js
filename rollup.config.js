import typescript from "@rollup/plugin-typescript";

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs", // Output CommonJS to support node.js v12
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm", // Output ES Module to take advantage of newer tooling
      sourcemap: true,
    },
  ],
  plugins: [
    // Run source files through tsc prior to bundling.
    // The typescript plugin inherits config from `tsconfig.json`.
    // https://github.com/rollup/plugins/blob/master/packages/typescript/README.md
    typescript({
      // Compilation targeting node.js v12 and above as per:
      // https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping#recommended-node-tsconfig-settings
      // but using `module: "ES2015"` which is then bundled by Rollup: https://stackoverflow.com/a/66812779/3175260
      target: "ES2015",
      module: "ES2015",
      outDir: "./dist",
      exclude: ["__tests__/**/*.ts"],
    }),
  ],
  // Mark external dependencies to avoid 'Unresolved dependencies' warnings.
  external: Object.keys(packageJson.dependencies),
};
