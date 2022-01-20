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
    },
    {
      path: '/my/friend',
      name: 'MyFriends',
      component: () => import('@/views/home/account/friend.vue')
    },
    {
      path: '/appeal/list',
      name: 'AppealList',
      component: () => import('@/views/home/account/appealList.vue')
    }
  ]
  
  export default routes
  