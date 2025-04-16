// Could be a bash one-liner but this works cross platform
require("fs").writeFileSync(
  "src/version.ts",
  `export const version = "${process.env.npm_package_version}";`
);
require("child_process").exec(
  `git checkout -b ${process.env.npm_package_version}`
);
