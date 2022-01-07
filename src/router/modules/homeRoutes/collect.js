const routes = [
  {
    path: '/collect/bind',
    name: 'CollectBind',
    component: () => import('@/views/home/collect/bind.vue')
  },
  {
    path: '/collect/bindBank',
    name: 'BindBank',
    component: () => import('@/views/home/collect/bindBank.vue')
  },
  {
    path: '/collect/bindAlipay',
    name: 'BindAlipay',
    component: () => import('@/views/home/collect/bindAlipay.vue')
  },
  {
    path: '/collect/bindWechat',
    name: 'BindWechat',
    component: () => import('@/views/home/collect/bindWechat.vue')
  },
  {
    path: '/collect/bindId',
    name: 'BindId',
    component: () => import('@/views/home/collect/bindId.vue')
  }
]

export default routes
