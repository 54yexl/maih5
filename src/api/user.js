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
