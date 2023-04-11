@MomsFriendlyDevCo/eslint
=========================
ESLint Rules for Mom's Friendly Dev Co.

Installation
------------
Merge the following into `package.json`:

```json
{
  "scripts": {
    "lint": "eslint --ext .doop --ext .js --ext .vue ."
  },
  "eslintConfig": {
    "extends": [
      "@momsfriendlydevco"
    ],
    "parserOptions": {
      "ecmaVersion": "latest"
    }
  }
}
```

See [@Doop/ESM-Loader](https://github.com/MomsFriendlyDevCo/doop-esm-loader) for more integration details.
