module.exports = {
  devServer: {
    port: 2000,
    proxy: {
      '/cgi': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
      '/passport': {
        target: baseurl[process.env.NODE_ENV],
        secure: false,
        changeOrigin: true,
      },
    },
  },
  publicPath: './',
  assetsDir: './',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          red: '#F37455',
          blue: '#3eaf7c',
          orange: '#F37455',
          block: '#4D4D4D',
          gray: '#C9C9C9',
          'active-color': '#FF4728',
          'text-color': '#323233'
        },
      },
      sass: {

      }
    },
  },
};