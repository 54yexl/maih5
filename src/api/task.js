import { request } from '@/utils/request'
import serviceBase from './serviceConfig'

export const GetTaskApi = params =>
  request({
    url: `${serviceBase.API}/order/get?accountId=${params}`,
    method: 'get',
    // params
  })
export const TaskListApi = urlParams =>
  request({
    url: `${serviceBase.API}/account/list?:status`,
    method: 'get',
    urlParams
  })