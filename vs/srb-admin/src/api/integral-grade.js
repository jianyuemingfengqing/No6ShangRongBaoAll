import request from '@/utils/request'

export default {
  getAll() {
    return request({
      url: '/admin/core/integralGrade',
      method: 'get'
    })
  },
  delete(id) {
    return request({
      url: '/admin/core/integralGrade/' + id,
      method: 'delete'
    })
  },
  regain() {
    return request({
      url: '/admin/integralGrade/regain',
      method: 'put'
    })
  },
  batchDel(ids) {
    return request({
      url: '/admin/integralGrade/batchDel',
      method: 'delete',
      params: {id: ids}
    })
  },
  save(item) {
    return request({
      url: '/admin/core/integralGrade',
      method: 'post',
      data: item
    })
  },
  update(item) {
    return request({
      url: '/admin/core/integralGrade',
      method: 'put',
      data: item
    })
  },
  //根据id查询积分等级
  getById(id){
    return request({
      //url地址会和@/utils/request的axios配置的baseURL属性值拼接
      url:`/admin/core/integralGrade/${id}`,
      method:'GET'
    })
  },
}
