// Configuration for StyleLint
// See: https://stylelint.io/user-guide/configuration/

module.exports = {
	extends: [
		/*'@wemake-services/stylelint-config-scss',
		'stylelint-config-css-modules',
		'stylelint-a11y/recommended',*/
		'stylelint-config-airbnb',
	],
	plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-a11y'],

	rules: {
		'selector-max-id': 1,
		'declaration-property-value-blacklist': 0,
		'rule-empty-line-before': 1,
		'number-leading-zero': 0,
		'function-url-quotes': 0,
		'comment-whitespace-inside': 1,
		'selector-pseudo-element-colon-notation': 1,
		'csstools/use-nesting': 0,
		'comment-empty-line-before': 0,
		'a11y/media-prefers-reduced-motion': 0,
		'plugin/no-low-performance-animation-properties': 0,
		// ignore special `var-` css variables for `:export`
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['/^var-/'],
			},
		],

		// custom plugins to work with
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
				ignore: ['flexbox'],
			},
		],

		// a11y
		'a11y/content-property-no-static-value': true,
	},
};
