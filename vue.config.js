var webpack = require('webpack');
module.exports = {
  devServer: {
    proxy: {
      '/web': {
        target: 'http://localhost:9110',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/web': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
      }),
    ]
  }
}