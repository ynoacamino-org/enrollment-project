import tsParser from '@typescript-eslint/parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import tsEslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['./src/**/*.{ts,tsx}', './*.mjs'],
    plugins: {
      'typescript-eslint': tsEslint,
    },
    languageOptions: {
      parser: tsParser,
    },
    extends: [eslintPluginPrettier, tsEslint.configs.recommended],
  },
  {
    files: ['./src/**/*.astro'],
    plugins: {
      astro: eslintPluginAstro,
    },
    extends: [
      eslintPluginAstro.configs.recommended,
      eslintPluginAstro.configs['jsx-a11y-recommended'],
    ],
    rules: {
      quotes: ['error', 'single'],
      'astro/no-exports-from-components': 'error',
      'astro/no-set-html-directive': 'warn',
      'astro/no-set-text-directive': 'error',
      'astro/no-unused-css-selector': 'warn',
      'astro/prefer-class-list-directive': 'off',
      'astro/prefer-object-class-list': 'error',
      'astro/prefer-split-class-list': 'error',
      semi: 'off',
      'astro/semi': ['error', 'always', { omitLastInOneLineBlock: true }],
    },
  },
]);
