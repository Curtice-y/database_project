import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'

import Home from '../components/Home.vue'
import UserInfo from '../components/user/UserInfo.vue'
import PurchaseHis from '../components/user/PurchaseHis.vue'
import Putaway from '../components/user/Putaway.vue'
import Shop from '../components/Shop.vue'

import Console from '../components/Console.vue'
import AdminInfo from '../components/admin/AdminInfo.vue'
import CommodityInfo from '../components/admin/CommodityInfo.vue'
import TransactionRecord from '../components/admin/TransactionRecord.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/userinfo',
      children: [
        { path: '/userinfo', component: UserInfo },
        { path: '/purchasehis', component: PurchaseHis },
        { path: '/putaway', component: Putaway },
        { path: '/shop', component: Shop }
      ]
    },
    {
      path: '/console',
      component: Console,
      redirect: '/admininfo',
      children: [
        { path: '/admininfo', component: AdminInfo },
        { path: '/commodityinfo', component: CommodityInfo },
        { path: '/transactionrecord', component: TransactionRecord }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router