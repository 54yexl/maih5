import { request } from '@/utils/request'
import serviceBase from './serviceConfig'

export const withdrawApi = data =>
  request({
    url: `${serviceBase.API}/balance/withdraw`,
    method: 'POST',
    data
  })
export const withdrawListApi = params =>
  request({
    url: `${serviceBase.API}/balance/withdraw/log`,
    method: 'GET',
    params
  })
export const wmoneyListApi = params =>
  request({
    url: `${serviceBase.API}/money/items`,
    method: 'GET',
    params
  })
export const wmoneyTotalApi = params =>
  request({
    url: `${serviceBase.API}/money/total`,
    method: 'GET',
    params
  })
export const configApi = params =>
  request({
    url: `${serviceBase.API}/config`,
    method: 'GET',
    params
  })