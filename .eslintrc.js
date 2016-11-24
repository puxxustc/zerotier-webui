module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow console during development
    //'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-var': ['error'],
    // prefer const than let
    'prefer-const': [
      'error',
      {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false
      }
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'no-shadow-restricted-names': ['error'],
    'no-undef-init': ['error'],
    'no-const-assign': ['error'],
    'no-cond-assign': ['error', 'always'],
    'no-constant-condition': ['error'],
    'no-dupe-args': ['error'],
    'no-empty': ['error'],
    'no-empty-character-class': ['error'],
    'no-extra-boolean-cast': ['error'],
    'no-func-assign': ['error'],
    'no-inner-declarations': [2, 'both'],
    'no-negated-in-lhs': ['error'],
    'no-obj-calls': ['error'],
    'valid-typeof': ['error'],
    'no-unexpected-multiline': ['error'],
    'array-callback-return': ['error'],
    'block-scoped-var': ['error'],
    'complexity': ['error', 18],
    'consistent-return': ['error'],
    'curly': ['error'],
    'no-case-declarations': ['error'],
    'no-empty-pattern': ['error'],
    'no-eq-null': ['error'],
    'no-eval': ['error'],
    'no-extend-native': ['error'],
    'no-extra-bind': ['error'],
    'no-extra-label': ['error'],
    'no-fallthrough': ['error'],
    'no-floating-decimal': ['error'],
    'no-implicit-coercion': ['error'],
    'no-implicit-globals': ['error'],
    'no-implied-eval': ['error'],
    'no-labels': ['error'],
    'no-lone-blocks': ['error'],
    'no-loop-func': ['error'],
    'no-native-reassign': ['error'],
    'no-script-url': ['error'],
    'no-new': ['error'],
    'wrap-iife': ['error'],
    'no-return-assign': ['error'],
    'no-redeclare': ['error'],
    'no-octal-escape': ['error'],
    'no-octal': ['error'],
    'no-new-wrappers': ['error'],
    'no-new-func': ['error'],
    // 'no-param-reassign': ['error'],
    // 'no-magic-numbers': ['error'],
    // 'no-use-before-define': ['error'],
    // 'no-invalid-this': ['error'],
    // 'prefer-template': ['error']
  }
}
