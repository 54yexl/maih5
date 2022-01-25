import { request } from '@/utils/request'
import serviceBase from './serviceConfig'

export const BindAccountApi = data =>
  request({
    url: `${serviceBase.API}/account/bind`,
    method: 'POST',
    data
  })
export const BindAccountListApi = data =>
  request({
    url: `${serviceBase.API}/account/list`,
    method: 'GET',
    data
  })
export const BindAccountDetailApi = params =>
  request({
    url: `${serviceBase.API}/account/detail`,
    method: 'GET',
    params
  })
export const BindAccountNumApi = data =>
  request({
    url: `${serviceBase.API}/account/bind/num`,
    method: 'GET',
    data
  })
export const noticeApi = data =>
  request({
    url: `${serviceBase.API}/show/notice`,
    method: 'GET',
    data
  })
export const friendsListApi = params =>
  request({
    url: `${serviceBase.API}/my/friends`,
    method: 'GET',
    params
  })
export const complaintListApi = params =>
  request({
    url: `${serviceBase.API}/order/complaint/list`,
    method: 'GET',
    params
  })
export const orderListApi = params =>
  request({
    url: `${serviceBase.API}/order/list`,
    method: 'GET',
    params
  })
export const orderDetailApi = params =>
  request({
    url: `${serviceBase.API}/order/detail/${params.id}`,
    method: 'GET'
  })
export const orderComplaintApi = data =>
  request({
    url: `${serviceBase.API}/order/complaint/add`,
    method: 'post',
    data
  })
export const shopCheckApi = params =>
  request({
    url: `${serviceBase.API}/order/shop/check`,
    method: 'post',
    params
  })
export const orderCancelApi = params =>
  request({
    url: `${serviceBase.API}/order/cancel/${params.id}`,
    method: 'get',
    params
  })
export const orderFinishApi = params =>
  request({
    url: `${serviceBase.API}/order/opt/finish`,
    method: 'post',
    params
  })
export const orderCommentApi = params =>
  request({
    url: `${serviceBase.API}/order/comment/${params.id}`,
    method: 'get',
    params
  })
export const orderCommentFinApi = params =>
  request({
    url: `${serviceBase.API}/order/comment/finish`,
    method: 'post',
    params
  })