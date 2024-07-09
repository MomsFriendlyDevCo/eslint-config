import eslintParser from 'vue-eslint-parser';
import pluginJSDoc from 'eslint-plugin-jsdoc';
import pluginVue from 'eslint-plugin-vue';

// Rules shared by both .doop + .vue files
let jsCommonRules = {
	'html-closing-bracket-spacing': ['off'], // Annoying doesn't allow <this-kind-of-thing/>
	'jsdoc/check-alignment': ['off'],  // Disable the JSDoc parser insisting on correct indents
	'jsdoc/check-types': ['off'], // Disable the JSDoc parser being fussy about `@param {String}` vs `@param {string}`
	'jsdoc/tag-lines': ['off'], // Disable the JSDoc parser being fussy about new-line spacing
	'no-debugger': ['warn'], // Debuggers are fine, just warn
	'no-useless-escape': ['off'], // ESlint frequently gets what should and shouldn't be escaped wrong
	'no-unused-vars': ['warn'], // Dont make unused vars the end of the world
};

export default [
	pluginJSDoc.configs['flat/recommended'],
	...pluginVue.configs['flat/recommended'],

	// .doop backend Files {{{
	{
		files: ['**/*.doop'],
		languageOptions: {
			parser: eslintParser,
			globals: {
				app: 'readable', // Global backend App object
				db: 'readable', // Global app.db shortcut
			},
		},
		rules: {
			'vue/comment-directive': ['off'], // Screws up block parsing and we don't have <template/> anyway
			...jsCommonRules,
		},
	},
	// }}}

	// .mjs / .js regular files {{{
	{
		files: ['**/*.js', '**/*.mjs'],
		rules: {
			...jsCommonRules,
		},
	},
	// }}}

	// .vue frontend Files {{{
	{
		files: ['**/*.vue'],
		languageOptions: {
			globals: {
				$: 'readable', // jQuery
				_: 'readable', // Lodash
				app: 'readable', // Global frontend app object
			},
			parser: eslintParser,
			parserOptions: {
				vueFeatures: {
					filter: true,
				},
			},
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
					[
						'ATTR_DYNAMIC',
						'ATTR_STATIC',
						'ATTR_SHORTHAND_BOOL',
						'EVENTS',
						'OTHER_DIRECTIVES',
						'CONTENT',
					],
				],
				'alphabetical': false,
			}],
			'vue/component-definition-name-casing': ['warn', 'PascalCase'],
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
]
