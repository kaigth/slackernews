var path = require( 'path' );
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.jsx',
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000
            } 
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.jsx|.js$/,
        use: 'eslint-loader',
        enforce: 'pre',
        exclude: '/node_modules/'
      },
      {
        test: /\.jsx|.js$/,
        use: 'babel-loader',
        exclude: ['/node_modules/']
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: path.join( __dirname, '../', 'dist' ),
    publicPath: '/',
  },
  resolve: {
    extensions: [ '.jsx', '.js' ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    files: {
      js: ["./app.js"]
    }
  })]
};