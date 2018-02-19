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
// 订单中心
const OrderPage = r => require.ensure([], () => r(require('@/pages/orders/OrderPage')), 'OrderPage')
const AllOrders = r => require.ensure([], () => r(require('@/pages/orders/AllOrders')), 'AllOrders')
const PendingPayment = r => require.ensure([], () => r(require('@/pages/orders/PendingPayment')), 'PendingPayment')
const PendingShipment = r => require.ensure([], () => r(require('@/pages/orders/PendingShipment')), 'PendingShipment')
const Shipped = r => require.ensure([], () => r(require('@/pages/orders/Shipped')), 'Shipped')

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
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
              component: MainHomePortal,
              meta: { recordScroll: true }
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
        }
      ]
    },
    {
      path: '/productDetail/:id',
      name: 'ProductDetail',//商品详情
      component: ProductDetail
    },
    //订单 4页面
    {
      path:'/orders',
      component:OrderPage,
      children:[
        {
          path:'allOrders',
          name:'AllOrders',//所有订单
          component:AllOrders,
          //meta: { requiresAuth: true }
        },
        {
          path:'pendingPayment',
          name:'PendingPayment',//待付款
          component:PendingPayment,
          //meta: { requiresAuth: true }
        },
        {
          path:'pendingShipment',
          name:'PendingShipment',//待发货
          component:PendingShipment,
          //meta: { requiresAuth: true }
        },
        {
          path:'shipped',
          name:'Shipped',//已发货
          component:Shipped,
         // meta: { requiresAuth: true }
        },
      ]
    }
  ]
})
