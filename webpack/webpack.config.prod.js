const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(path.join(__dirname, '..', 'src', 'frontend', 'index.js')),
  output: {
    path: path.resolve(__dirname, '../dist/public'),
    filename: '[name]-bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.txt/,
        type: 'asset/resource',
        generator: {
          filename: 'robots.txt'
        }
      },
      {
        test: /\.xml/,
        type: 'asset/resource',
        generator: {
          filename: 'sitemap.xml'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(path.join(__dirname, '../public/index.html')),
      filename: 'index.html'
    })
  ]
};
