module.exports = {
  root: true,
  extends: [
    '@react-native',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'react-native/no-inline-styles': 'warn',
  },
};
