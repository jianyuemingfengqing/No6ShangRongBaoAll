import request from '@/utils/request'
export default{
    //借款审批
    borrowInfoApproval(data){
        return request({
            url:`/admin/core/borrowInfo/approval`,
            method:'POST',
            data
        })
    },
    //查询借款详情
    getBorrowInfo(id){
        return request({
            url:`/admin/core/borrowInfo/${id}`,
            method:'GET'
        })
    },
    //查询借款审核列表
    getBorrowInfos(pageNum,pageSize){
        return request({
            url:`/admin/core/borrowInfo/list/${pageNum}/${pageSize}`,
            method:'GET'
        })
    },
    //审核借款人
    commitApproval(approval){
        return request({
            url:`/admin/core/borrower/approval`,
            method:'POST',
            data:approval
        })
    },
    //查询借款人详情
    getDetail(id){
        return request({
            url:`/admin/core/borrower/getBorrowerDetail/${id}`,
            method:'GET'
        })
    },
    //查询借款人审批列表
    list(pageNum,pageSize,keyword){
        return request({ //request相当于用 axios 发送请求, 需要传参
            url:`/admin/core/borrower/list/${pageNum}/${pageSize}`,
            method:'GET',
            params:{keyword}
          // 不加{}  相当于在路径后拼接 例如 1/3/伟哥
          // 使用{} 是json格式,使用k v 结构 keyword:伟哥
        })
    }
}
