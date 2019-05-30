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
    'linebreak-style': 0
  },
  globals: {
    window: true,
    document: true,
    fetch: true
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: [
          ['assets', './assets'],
          ['components', './components'],
          ['constants', './constants'],
          ['learnMocks', './learnMocks'],
          ['screens', './screens'],
          ['utils', './utils'],
          ['categories', './categories'],
          ['contexts', './contexts']
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  }
}
