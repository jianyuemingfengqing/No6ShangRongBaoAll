import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },

  {
    path: '/integralGrade',
    component: Layout,
    redirect: '/integralGrade/list',
    name: 'IntegralGrade',
    meta: { title: '积分等级管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'IntegralGradelist',
        component: () => import('@/views/integralGrade/list'),
        meta: { title: '积分等级列表', icon: 'table' },
      },
      {
        path: 'create',
        name: 'IntegralGradeCreate',
        component: () => import('@/views/integralGrade/form'),
        meta: { title: '新增积分等级', icon: 'form' },
      },
      {
        path: 'edit/:id',
        name: 'IntegralGradeEdit',
        component: () => import('@/views/integralGrade/form'),
        meta: { title: '更新积分等级', icon: 'form' },
        hidden: true,
      },
    ],
  },
  {
    path: '/dict',
    component: Layout,
    redirect: '/dict/list',
    name: 'Dict',
    alwaysShow: true,
    meta: { title: '系统设置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'list',
        name: 'DictList',
        component: () => import('@/views/dict/list'),
        meta: { title: '数据字典', icon: 'el-icon-setting' },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    alwaysShow: true,
    meta: { title: '会员管理', icon: 'el-icon-setting' },
    children: [
      //积分等级列表查询页的路由
      {
        path: 'list', // 浏览器访问路由的路径：/integralGrade/list
        name: 'UserList', //name值代表当前路由唯一的名称  一般使用路径单词拼接
        component: () => import('@/views/user/list'),
        meta: { title: '会员列表', icon: 'table' },
      },
    ],
  },
  {
    path: '/borrower',
    component: Layout,
    redirect: '/borrower/list',
    name: 'Borrower',
    alwaysShow: true,
    meta: { title: '借款管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'list',
        name: 'BorrowerList', //name值代表当前路由唯一的名称  一般使用路径单词拼接
        component: () => import('@/views/borrower/list'),
        meta: { title: '借款人列表', icon: 'table' },
      },
      {
        path: 'detail',
        name: 'BorrowerDetail',
        component: () => import('@/views/borrower/form'),
        hidden: true,
        meta: { title: '借款人详情', icon: 'table' },
      },
      {
        path: 'info-list',
        name: 'BorrowerInfoList',
        component: () => import('@/views/borrower/info-list'),
        meta: { title: '借款列表', icon: 'table' },
      },
      //      //info-detail/id
      {
        //borrower/info-detail/1
        path: 'info-detail/:id',
        name: 'BorrowerInfoDetail',
        component: () => import('@/views/borrower/info-detail'),
        hidden: true,
        meta: { title: '借款详情', icon: 'table' },
      },
    ],
  },
  // {
  //   path: '/lend',
  //   component: Layout,
  //   redirect: '/lend/list',
  //   name: 'Lend',
  //   alwaysShow: true,
  //   meta: { title: '标的管理', icon: 'el-icon-setting' },
  //   children: [
  //     //积分等级列表查询页的路由
  //     {
  //       path: 'list',
  //       name: 'LendList',
  //       component: () => import('@/views/lend/list'),
  //       meta: { title: '标的列表', icon: 'table' },
  //     },
  //     {
  //       path: 'info/:id',
  //       name: 'LendInfo',
  //       component: () => import('@/views/lend/form'),
  //       hidden: true,
  //       meta: { title: '标的详情', icon: 'table' },
  //     },
  //   ],
  // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
