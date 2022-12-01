<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="searchObj.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="searchObj.userType" placeholder="请选择">
          <el-option label="投资人" :value="1"></el-option>
          <el-option label="借款人" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="searchObj.status" placeholder="请选择">
          <el-option label="锁定" :value="0"></el-option>
          <el-option label="正常" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleClear">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="users" stripe style="width: 100%; margin-top: 20px">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="userType" label="用户类型" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.userType === 1 ? 'warning' : 'success'"
            disable-transitions
          >
            {{ scope.row.userType === 1 ? '投资人' : '借款人' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="用户姓名"
        width="100"
      ></el-table-column>
      <el-table-column prop="idCard" label="身份证号"></el-table-column>
      <el-table-column
        prop="integral"
        label="用户积分"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="120"
      ></el-table-column>
      <el-table-column prop="bindStatus" label="绑定状态" width="80">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.bindStatus === 0"
            type="primary"
            disable-transitions
          >
            未绑定
          </el-tag>
          <el-tag
            v-else-if="scope.row.bindStatus === 1"
            type="success"
            disable-transitions
          >
            已绑定
          </el-tag>
          <el-tag v-else type="warning" disable-transitions>绑定失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'warning' : 'success'"
            disable-transitions
          >
            {{ scope.row.status === 0 ? '已锁定' : '正常' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.status === 1"
            @click="handleLock(0, scope.row)"
          >
            锁定
          </el-button>
          <el-button size="mini" v-else @click="handleLock(1, scope.row)">
            解锁
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleShowLoginRecords(scope.$index, scope.row)"
          >
            登录日志
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: center; margin-top: 25px">
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

    <el-dialog title="用户登录日志" :visible.sync="dialogTableVisible">
      <el-table :data="loginRecords">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column property="ip" label="IP"></el-table-column>
        <el-table-column
          property="createTime"
          label="登录时间"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import userInfo from '@/api/user-info'

export default {
  data() {
    return {
      users: [],
      pageNum: 1,
      pageSize: 3,
      total: 0,
      searchObj: {},
      loginRecords: [],
      dialogTableVisible: false,
    }
  },
  created() {
    this.getUserInfos()
  },
  methods: {
    getUserInfos() {
      userInfo
        .getUserInfos(this.pageNum, this.pageSize, this.searchObj)
        .then((r) => {
          this.users = r.data.page.records
          this.total = r.data.page.total
        })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getUserInfos()
    },
    handleCurrentChange(page) {
      this.pageNum = page
      this.getUserInfos()
    },
    handleQuery() {
      this.getUserInfos()
    },
    handleClear() {
      //清空条件查询第一页数据
      this.searchObj = {}
      this.pageNum = 1
      this.pageSize = 3
      this.getUserInfos()
    },
    handleLock(lockStatus, row) {
      console.log(lockStatus, typeof lockStatus, row)
      this.$confirm(`此操作将锁定 ${row.nickName}, 是否继续?`, '锁定提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //访问后端接口：更新用户的status值为传入的 lockStatus
          userInfo.updateStatus(row.id, lockStatus).then((r) => {
            this.$message({
              type: 'success',
              message: lockStatus === 0 ? '锁定成功!' : '解锁成功',
            })
            this.getUserInfos()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          })
        })
    },
    handleShowLoginRecords(index, row) {
      //显示登录日志按钮单击事件函数
      userInfo.getLoginRecords(row.id).then((r) => {
        console.log(r.data.items)
        this.loginRecords = r.data.items
        //弹出一个对话框显示数据列表
        this.dialogTableVisible = true
      })
    },
  },
}
</script>

<style scoped></style>
