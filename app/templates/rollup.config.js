import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import babel from 'rollup-plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import { merge } from 'lodash'
import pkg from './package.json'

const commons = {
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    postcss({
      modules: true,
      extensions: [
        '.css',
        '.sss'
      ]
    }),
    svg(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    sizeSnapshot(),
    terser(),
    commonjs({
      include: 'node_modules/**'
    }),
    visualizer()
  ]
}

const commonBuild = merge({}, commons, {
  input: 'src/index.js',
  output: [
    {
      name: 'common',
      file: pkg.commonjs,
      format: 'cjs'
    },
    {
      name: 'module',
      file: pkg.module,
      format: 'esm'
    }
  ],
  plugins: [
    peerDepsExternal()
  ]
})

const browserBuild = merge({}, commons, {
  input: 'src/browser.js',
  output: [
    {
      name: 'iife',
      file: pkg.browser,
      format: 'iife',
      sourcemap: true,
      globals: {
        window: 'window'
      }
    }
  ],
  plugins: [
    alias({
      resolve: ['.jsx', '.js'],
      entries: [
        {
          find: 'react',
          replacement: 'preact/compat'
        },
        {
          find: 'react-dom',
          replacement: 'preact/compat'
        }
      ]
    })
  ]
})

export default [
  commonBuild,
  browserBuild
]
