import globals from 'globals';
import pluginJs from '@eslint/js';
import airbnbBase from 'eslint-config-airbnb-base';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.js'], // Apply to all JS files
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021, // Use appropriate ECMAScript version
    },
    rules: {
      ...airbnbBase.rules, // Spread Airbnb's base rules
      semi: ['error'], // Enforce semicolons everywhere
    },
  },
];
