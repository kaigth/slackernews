var path = require( 'path' );

module.exports = {
  entry: './app/index.jsx',
  devServer: {
    historyApiFallback: true
  },
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
        exclude: '/node_modules/'
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: path.join( __dirname, '../', 'dist' ),
    publicPath: '/dist',
  },
  resolve: {
    extensions: [ '.jsx', '.js' ]
  }
};