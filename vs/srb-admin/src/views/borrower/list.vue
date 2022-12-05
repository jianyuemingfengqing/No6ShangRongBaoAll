<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="keyword" placeholder="姓名/手机/身份证"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="list">查询</el-button>
        <el-button type="primary" @click="handleClear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="borrowers" height="250" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="mobile" label="手机" width="150"></el-table-column>
      <el-table-column prop="idCard" label="身份证号"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50">
        <template slot-scope="scope">
          <b>{{ scope.row.sex === 0 ? '女' : '男' }}</b>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="50"></el-table-column>
      <el-table-column prop="marry" label="是否结婚" width="50">
        <template slot-scope="scope">
          <b>{{ scope.row.marry ? '是' : '否' }}</b>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.status === 0">未认证</el-tag>
          <el-tag type="primary" v-else-if="scope.row.status === 1">
            认证中
          </el-tag>
          <el-tag v-else-if="scope.row.status === 2">已认证</el-tag>
          <el-tag v-else>认证失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="handleEdit(scope.$index, scope.row)"
          >
            审批
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 30px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 3, 4, 5]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import borrowerApi from '@/api/borrower'

export default {
  data() {
    return {
      borrowers: [],
      pageNum: 1,
      pageSize: 3,
      total: 0,
      keyword: '',
    }
  },
  created() {
    this.list()
  },
  methods: {
    list() {
      borrowerApi.list(this.pageNum, this.pageSize, this.keyword).then((r) => {
        this.borrowers = r.data.page.records
        this.total = r.data.page.total
      })
    },
    handleEdit(index, row) {
      //跳转到借款人详情页并携带借款人id
      this.$router.push('/borrower/detail?id=' + row.id)
    },
    handleClear() {
      this.keyword = ''
      this.pageNum = 1
      this.pageSize = 3
      this.list()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.list()
    },
    handleCurrentChange(num) {
      this.pageNum = num
      this.list()
    },
  },
}
</script>
