# Developing guide
This document is intended to assist in the continued maintenance and development of this SDK.
It is used to document the dev, build, and deploy workflow and configurations for this project.

- [Command reference](#command-reference)
- [Build and packaging](#build-and-packaging)
- [Documentation build](#documentation-build)
- [Publishing to npm](#publishing-to-npm)

## Command reference

| Command           | Description                                                               |
|:------------------|:--------------------------------------------------------------------------|
| `npm run build`   | Runs a full production build of the project. Output is written to `dist/` |
| `npm run test`    | Runs the test suite located under `__tests__/`                            |
| `npm run docs`    | Builds the API documentation. Output is written to `docs/`                |


## Build and packaging
The build process consists of two stages that involve both the typescript compiler and
[rollup](https://rollupjs.org). This process allows us to output both CommonJS and ES Modules, as
well simplify selection of an appropriate build target (currently `ES2019` for compat with Node.js
v12.x.x).

### 1. `build:package`
1. The typescript compiler `tsc` is used to pre-compile the typescript source code to vanilla ES
  modules (`ES2015` spec) that are compatible with the chosen build target (`ES2019`). This stage is
  performed by [`@rollup/plugin-typescript`](https://github.com/rollup/plugins/tree/master/packages/typescript)
  during invocation of `rollup -c`.
2. Rollup bundles the output from stage 1 into single-file modules in both CommonJS and ES Module
  format. The resulting bundles are written to `dist/`.

### 2. `build:types`
1. `tsc` is manually invoked again with different configuration to emit only the type definitions.
  These are also output to `dist/`.


## Documentation build
Source code documentation is written using the [tsdoc](https://tsdoc.org/) commenting standard. The
[typedoc](https://github.com/TypeStrong/typedoc) documentation generator combines these tsdoc style
comments with type information emitted by `tsc` to produce full API docs with type defs included
"for free".

However, both the `tsdoc` standard and `typedoc` documentation generator are fairly immature, so
they come with some quirks.

### Plugins
The following plugins have been installed to help improve output quality:

#### [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
Used to emit output in markdown so it can be easily viewed directly on github. In the future it may be
nicer to revert usage of this plugin and publish the 'default' HTML output from typedoc to something
like github pages.

#### [typedoc-plugin-no-inherit](https://www.npmjs.com/package/typedoc-plugin-no-inherit)
Enables usage of the `@noInheritDoc` tag on class docstrings to stop `typedoc` from including
documentation for methods/properties/etc. inherited from a base class. Of particular use for custom
error classes that inherit from `Error`.

#### [typedoc-plugin-merge-modules](https://www.npmjs.com/package/typedoc-plugin-merge-modules)
One limitation of `typedoc` is that it only generates documentation for definitions that are
exported from the project 'entrypoint'. This means that in order to document functionality that is
not directly exported from `src/index.ts` (for example the contents of each 'resource' class), we have
to list these modules as additional entrypoints for typedoc to gather documentation from. When
working with multiple entrypoints, typedoc separates each entrypoint into a new 'module' in the
documentation. In our case, this is not what we want, as in reality all of our code is part of just
a single module. This plugin removes this spurious module grouping and merges all 'modules' into a
single top-level grouping.

### Known issues
The design decision by typedoc to only document exported definitions is a source of contention. A
plugin exists [typedoc-plugin-not-supported](https://www.npmjs.com/package/typedoc-plugin-not-exported)
that purports to fix this behaviour, but it doesn't seem to be maintained or functional with the most
recent typedoc release. Some relevant discussions:

- https://github.com/TypeStrong/typedoc/issues/1569
- https://github.com/TypeStrong/typedoc/issues/1657
- https://github.com/TypeStrong/typedoc/issues/1577

In addition, typedoc is as of yet unable to produce clean type definitions for intersection and union
types. Relevant discussions:

- https://github.com/TypeStrong/typedoc/issues/1540
- https://github.com/TypeStrong/typedoc/issues/1021
- https://github.com/TypeStrong/typedoc/issues/1258


## Publishing to npm
Use the following process to publish a new SDK version to npm.

### 1. Validate changes
1. `npm run test`
2. `npm run build`
3. `npm run docs`
4. Commit any changes from ^^^

### 2. Bump version
1. Bump `package.json` version (will also add git tag and commit):
    - [`npm version [major | minor | patch]`](https://docs.npmjs.com/cli/v7/commands/npm-version)
2. Rebuild docs with new version number: `npm run docs`
3. Rebuild pkg with new version number: `npm run build`
4. Amend version commit with any changes from 6 & 7:
    - Stage changes: `git add ...`
    - Amend previous commit: `git commit --amend --no-edit`

### 3. Publish to npm
1. [`npm publish`](https://docs.npmjs.com/cli/v7/commands/npm-publish)
