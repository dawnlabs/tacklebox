const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const {uglify} = require('rollup-plugin-uglify')
const replace = require('rollup-plugin-replace')

module.exports = {
  input: 'index.js',
  output: [
    {
      name: 'RuckPack',
      file: 'dist/ruckpack.cjs.js',
      format: 'cjs'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['env', { 'modules': false }],
        'react'
      ],
      plugins: ['external-helpers'],
      babelrc: false
    }),
    resolve(),
    commonjs(),

    // Production
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify()
  ],
  external: ['react', 'react-dom']
}
