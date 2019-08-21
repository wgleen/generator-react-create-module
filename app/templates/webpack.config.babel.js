import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import './dotenv'

export default {
  entry: './dev/index.js',
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
      },
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
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './dev/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
