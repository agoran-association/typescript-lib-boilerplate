const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
  entry: {
    agora_cef: "./lib/index.ts",
  },
  mode: "production",
  output: {
    publicPath: '',
    filename: '[name].bundle.js',
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".ts"],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript"
              ],
            }
          }, 
          {
            loader: "thread-loader",
            options: {
            }
          }
        ],
        exclude: /node_modules/,
      }
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
          parallel: true,
      })
    ]
},
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};