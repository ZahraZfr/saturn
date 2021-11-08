// {

//     "parserOptions": {
//         "ecmaFeatures": {
//             "jsx": true
//         },
//         "ecmaVersion": 12,
//         "sourceType": "module"
//     },
//     "plugins": [
//         "react",
//         "prettier"
//     ],
//     "extends": [
//         "react-app",
//         "eslint:recommended",
//         "plugin:react/recommended", 
//         "plugin:prettier/recommended",
//         "prettier"
//     ],
//     "settings": {
//         "react": {
//             "version": "detect"
//         }
//     },
//     "root": true,
//     "env": {
//         "browser": true,
//         "es2021": true
//     },
//     "rules": {
//         "arrow-body-style": "off",
//         "prefer-arrow-callback": "off",
//         "react/no-deprecated": "warn",
//         "react/prop-types": "off",
//         "react/display-name": "warn",
//         "react/jsx-key": "warn",
//         "react/jsx-no-target-blank": "warn",
//         "no-unused-vars": "off",
//         "prettier/prettier": "error"
//     }
// }

module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['react', 'prettier'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': ['off'],
		'prettier/prettier': ['off']
	}
};
