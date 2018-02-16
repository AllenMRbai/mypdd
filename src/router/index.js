import Vue from 'vue'
import Router from 'vue-router'
// 首页 底部导航
import MainPage from '@/pages/MainPage'// 底部导航
// 首页
import MainHome from '@/pages/home/MainHome'// 首页容器
import MainHomePortal from '@/pages/home/MainHomePortal'// 首页门户
const MainHomeCat = r => require.ensure([], () => r(require('@/pages/home/MainHomeCat')), 'MainHomeCat')
// 搜索 既分类页面
const MainAssortment = r => require.ensure([], () => r(require('@/pages/assortment/MainAssortment')), 'MainAssortment')
// 个人中心
const MainMe = r => require.ensure([], () => r(require('@/pages/me/MainMe')), 'MainMe')
// 商品详情页
const ProductDetail = r => require.ensure([], () => r(require('@/pages/ProductDetail')), 'ProductDetail')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage,
      children: [
        {
          path: '',
          component: MainHome,
          children: [
            {
              path: '',
              name: 'MainHomePortal', // 首页门户
              component: MainHomePortal
            },
            {
              path:'MainHomeCat/:optId1',
              name: 'MainHomeCat', // 首页分类
              component: MainHomeCat
            }
          ]
        },
        {
          path: 'assortment',
          name: 'MainAssortment', // 分类
          component: MainAssortment
        },
        {
          path: 'me',
          name: 'MainMe', // 个人中心
          component: MainMe
          // meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/productDetail/:id',
      name: 'ProductDetail',//商品详情
      component: ProductDetail
    }
  ]
})
