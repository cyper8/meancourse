const IP=process.env.IP||"127.0.0.1";
const PORT=process.env.PORT||3000;
const ROOT_URL='https://'+(process.env.C9_HOSTNAME?process.env.C9_HOSTNAME:("localhost:"+PORT));
const webpack = require("webpack");
const path = require('path');
const env = process.env.NODE_ENV;
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const srcRoot = path.resolve(__dirname, "frontend/src");
const testsRoot = path.resolve(__dirname, "frontend/tests");

var publicPath         = env === 'production' ? 'https://demo.ya64.uk/' : ROOT_URL;
var jsName             = env === 'production' ? '[name]-[hash].js' : '[name].js';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(env || 'development'),
      C9_SH_EXECUTED: JSON.stringify(process.env.C9_SH_EXECUTED || 0)
    }
  }),
  new webpack.LoaderOptionsPlugin({
    debug: env !== 'production'
  }),
  new UglifyJSPlugin({
    sourceMap: true
  })
];

module.exports = {
  context: srcRoot,
  entry:(env !== "test")?"app.js":{app:"app.js",tests:"../tests/index.js"},
  //devtool: 'inline-source-map',
  plugins: plugins,
  output: {
    path: `${__dirname}/frontend/build/js`,
    filename: jsName,
    publicPath
  },
  resolve:{
    modules: ["./node_modules",srcRoot,testsRoot],
    extensions: ["*",".js", ".css"]
  },
  module:{
    rules: [
      {
        test: /tests\/.*\.js/,
        exclude: [/node_modules/],
        use:['file-loader?[name].[ext]&publicPath='+publicPath+'tests/&outputPath=./tests/']
      },
      {
        test: /\.css$/,
        //exclude: [/node_modules/],
        use: ['style-loader/url',
          'file-loader?name=[name].[ext]&publicPath='+publicPath+'styles/&outputPath=./styles/' ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
}
