module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:sonarjs/recommended-legacy',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react-refresh', 'sonarjs', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-loss-of-precision': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    'sonarjs/todo-tag': 'off',
    'sonarjs/no-array-index-key': 'off',
    'sonarjs/no-unstable-nested-components': 'off',
    'sonarjs/sonar-no-unused-class-component-methods': 'off',
    'sonarjs/redundant-type-aliases': 'off',
    'sonarjs/table-header': 'off',
    'sonarjs/cognitive-complexity': 'error',
    'sonarjs/no-identical-expressions': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'sonarjs/assertions-in-tests': 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true,
      },
    ],
    'react/jsx-tag-spacing': [
      'error',
      {
        beforeSelfClosing: 'always',
      },
    ],
  },
};
