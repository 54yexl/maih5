const routes = [
    {
      path: '/account/bind',
      name: 'AccountBind',
      component: () => import('@/views/home/account/bind.vue')
    },
    {
      path: '/account/bindTaobao',
      name: 'BindTaobao',
      component: () => import('@/views/home/account/bindTaob.vue')
    }
  ]
  
  export default routes
  