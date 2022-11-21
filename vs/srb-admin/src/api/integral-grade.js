import request from '@/utils/request'

export default {
  getAll() {
    return request({
      url: '/admin/integralGrade',
      method: 'get'
    })
  },
  delete(id) {
    return request({
      url: '/admin/integralGrade'+ id,
      method: 'delete'
    })
  }
}
