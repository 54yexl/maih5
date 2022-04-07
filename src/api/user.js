import { request } from '@/utils/request'
import serviceBase from './serviceConfig'
// 注册发送验证码
export const sendCodeApi = params =>
  request({
    url: `${serviceBase.API}/register/sms/code`,
    method: 'POST',
    params
  })
// 忘记密码发送验证码
export const forgetSendCodeApi = params =>
  request({
    url: `${serviceBase.API}/forget/password/sms/code`,
    method: 'POST',
    params
  })
// 注册
export const registerApi = data =>
  request({
    url: `${serviceBase.API}/register`,
    method: 'POST',
    data
  })
// 图片验证码
export const captchaApi = data => {
  return `${
    process.env.NODE_ENV === 'production'
      ? window?.location?.origin
      : import.meta.env.VITE_APP_BASE_API
  }${serviceBase.API}/code?${Math.random()}`
}
// 登录
export const loginApi = params =>
  request({
    url: `${serviceBase.API}/login`,
    method: 'POST',
    params
  })

export const forgetKeyApi = data =>
  request({
    url: `${serviceBase.API}/forget/password`,
    method: 'POST',
    data
  })
export const modifyKeyApi = data =>
  request({
    url: `${serviceBase.API}/password/modify`,
    method: 'POST',
    data
  })
export const getAlipayApi = () =>
  request({
    url: `${serviceBase.API}/withdraw/account/alipay`,
    method: 'get'
  })
export const getBankApi = () =>
  request({
    url: `${serviceBase.API}/withdraw/account/bank`,
    method: 'get'
  })
export const getWechatApi = () =>
  request({
    url: `${serviceBase.API}/withdraw/account/wechat`,
    method: 'get'
  })
export const setWechatApi = data =>
  request({
    url: `${serviceBase.API}/wechat/withdraw/account`,
    method: 'post',
    data
  })
export const setBankApi = data =>
  request({
    url: `${serviceBase.API}/bank/withdraw/account`,
    method: 'post',
    data
  })
export const setAlipayApi = data =>
  request({
    url: `${serviceBase.API}/alipay/withdraw/account`,
    method: 'post',
    data
  })
export const setAcountApi = data =>
  request({
    url: `${serviceBase.API}/real/modify`,
    method: 'post',
    data
  })
export const getAcountApi = data =>
  request({
    url: `${serviceBase.API}/real/detail`,
    method: 'get',
    data
  })
export const uploadImgApi = data =>
  request({
    url: `${serviceBase.API}/image/upload`,
    method: 'post',
    data
  })
export const InfoApi = data =>
  request({
    url: `${serviceBase.API}/info`,
    method: 'get',
    data
  })
export const memberOutApi = data =>
  request({
    url: `${serviceBase.API}/out`,
    method: 'post',
    data
  })
export const infoModifyApi = data =>
  request({
    url: `${serviceBase.API}/info/modify`,
    method: 'post',
    data
  })
