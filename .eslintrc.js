module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@oit/eslint-config/uni-app',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
  },
  globals: {
    vue: 'readonly',
    weex: 'readonly',
  },
}
