import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '仪表盘',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',

  'app.setting.pagestyle': '页面样式设置',
  'app.setting.pagestyle.light': '浅色样式',
  'app.setting.pagestyle.dark': '深色样式',
  'app.setting.pagestyle.realdark': '全黑样式',
  'app.setting.themecolor': '主题颜色',
  'app.setting.navigationmode': '导航模式',
  'app.setting.content-width': '内容宽度',
  'app.setting.fixedheader': '固定头部',
  'app.setting.fixedsidebar': '固定侧边栏',
  'app.setting.sidemenu': '侧菜单布局',
  'app.setting.topmenu': '顶部菜单布局',
  'app.setting.content-width.fixed': '固定',
  'app.setting.content-width.fluid': '流动',
  'app.setting.othersettings': '其他设置',
  'app.setting.weakmode': '弱模式',
  'app.setting.copy': '复制设置',
  'app.setting.loading': '加载主题',
  'app.setting.copyinfo': '复制成功，请替换src/models/setting.js中的defaultSettings',
  'app.setting.production.hint': '设置面板仅在开发环境中显示，请手动修改'
}

export default {
  ...components,
  ...locale
}
