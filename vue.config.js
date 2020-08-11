const path = require('path');
const timeStamp = new Date().getTime();

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : `/`,
  outputDir: 'project',
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: `js/[name].${process.env.VUE_APP_Version}.${timeStamp}.js`,
      chunkFilename: `js/[name].${process.env.VUE_APP_Version}.${timeStamp}.js`
    },
    externals: {
      // echarts: 'echarts', // 配置使用CDN
      // Vue: 'Vue',
      // Vue: 'Vue',
      // Vuex: 'Vuex',
      // 'vue-router': 'VueRouter',
      // 'element-ui': 'ELEMENT'
    }
  },
  css: {
    extract: {
      filename: `css/[name].${process.env.VUE_APP_Version}.${timeStamp}.css`,
      chunkFilename: `css/[name].${process.env.VUE_APP_Version}.${timeStamp}.css`,
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components')),
    config.plugin('html')
        .tap(args => {
          args[0].title = 'IPLUS文本分析系统';
          return args;
        })
  },
  devServer: {
    // before: function(app, server) {
    //   app.get('/api/get/testData', function(req, res) {
    //     res.json({ data: appData, errno: 0 });
    //   });
    // },
    proxy: {
      
      '/audio': {
        target: 'https://online2.tingclass.net',
        changeOrigin: true,
        pathRewrite:{
          '^/audio': 'https://online2.tingclass.net',
        }
      },
    }
  },
  productionSourceMap: false
}
