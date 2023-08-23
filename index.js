// Rules shared by both .doop + .vue files
let jsCommonRules = {
	'html-closing-bracket-spacing': ['off'], // Annoying doesn't allow <this-kind-of-thing/>
	'no-debugger': ['warn'], // Debuggers are fine, just warn
	'no-useless-escape': ['off'], // ESlint frequently gets what should and shouldn't be escaped wrong
	'no-unused-vars': ['warn'], // Dont make unused vars the end of the world
};

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
				...jsCommonRules,
			},
		},
		// }}}

		// .mjs / .js regular files {{{
		{
			files: ['*.js', '*.mjs'],
			rules: {
				...jsCommonRules,
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
				'vue/attributes-order': ['warn', {
					'order': [
						'DEFINITION',
						'LIST_RENDERING',
						'CONDITIONALS',
						'RENDER_MODIFIERS',
						'GLOBAL',
						['UNIQUE', 'SLOT'],
						'TWO_WAY_BINDING',
						['OTHER_DIRECTIVES', 'EVENTS'],
						'CONTENT',
						'OTHER_ATTR',
					],
					'alphabetical': false,
				}],
				'vue/component-definition-name-casing': ['off', 'PascalCase'], // FIXME: Doesn't support camelCase yet
				'vue/html-closing-bracket-spacing': ['warn', {
					selfClosingTag: 'never'
				}],
				'vue/html-indent': ['error', 'tab'],
				'vue/html-self-closing': ['warn', {
					html: {
						void: 'always',
						normal: 'any',
						component: 'always',
					},
				}],
				'vue/max-attributes-per-line': ['warn', {
					singleline: 4,
					multiline: 1,
				}],
				'vue/multi-word-component-names': ['off'],
				'vue/multiline-html-element-content-newline': ['warn', {
					allowEmptyLines: true,
				}],
				'vue/mustache-interpolation-spacing': ['warn', 'never'],
				'vue/order-in-components': ['warn', {
					'order': [
						'el',
						'name',
						'key',
						'parent',
						'functional',
						['delimiters', 'comments'],
						['components', 'directives', 'emits', 'filters'],
						'extends',
						'mixins',
						['provide', 'inject'],
						'ROUTER_GUARDS',
						'layout',
						'middleware',
						'validate',
						'scrollToTop',
						'transition',
						'loading',
						'inheritAttrs',
						'model',
						['data', 'asyncData', 'props', 'propsData'],
						'computed',
						'emits',
						'setup',
						'fetch',
						'head',
						'methods',
						'LIFECYCLE_HOOKS',
						'watch',
						'watchQuery',
						['template', 'render'],
						'renderError'
					]
				}],
				'vue/require-default-prop': ['off'],
				'vue/singleline-html-element-content-newline': ['warn', {
					ignoreWhenNoAttributes: true,
					ignores: ['pre', 'textarea', 'div', 'INLINE_ELEMENTS'],
				}],
				...jsCommonRules,
			},
		},
		// }}}

	],
}
