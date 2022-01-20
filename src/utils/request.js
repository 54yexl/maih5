import axios from 'axios'
import { Toast } from 'vant'
// import store from '../store'
import router from '@/router'
import { getCookie, logout } from '@/utils/user'

const pendingRequestList = []
const baseUrl = import.meta.env.VITE_APP_BASE_API

// const baseUrl = '/custom-api'
const instance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
  // timeout: 5000,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
})
const pendingTesting = config => {
  const requestMark = `${config.method}${config.url}`
  // const markIndex = pendingRequestList.findIndex(item => {
  //   return item.name === requestMark
  // })

  // 处理重复请求
  // if (markIndex > -1) {
  //   pendingRequestList[markIndex].cancel()
  //   pendingRequestList.splice(markIndex, 1)
  // }

  const cancelToken = axios.CancelToken.source()
  config.cancelToken = cancelToken.token
  config.requestMark = requestMark
  config.routeChangeCancel = true

  /**
   * @param name 请求拼接名
   * @param cancel 取消请求
   * @param routeChangeCancel 切换路由取消
   */
  pendingRequestList.push({
    name: requestMark,
    cancel: cancelToken.cancel,
    routeChangeCancel: config.routeChangeCancel
  })
}

// 请求拦截
instance.interceptors.request.use(
  config => {
    pendingTesting(config)
    // const token = getCookie('accessToken')

    // if (token) {
    //   config.headers['Authorization'] = token
    // }

    if (config.urlParams && Object.keys(config.urlParams).length) {
      let currentUrl = config.url

      // parse pathName to implement variables
      Object.entries(config.urlParams || {}).forEach(([k, v]) => {
        currentUrl = currentUrl.replace(`:${k}`, encodeURIComponent(v))
      })

      return {
        ...config,
        url: currentUrl
      }
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截
instance.interceptors.response.use(
  response => {
    const res = response.data

    const markIndex = pendingRequestList.findIndex(item => {
      return item.name === response.config.requestMark
    })
    markIndex > -1 && pendingRequestList.splice(markIndex, 1)

    if (res && res.code && res.code !== 0) {
      Toast.fail(res.msg)
      if (res.code === 1001) {
        logout().then(() => {
          router.push({
            path: '/user/login'
          })
        })
      }
      return Promise.reject(response)
    }
    return Promise.resolve(res)
  },
  err => {
    if (err?.response?.data) {
      const errRes = err.response
      Toast.fail(errRes.data.message)
      if (errRes?.status && errRes.status === 401) {
        logout().then(() => {
          router.push({
            path: '/user/login'
          })
        })
      }
      return Promise.reject(errRes)
    }
    if (JSON.stringify(err).indexOf('timeout') > -1) {
      Toast('请求超时，请重试！')
    }
    if (axios.isCancel(err)) {
      err.selfCancel = true
    }

    return Promise.reject(err)
  }
)

export { pendingRequestList, instance as request }
