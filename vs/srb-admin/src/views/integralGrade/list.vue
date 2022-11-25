<template>
  <div>

    <el-button type="danger" @click="batchDel">批量删除</el-button>
    <el-button type="success" @click="regain">一键恢复</el-button>
    <el-table
      :data="userList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection"></el-table-column>

      <el-table-column
        type="index"
        width="50">
      </el-table-column>

      <el-table-column
        prop="borrowAmount"
        label="借款额度"
        width="180">
      </el-table-column>

      <el-table-column
        prop="integralStart"
        label="积分开始区间"
        width="180">
      </el-table-column>

      <el-table-column
        prop="integralEnd"
        label="积分结束区间">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import integralGrade from "@/api/integral-grade";

  export default {
    data() {
      return {
        userList: [],
        multipleSelection: null,
        currentPage: 1,
        pageSize: 3,
        total: 3
      }
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        /*       integralGrade.getAll().then(response => {
                 // console.log(response);
                 this.userList = response.data.items;
               });*/
        let pageNum = this.currentPage;
        let pageSize = this.pageSize;
        integralGrade.getPage(pageNum,pageSize).then(response => {
          // console.log(response);
          // this.userList = response.data.items;
          this.userList = response.data.items.records;
          this.total = response.data.items.total;
        });
      },
      tableRowClassName({row, rowIndex}) {
        console.log(rowIndex)
        if (rowIndex %2 === 0) {
          return 'success-row';
        } else if (rowIndex %2 !== 0) {
          return 'warning-row';
        }
        return '';
      },
      handleSelectionChange(val) {
        // console.log(val);
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        // console.log(index, row);
        this.$router.push(`/integralGrade/edit/${row.id}`)
      },
      handleDelete(index, row) {
        // console.log(index, row);

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          integralGrade.delete(row.id).then(response => {
            this.$message.success("删除成功");
            this.initData();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      regain() {
        integralGrade.regain().then(response => {
          this.initData();
        })
      },
      batchDel() {
        if (this.multipleSelection === 0 || !this.multipleSelection) {
          this.$message.warning("请选择");
        }
        let arr = [];
        this.multipleSelection.forEach(row => {
          arr.push(row.id);
        })
        let ids = arr.join(',');
        integralGrade.batchDel(ids).then(response => {
          this.$message.success('删除成功');
          this.initData();
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        // 点击时 调用方法 重新查询
        this.pageSize = val;
        this.initData();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.initData();
      }
    }
  }
</script>

<style >
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
