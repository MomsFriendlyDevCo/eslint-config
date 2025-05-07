import eslintParser from 'vue-eslint-parser';
import pluginJSDoc from 'eslint-plugin-jsdoc';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginVue from 'eslint-plugin-vue';

// Rules shared by both .doop + .vue files
export let JSCommon = {
	// Generic rules
	'html-closing-bracket-spacing': ['off'], // Annoying doesn't allow <this-kind-of-thing/>
	'no-debugger': ['warn'], // Debuggers are fine, just warn
	'no-useless-escape': ['off'], // ESlint frequently gets what should and shouldn't be escaped wrong
	'no-unused-vars': ['warn'], // Dont make unused vars the end of the world

	// JSDoc
	'jsdoc/check-alignment': ['off'],  // Disable the JSDoc parser insisting on correct indents
	'jsdoc/check-tag-names': ['warn', { // Extend JSDoc allowed tags
		definedTags: ['date', 'fixme', 'note', 'slot', 'url'],
	}],
	'jsdoc/check-types': ['off'], // Disable the JSDoc parser being fussy about `@param {String}` vs `@param {string}`
	'jsdoc/no-defaults': ['off'], // Disable the JSDoc parser that complains about optional params as its just silly
	'jsdoc/no-undefined-types': ['warn', {disableReporting: true}], // Disable the JSDoc parser for "undefined" types which it usually gets wrong. Ask eslint to still mark these as used though
	'jsdoc/require-returns-description': ['off'], // Disable the JSDoc parse being fussy about return descriptions
	'jsdoc/tag-lines': ['off'], // Disable the JSDoc parser being fussy about new-line spacing
};

export default [
	// eslint-plugin-jsdoc (with custom settings)
	{
		...pluginJSDoc.configs['flat/recommended'],
		settings: {
			jsdoc: {
				// NOTE that some specs - like vue - can add to this config
				mode: 'jsdoc',
				tagNamePreference: {
					// Prefer 'emits' over 'fires' to match Vue terminology {{{
					emits: 'emits',
					fires: 'emits',
					// }}}
				},
			},
		},
	},

	// eslint-plugin-unicorn
	{
		...pluginUnicorn.configs['flat/recommended'],
		rules: {
			...pluginUnicorn.configs['flat/recommended'].rules,
			'unicorn/catch-error-name': ['off'],
			'unicorn/consistent-function-scoping': ['off'], // This rule means well and its more optimal but makes functions with constants harder to read
			'unicorn/explicit-length-check': ['off'],
			'unicorn/filename-case': ['off'], // Disabled globally (gets re-enabled for .vue files)
			'unicorn/no-anonymous-default-export': ['off'],
			'unicorn/no-array-callback-reference': ['off'], // Overly aggressively attaches itself to all .find() operations
			'unicorn/no-array-for-each': ['off'],
			'unicorn/no-array-reduce': ['off'],
			'unicorn/no-await-expression-member': ['off'], // There is nothing wrong with `(await thing).prop`
			'unicorn/no-empty-file': ['off'], // Breaks interface files + schema files with just JSDoc
			'unicorn/no-magic-array-flat-depth': ['warn'],
			'unicorn/no-negated-condition': ['off'],
			'unicorn/no-nested-ternary': ['off'],
			'unicorn/no-null': ['off'],
			'unicorn/no-this-assignment': ['off'], // Not allowing escape hatches to `this` when nesting functions is just dumb
			'unicorn/no-useless-promise-resolve-reject': ['off'], // Constant complaints about using `throw` within simple promise chains
			'unicorn/prefer-dom-node-append': ['warn'],
			'unicorn/prefer-global-this': ['warn'], // Disabled in .vue files to allow 'window' directly
			'unicorn/prefer-logical-operator-over-ternary': ['off'],
			'unicorn/prefer-spread': ['off'],
			'unicorn/prefer-string-raw': ['off'], // Just a downright weird rule
			'unicorn/prefer-string-replace-all': ['off'], // Gets annoying pretty fast and its rarely correct
			'unicorn/prefer-ternary': ['off'], // This rule means well but it can screw up perfectly readable code
			'unicorn/prefer-ternary': ['warn'],
			'unicorn/prefer-type-error': ['off'], // Too TS specific
			'unicorn/prevent-abbreviations': ['off'],
			'unicorn/switch-case-braces': ['warn', 'avoid'],
		},
	},

	// eslint-plugin-vue
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
			...JSCommon,
		},
	},
	// }}}

	// .mjs / .js regular files {{{
	{
		files: ['**/*.js', '**/*.mjs'],
		rules: {
			...JSCommon,
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
		settings: {
			jsdoc: {
				tagNamePreference: {
					// Allow 'prop' in Vue mode to match Vue terminology
					prop: 'prop',
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
			'vue/html-indent': ['warn', 'tab', {
				ignores: [ // Don't enforce indent rules for attributes that can have indented logic
					'[v-tooltip]',

					// NOTE: Annoyingly this doesn't / can't match `[:class]` as that isn't valid esquery
					//       I've tried all the following to fix this but none of these work - MC 2025-05-07
					// 'VAttribute[directive=true][key.name.name="class"]',
					// 'VDirective[key.name=class]',
					// 'VDirective[key.name=/class/]',
					// '[/.class/]',
					// NOTE: To fix add `// eslint-disable vue-/html-indent`
				],
			}],
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
			'vue/no-v-html': ['off'], // Disable Vue complaining about v-html being used
			'vue/order-in-components': ['warn', {
				'order': [
					'el',
					'name',
					'key',
					'parent',
					'functional',
					['delimiters', 'comments'],
					'inject',
					'provide',
					'extends',
					'mixins',
					['components', 'directives', 'emits', 'filters'],
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

			'unicorn/prefer-global-this': ['off'], // Allow direct use of `window.`
			'unicorn/filename-case': ['warn', {
				case: 'kebabCase',
				ignore: [
					'^App.vue$', // Vite projects
				],
			}],

			...JSCommon,
		},
	},
	// }}}
]
