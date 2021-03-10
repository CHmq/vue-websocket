const vueConfig = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    host: '192.168.2.66',
    port: 8082, // 设置端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy:null  //设置代理
  },
}

module.exports = vueConfig