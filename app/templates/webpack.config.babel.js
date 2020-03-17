import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import './dotenv'

const entry = process.env.DEV && `.${process.env.DEV}`

export default {
  entry: `./dev/index${entry}.js`,
  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 4000,
    contentBase: path.join(__dirname, 'lib')
  },
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this'
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
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              },
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
