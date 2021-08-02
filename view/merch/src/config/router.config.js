// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/websocket',
    children: [
      // overviewlist
      {
        path: '/overviewlist',
        name: 'overviewlist',
        component: () => import('@/views/overviewlist'),
        meta: { title: '数据总览', icon: 'table', permission: ['overviewlist'] }
      },
      // forms
      {
        path: '/websocket',
        name: 'Websocket',
        component: () => import('@/views/form'),
        meta: { title: '对话平台', icon: 'audio', permission: ['dialogue'] }
      },

      // visitor
      {
        path: '/visitor',
        name: 'visitor',
        component: () => import('@/views/visitor'),
        meta: { title: '访客', icon: 'form', permission: ['visitor'] }
      },

      // list
      {
        path: '/agent',
        name: 'agent',
        component: RouteView,
        redirect: '/agent/table-list',
        meta: { title: '客服', icon: 'contacts', permission: ['agent'] },
        children: [
          {
            path: '/agent/Agentmanage',
            name: 'Agentmanage',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '客服管理', keepAlive: true, permission: ['Agentmanage'] }
          },
          {
            path: '/agent/Agentgroup',
            name: 'Agentgroup',
            component: () => import('@/views/list/Agentgroup'),
            meta: { title: '客服分组', keepAlive: true, permission: ['Agentgroup'] }
          },
          {
            path: '/agent/AgentLink',
            name: 'AgentLink',
            component: () => import('@/views/list/AgentLink'),
            meta: { title: '生成聊天链接', keepAlive: true, permission: ['AgentLink'] }
          }
        ]
      },
      {
        path: '/statement',
        name: 'statement',
        component: () => import('@/views/statement'),
        meta: { title: '报表', icon: 'area-chart', hideHeader: true, permission: ['statement'] },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/statement/source',
            name: 'StatementSource',
            component: () => import('@/views/statement/source/index'),
            meta: { title: '来源统计页面', hidden: true, keepAlive: true }
          },
          {
            path: '/statement/land',
            name: 'StatementLand',
            component: () => import('@/views/statement/chat_url/index'),
            meta: { title: '着陆统计页面', hidden: true, keepAlive: true }
          },
          {
            path: '/statement/dialogue',
            name: 'StatementDialogue',
            component: () => import('@/views/statement/dialogue/index'),
            meta: { title: '对话统计页面', hidden: true, keepAlive: true }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              }
              // {
              //   path: '/account/settings/security',
              //   name: 'SecuritySettings',
              //   component: () => import('@/views/account/settings/Security'),
              //   meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              // },
              // {
              //   path: '/account/settings/custom',
              //   name: 'CustomSettings',
              //   component: () => import('@/views/account/settings/Custom'),
              //   meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              // },
              // {
              //   path: '/account/settings/binding',
              //   name: 'BindingSettings',
              //   component: () => import('@/views/account/settings/Binding'),
              //   meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
              // },
              // {
              //   path: '/account/settings/notification',
              //   name: 'NotificationSettings',
              //   component: () => import('@/views/account/settings/Notification'),
              //   meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
              // }
            ]
          }
        ]
      },
      {
        path: '/chatsetting',
        name: 'chatsetting',
        component: RouteView,
        redirect: '/chatsetting/autoreact',
        meta: { title: '对话设置', icon: 'setting', permission: ['setting'] },
        children: [
          {
            path: '/chatsetting/menu',
            name: 'menu',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/chatsetting/tabMenu'),
            meta: { title: '聊天菜单设置', hidden: true, keepAlive: true, permission: ['advancedSet'] }
          },
          {
            path: '/chatsetting/autoreact',
            name: 'autoreact',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/chatsetting/autoreact'),
            meta: { title: '自动回复', hidden: true, keepAlive: true, permission: ['advancedSet'] }
          },
          {
            path: '/chatsetting/fastreact',
            name: 'fastreact',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/chatsetting/fastreact'),
            meta: { title: '快捷回复', hidden: true, keepAlive: true, permission: ['advancedSet'] }
          },
          {
            path: '/chatsetting/dialogdispatch',
            name: 'dialogdispatch',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/chatsetting/dialogdispatch'),
            meta: { title: '对话分配', hidden: true, keepAlive: true, permission: ['advancedSet'] }
          },
          {
            path: '/chatsetting/customrank',
            name: 'customrank',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/chatsetting/customrank'),
            meta: { title: '顾客排队', hidden: true, keepAlive: true, permission: ['advancedSet'] }
          },
          {
            path: '/chatsetting/webtool',
            name: 'webtool',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/chatsetting/webtool'),
            meta: { title: '网页插件', hidden: true, keepAlive: true, permission: ['setting'] }
          }
        ]
      }

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
