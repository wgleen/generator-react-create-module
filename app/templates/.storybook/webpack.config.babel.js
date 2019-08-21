import 'regenerator-runtime/runtime'
import custom from '../webpack.config.babel'

module.exports = async ({ config }) => ({
  ...config,
  module: {
    ...config.module,
    rules: custom.module.rules
  }
})
