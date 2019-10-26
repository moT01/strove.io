module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  env: { jest: true },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'no-use-before-define': [1, { variables: false }],
    'global-require': 0,
    'no-underscore-dangle': 0,
    'react/prop-types': 0,
    'react/sort-comp': 0,
    'import/prefer-default-export': 0,
    'max-len': [2, { code: 100 }],
    'react/jsx-one-expression-per-line': 0,
    'react/prefer-stateless-function': 0,
    'no-eval': 0,
    'prettier/prettier': 2,
    'no-nested-ternary': 0,
    'no-plusplus': 0,
    'jsx-a11y/accessible-emoji': 0,
    'linebreak-style': 0,
    'no-unused-expressions': 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  globals: {
    window: true,
    document: true,
    fetch: true,
  },
  settings: {
    'import/resolver': {
      'import/resolver': {
        alias: [
          ['components', './src/components'],
          ['images', './src/images'],
          ['pages', './src/pages'],
          ['queries', './src/queries'],
          ['state', './src/state'],
          ['utils', './src/utils'],
          ['constants', './src/constants'],
          ['middlewares', './src/middlewares'],
          ['hooks', './src/hooks'],
          ['assets', './src/assets'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
}
