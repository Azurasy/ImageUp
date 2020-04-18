module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': ['production', 'prod', 'p'].includes(process.env.NODE_ENV)
      ? 'error'
      : 'off',
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
