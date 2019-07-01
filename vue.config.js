module.exports = {
  configureWebpack: {
    output: {
      filename: process.env.NODE_ENV === 'production' ? 'js/[name].js?[contenthash:8]' : '[name].js',
      chunkFilename: 'js/[name].js?[contenthash:8]',
    },
  },
  productionSourceMap: false,
  css: {
    extract: false,
  },
  publicPath: '',
};
