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
  },
  {
    path: '/home/operate/task',
    name: 'OperateTask',
    component: () => import('@/views/home/order/operateTask.vue')
  }
]

export default routes
