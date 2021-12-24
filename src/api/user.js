import { request } from '@/utils/request'

// 发送验证码
export const sendCaptcha = data => request({
  url: '/disneyUsers/sendCaptcha',
  method: 'POST',
  data
})
// 登录
export const login = data => request({
  url: '/disneyUsers/login',
  method: 'POST',
  data
})
// 获取商城信息
export const getStoreDetail = data => request({
  url: '/disneyH5Store/getStoreDetailYiDongDuan',
  method: 'POST',
  data
})
// 工行免登
export const elifeLogin = data => request({
  url: '/autoLogin/elife',
  method: 'POST',
  data
})