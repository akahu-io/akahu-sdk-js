import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs', // commonJS
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Modules
      sourcemap: true,
    },
  ],
  plugins: [
    // Run source files through tsc prior to bundling.
    // The typescript plugin inherits config from `tsconfig.json`, which is where most of the juicy details are configured.
    typescript(),  // https://github.com/rollup/plugins/blob/master/packages/typescript/README.md
  ],
  // Mark external dependencies to avoid 'Unresolved dependencies' warnings.
  external: Object.keys(packageJson.dependencies),
};
