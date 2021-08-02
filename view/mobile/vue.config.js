const vueConfig = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 微擎打包静态资源访问路径修改
  // publicPath: '../addons/pinxuan_kefu/public/mobile/',
  devServer: {
    host: '192.168.4.136',
    port: 8081, // 设置端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy:null  //设置代理
  }
}

module.exports = vueConfig