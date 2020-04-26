module.exports = {
  productionSourceMap: false,
  devServer: {// 环境配置
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    // proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
    //   '/api': {
    //     target: 'http://127.0.0.1:8081',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
  pages: {
    index: {
      // 页面入口
      entry: 'src/main.js',
      // 模板来源
      // template: 'public/index.html',
      // 在 dist/index.html 的输出
      // filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '后台管理系统',
      // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk
      // chunks: [ 'chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`
    // 输出文件名会被推导为 `subpage.html`
    // subpage: 'src/main.js'
  },
}