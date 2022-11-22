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
      url: '/admin/integralGrade/'+ id,
      method: 'delete'
    })
  },
  regain(){
    return request({
      url: '/admin/integralGrade/regain',
      method: 'put'
    })
  },
  batchDel(ids){
    return request({
      url: '/admin/integralGrade/batchDel',
      method: 'delete',
      params: {id: ids}
    })
  }
}
