const routes = [
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('@/views/user/login.vue')
  },
  {
    path: '/user/register',
    name: 'Register',
    component: () => import('@/views/user/register.vue')
  },
  {
    path: '/user/personal',
    name: 'Personal',
    component: () => import('@/views/user/personal.vue')
  },
  {
    path: '/user/forgotPassword',
    name: 'ForgotPassword',
    component: () => import('@/views/user/forgotPassword.vue')
  }
]
export default routes
