import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from './index'

const development = {
  entry: './demo/index.js',
  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 4000
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      }
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
  ]
}

const production = {
  entry: './src/index.js',
  output: {
    path: `${config.paths.root}dist`,
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'amd'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    new ExtractTextPlugin('[name].css')
  ]
}

export default {
  development,
  production
}