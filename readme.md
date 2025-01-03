# remark-lint-docusaurus-empty-lines-around-admonition-content

[`remark-lint`](https://github.com/remarkjs/remark-lint) rule to warn when an admonition does not have empty lines around its content.

Useful to prevent shooting yourself in the foot when using Docusaurus and Prettier (see [Admonitions – Usage with Prettier](https://docusaurus.io/docs/markdown-features/admonitions#usage-with-prettier)).

## Contents

*   [What is this?](#what-is-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
*   [Examples](#examples)
*   [License](#license)

## What is this?

This package is a [unified](https://github.com/unifiedjs/unified) ([remark](https://github.com/remarkjs/remark)) plugin, specifically a `remark-lint` rule.

Lint rules check markdown code style.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

In Node.js (16.0+), install with npm:

```sh
npm install --save-dev remark-lint-docusaurus-empty-lines-around-admonition-content
```

## Use

On the API:

```js
import {read} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {remark} from 'remark'
import remarkLint from 'remark-lint'
import remarkLintDocusaurusEmptyLinesAroundAdmonitionContent from 'remark-lint-docusaurus-empty-lines-around-admonition-content'

main()

async function main() {
  const file = await remark()
    .use(remarkLint)
    .use(remarkLintDocusaurusEmptyLinesAroundAdmonitionContent)
    .process(await read('example.md'))

  console.error(reporter(file))
}
```

On the CLI:

```sh
remark --use remark-lint --use remark-lint-docusaurus-empty-lines-around-admonition-content example.md
```

On the CLI in a config file (here a `package.json`):

```diff
 …
 "remarkConfig": {
   "plugins": [
     …
     "remark-lint",
+    "remark-lint-docusaurus-empty-lines-around-admonition-content",
     …
   ]
 }
 …
```

## API

`unified().use(remarkLintNoUnneededFullReferenceLink[, config])`

This rule supports standard configuration that all remark lint rules accept (such as `false` to turn it off or `[1, options]` to configure it).

There are no options.

## Examples

See [test/test.md](test/test.md) or run the test with `npm test`.

## License

[MIT](https://github.com/remarkjs/remark-lint/blob/main/license) © [Riccardo Odone](https://odone.me)
