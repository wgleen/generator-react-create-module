import webpack from 'webpack'
import merge from 'webpack-merge'
import envConfig from './config/webpackEnvs'

const _envConfig = envConfig[process.env.NODE_ENV || 'development']

export default merge({}, _envConfig, {
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        loaders: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
})