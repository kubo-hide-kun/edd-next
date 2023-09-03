module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'tailwindcss',
    'react',
    'react-hooks',
    'jsx-a11y',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es6: true,
    commonjs: true,
  },
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-namespace': 'off',
    'no-empty-function': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    'no-console': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'react/no-unknown-property': ['error'],
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'off',
  },
};
