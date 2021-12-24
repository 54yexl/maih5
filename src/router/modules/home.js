// import hotel from './homeRoutes/hotel'
// import ticket from './homeRoutes/ticket'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    // redirect: '/home/hotel',
    // children: [
    //   ...hotel,
    //   ...ticket
    // ]
  }
]

export default routes
