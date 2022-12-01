import request from '@/utils/request'

export default{
  //1、分页查询会员列表
  getUserInfos(pageNum,pageSize,searchObj){
    return request({
      url:`/admin/core/userInfo/list/${pageNum}/${pageSize}`,
      method:'GET',
      params:searchObj  //{mobile:xxx,staus:1..}
    })
  },

  updateStatus(id,status){
    return request({
      url:`/admin/core/userInfo/updateStatus/${id}/${status}`,
      method:'PUT'
    })

  },
  getLoginRecords(userId){
    return request({
      url:`/admin/core/userLoginRecord/getLoginRecords/${userId}`,
      method:'GET'
    })
  }
}
