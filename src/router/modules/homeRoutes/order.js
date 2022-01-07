const routes = [
  {
    path: '/home/order',
    name: 'HomeOrder',
    component: () => import('@/views/home/order/order.vue')
  },
  {
    path: '/home/order/detail',
    name: 'HomeOrderDetail',
    component: () => import('@/views/home/order/orderDetail.vue')
  }
]

export default routes
