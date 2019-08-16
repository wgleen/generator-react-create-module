import webpack from 'webpack'
import merge from 'webpack-merge'
import './dotenv'
import config from './config'
import {
  development,
  production
} from './config/webpackEnvs'

const envConfig = config.env.match(/development|test/) ? development : production

export default merge({}, envConfig, {
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