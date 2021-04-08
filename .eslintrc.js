//eslint-disable-next-line
module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react-hooks',
    'import',
    'react'
  ],
  'rules': {
    // we only want single quotes
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid useless spaces
    'no-multi-spaces': ['error'],
    'no-console': 'error',
    'lines-between-class-members': ['error', 'always', {
      'exceptAfterSingleLine': true,
    }],
    'react/jsx-curly-brace-presence': ['error', {
      'props': 'always',
      'children': 'ignore',
    }],
    'react/jsx-no-bind': ['error', {
      'allowArrowFunctions': true,
    }],
    'react/jsx-sort-props': ['error', {
      'callbacksLast': false,
      'shorthandFirst': true,
      'ignoreCase': true,
      'noSortAlphabetically': false,
      'reservedFirst': false,
    }],
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['error', {
      additionalHooks: '(useScrollPosition)',
    }],
    'no-use-before-define': ['error', {
      functions: false,
      variables: false,
    }],
  },
};
