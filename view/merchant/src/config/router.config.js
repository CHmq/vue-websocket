// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/Agentgroup',
    children: [
      // overviewlist
      // {
      //   path: '/overviewlist',
      //   name: 'overviewlist',
      //   component: () => import('@/views/overviewlist'),
      //   meta: { title: '数据总览', icon: 'table', permission: ['overviewlist'] }
      // },

      // list
      {
        path: '/Agentgroup',
        name: 'Agentgroup',
        component: () => import('@/views/list/Agentgroup'),
        meta: { title: '商户列表', icon: 'table', permission: ['Agentgroup'] }
      }
      // {
      //   path: '/statement',
      //   name: 'statement',
      //   component: () => import('@/views/statement'),
      //   meta: { title: '报表', icon: 'area-chart', hideHeader: true, permission: ['statement'] },
      //   hideChildrenInMenu: true,
      //   children: [
      //     {
      //       path: '/statement/source',
      //       name: 'StatementSource',
      //       component: () => import('@/views/statement/source/index'),
      //       meta: { title: '来源统计页面', hidden: true, keepAlive: true }
      //     },
      //     {
      //       path: '/statement/land',
      //       name: 'StatementLand',
      //       component: () => import('@/views/statement/chat_url/index'),
      //       meta: { title: '着陆统计页面', hidden: true, keepAlive: true }
      //     },
      //     {
      //       path: '/statement/dialogue',
      //       name: 'StatementDialogue',
      //       component: () => import('@/views/statement/dialogue/index'),
      //       meta: { title: '对话统计页面', hidden: true, keepAlive: true }
      //     }
      //   ]
      // },
      // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center'),
      //       meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
      //       redirect: '/account/settings/base',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('@/views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', hidden: true, permission: ['user'] }
      //         }
      //       ]
      //     }
      //   ]
      // }
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
