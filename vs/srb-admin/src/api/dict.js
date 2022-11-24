import request from '@/utils/request'

export default {
  getDictByPid(id) {
    return request({
      url: '/admin/core/dict/getDictByPid/' + id,
      method: 'get',
    })
  }
}
