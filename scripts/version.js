// Could be a bash one-liner but this works cross platform
const { npm_package_name: name, npm_package_version: version } = process.env;
console.log(`export const name = "${name}", version="${version}";`);