module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/jsx-filename-extension': [0],
    'no-return-assign': [0],
    'import/prefer-default-export': [0],
    'consistent-return': [0],
  },
};
