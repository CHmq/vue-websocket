// 访客信息
import { request } from '../request'
// 访客信息
export function getVisitInfo (mchid, page) {
    return request({
        url: 'api/agent/getVisitInfo',
        method: 'get',
        params: {
            mchid,
            page
        }
    })
}
