module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
		"jest": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"airbnb",
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
		"chaiExpect": "readonly",
		"elasticApm": "readonly"
	},
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"babel",
		"react"
	],
	"rules": {
		"semi": [2, "never"],
		"no-underscore-dangle": "off",
		"react/jsx-uses-vars": "error",
		"react/jsx-uses-react": "error",
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"comma-dangle": ["error", {"functions": "ignore"}],
		"react/no-array-index-key": "off"
	}
};