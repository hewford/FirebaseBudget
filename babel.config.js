module.exports = {
  env: {
    test: {
      plugins: [
        'dynamic-import-node',
      ],
      presets: [
        ['@babel/preset-env', {
          modules: 'commonjs',
        }],
      ],
      sourceMaps: 'inline',
      retainLines: true,
    },
  },
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    'add-react-displayname',
  ],
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      modules: false,
      corejs: 3,
      targets: '> 1%, not IE 11, not dead',
    }]
  ],
  sourceType: 'unambiguous',
};