const babel = require('rollup-plugin-babel')

const umd = {
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
        ['@babel/env', { 'modules': false }],
        '@babel/react'
      ],
      runtimeHelpers: true,
      plugins: ['@babel/external-helpers', '@babel/transform-runtime'],
      babelrc: false
    })
  ]
}

module.exports = umd
