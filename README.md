@MomsFriendlyDevCo/ESLint-Config
================================
ESLint Rules for Mom's Friendly Dev Co.

Installation
------------
1. Install version 9 or above of eslint + this package

```shell
npm i -D eslint @momsfriendlydevco/eslint-config
```

2. Add this template `eslint.config.js` file to the root of your main module / project:


```javascript
import RulesMFDC from '@momsfriendlydevco/eslint-config';

export default [
	{
		// Global ignore rules - Do not add any other keys to this object or eslint doesn't treat this as global
		ignores: [
			'.*',
			'docs/',
			'dist/',
			'node_modules/',
		],
	},
	...RulesMFDC,
]
```
