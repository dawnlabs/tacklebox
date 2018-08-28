const babel = require('rollup-plugin-babel')

module.exports = {
  input: 'index.js',
  output: [
    {
      name: 'ActionSack',
      file: 'dist/actionsack.umd.js',
      format: 'umd',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['env', { 'modules': false }],
        'react'
      ],
      runtimeHelpers: true,
      plugins: ['external-helpers', 'transform-runtime'],
      babelrc: false
    })
  ]
}
