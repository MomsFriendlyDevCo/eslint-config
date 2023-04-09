module.exports = {
	extends: [
		'plugin:vue/recommended',
		'eslint:recommended',
	],
	env: {
		es6: true,
		mocha: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
	overrides: [
		// .doop backend Files {{{
		{
			files: ['*.doop'],
			parser: 'vue-eslint-parser',
			globals: {
				app: 'readable', // Global backend App object
				db: 'readable', // Global app.db shortcut
			},
			rules: {
				'vue/comment-directive': ['off'], // Screws up block parsing and we don't have <template/> anyway
				'no-useless-escape': ['off'], // ESlint frequently gets what should and shouldn't be escaped wrong
				'no-unused-vars': ['warn'],
			},
		},
		// }}}
		// .vue frontend Files {{{
		{
			files: ['*.vue'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				vueFeatures: {
					filter: true,
				},
			},
			globals: {
				$: 'readable', // jQuery
				_: 'readable', // Lodash
				app: 'readable', // Global frontend app object
			},
			rules: {
				'vue/attributes-order': ['error', {
					'order': [
						'DEFINITION',
						'LIST_RENDERING',
						'CONDITIONALS',
						'RENDER_MODIFIERS',
						'GLOBAL',
						['UNIQUE', 'SLOT'],
						'TWO_WAY_BINDING',
						'OTHER_DIRECTIVES',
						'EVENTS',
						'CONTENT',
						'OTHER_ATTR',
					],
					'alphabetical': false
				}],
				'vue/component-definition-name-casing': ['off', 'PascalCase'], // FIXME: Doesn't support camelCase yet
				'vue/html-closing-bracket-spacing': ['warn', {
					'selfClosingTag': 'never'
				}],
				'vue/html-indent': ['error', 'tab'],
				'vue/max-attributes-per-line': ['warn', {
					'singleline': 4,
					'multiline': 1,
				}],
				'vue/multi-word-component-names': ['off'],
				'vue/mustache-interpolation-spacing': ['warn', 'never'],
			},
		},
		// }}}
	],
}
