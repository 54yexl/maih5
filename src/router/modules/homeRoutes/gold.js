const routes = [
    {
      path: '/gold/withdraw',
      name: 'GoldWithdraw',
      component: () => import('@/views/home/gold/withdraw.vue')
    },
    {
      path: '/gold/withdraw/detail',
      name: 'GoldWithdrawDetail',
      component: () => import('@/views/home/gold/withdrawDetail.vue')
    },
    {
      path: '/gold/funding/detail',
      name: 'FundingDetails',
      component: () => import('@/views/home/gold/fundingDetails.vue')
    },
    {
      path: '/income',
      name: 'Income',
      component: () => import('@/views/home/gold/income.vue')
    }
  ]
  
  export default routes