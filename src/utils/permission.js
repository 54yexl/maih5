import router from '@/router'
import { Toast } from 'vant'
const routerWhiteList = ['/user/login']
import { getCookie, logout } from '@/utils/user'

router.beforeEach((to, from, next) => {
  const token = getCookie('accountInfo')

  if (!token && !routerWhiteList.includes(to.path)) {
    // Toast.fail('验证失败，请重新登录')

    logout().then(() => {
      next({
        path: '/user/login'
      })
    })
  } else {
    next()
  }
})
