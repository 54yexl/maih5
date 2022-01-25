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
  },
  {
    path: '/home/finish/task',
    name: 'FinishTask',
    component: () => import('@/views/home/order/finishTask.vue')
  },
  {
    path: '/home/evaluation/task',
    name: 'EvaluationTask',
    component: () => import('@/views/home/order/evaluationTask.vue')
  }
]

export default routes
