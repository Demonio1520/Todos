const HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CopyWebpackPlugins = require('copy-webpack-plugin'),
      CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'),
      TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',

    output: {
      path: __dirname + '/dist',
      clean: true,
      filename: 'main.[fullhash].js'
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            sources: false
          }
        },
        {
          test: /\.css$/,
          exclude: /styles.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /styles.css$/,
          use: [ MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },

    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin(),
      ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'main.[fullhash].css',
        }),
        new CopyWebpackPlugins({
          patterns: [
            {from: 'src/assets', to: 'assets/'}
          ]
        }),
    ]
};