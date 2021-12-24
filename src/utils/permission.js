import router from '@/router'
import { Toast } from 'vant'
const routerWhiteList = ['/user/login']
import { getCookie, logout } from '@/utils/user'

// router.beforeEach((to, from, next) => {
//   const token = getCookie('accessToken')

//   if (!token && !routerWhiteList.includes(to.path)) {
//     const storeId = getCookie('storeId')
//     Toast.fail('验证失败，请重新登录')

//     logout().then(() => {
//       next({
//         path: '/user/login',
//         query: {
//           storeId: storeId
//         }
//       })
//     })
//   } else {
//     next()
//   }
// })
