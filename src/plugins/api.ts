/**
 *
 * api server 管理
 *
 * PS: 这里用node来导出模块 是为了在mock中mock服务使用，并且mock中监听了该文件，有更改则刷新mock
 *
 * */

import Vue from 'vue'
import ApiManage from 'api-manage'
import axios from 'axios'
import { createApiList } from '@/api.config'

const apiFiles = import.meta.globEager('../apis/*.ts')

// 请求统一处理
const service: any = axios.create({
    timeout: 1 * 60 * 1000,
})

service.interceptors.request.use(
    (config: any) => config,
    (error: any) => Promise.reject(error)
)
service.interceptors.response.use(
    (response: any) => response,
    (error: any) => Promise.reject(error)
)

export const serviceList = new ApiManage({
    request: service,

    CancelRequest: axios.CancelToken,

    list: createApiList(Object.values(apiFiles).map((v) => v.default)),

    // 请求验证
    validate: () => true,

    // 提取 response
    limitResponse: (res) => res?.data?.data,
}).getService()

/**
 * 获取 api请求函数
 * */
export const useApi = () => ({ ...serviceList })

Vue.prototype.$api = useApi()

export default serviceList
