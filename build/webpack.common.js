const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  entry: {
    main: './index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'image/',
            limit: 2048
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            }
          },
          "css-loader",
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }, {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: "./favicon.ico"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    })
  ],
  optimization: {
    usedExports: true, // 开启tree-shaking
    splitChunks: {
      chunks: "all",
      minSize: 30000, // 体积大于30KB的代码块
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载代码块时的并行请求数量不超过5个
      maxInitialRequests: 3, // 加载初始页面时的并行请求数量不超过3个
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // 如果有异步加载的模块, 不要添加filename/name
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    },
    minimizer: [
        new OptimizeCSSAssetsPlugin({})
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].bundle.js", // 直接引入的文件名
    chunkFilename: '[name].chunk.js', // 间接引入的代码生成的文件名
  }
};
