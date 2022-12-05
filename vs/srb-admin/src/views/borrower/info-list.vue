<template>
  <div class="app-container">
    <!-- 列表 -->
    <el-table :data="borrowInfos" stripe>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="name" label="借款人姓名" width="90" />
      <el-table-column prop="mobile" label="手机" />
      <el-table-column prop="amount" label="借款金额" />
      <el-table-column
        label="借款期限"
        prop="period"
        width="90"
      ></el-table-column>
      <el-table-column prop="returnMethod" label="还款方式" width="150" />
      <el-table-column prop="moneyUse" label="资金用途" width="100" />
      <el-table-column
        label="年化利率"
        prop="borrowYearRate"
        width="90"
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="100" />

      <el-table-column prop="createTime" label="申请时间" width="150" />

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">
            <router-link :to="'/borrower/info-detail/' + scope.row.id">
              查看
            </router-link>
          </el-button>

          <el-button
            v-if="scope.row.status === '审核中'"
            type="warning"
            size="mini"
            @click="approvalShow(scope.row)"
          >
            审批
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 审批对话框 -->
    <el-dialog title="审批" :visible.sync="dialogVisible" width="490px">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="是否通过">
          <el-radio-group v-model="borrowInfoApproval.status">
            <el-radio :label="2">通过</el-radio>
            <el-radio :label="-1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="标的名称">
          <el-input v-model="borrowInfoApproval.title" />
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="起息日">
          <el-date-picker
            v-model="borrowInfoApproval.lendStartDate"
            type="date"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="年化收益率">
          <el-input v-model="borrowInfoApproval.lendYearRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="服务费率">
          <el-input v-model="borrowInfoApproval.serviceRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="标的描述">
          <el-input v-model="borrowInfoApproval.lendInfo" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="approvalSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import borrowerApi from '@/api/borrower'
export default {
  data() {
    return {
      borrowInfoApproval: {
        lendYearRate: 0,
        status: 2,
        serviceRate: 5,
      },
      dialogVisible: false,
      borrowInfos: [],
      pageNum: 1,
      pageSize: 3,
      total: 0,
    }
  },
  created() {
    this.getBorrowInfos()
  },
  methods: {
    //借款审批对话框的提交按钮事件函数
    approvalSubmit() {
      borrowerApi.borrowInfoApproval(this.borrowInfoApproval).then((r) => {
        this.$message.success('审批完成')
        //关闭对话框
        this.dialogVisible = false
        //刷新页面
        this.getBorrowInfos()
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getBorrowInfos()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getBorrowInfos()
    },
    //审批对话框弹出按钮单击事件函数
    approvalShow(row) {
      //清空之前使用审批对话框的缓存
      this.borrowInfoApproval = {
        lendYearRate: 0,
        status: 2,
        serviceRate: 5,
      }
      console.log(row)
      this.borrowInfoApproval.borrowId = row.id //将要审批的借款信息的id绑定 后端更新审批状态时需要使用
      this.borrowInfoApproval.lendYearRate = Number(
        row.borrowYearRate.replace('%', '')
      )
      this.dialogVisible = true
    },
    getBorrowInfos() {
      borrowerApi.getBorrowInfos(this.pageNum, this.pageSize).then((r) => {
        this.borrowInfos = r.data.page.records
        this.total = r.data.page.total
      })
    },
  },
}
</script>
