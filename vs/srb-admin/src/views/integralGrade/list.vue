<template>
  <div>
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
  </div>

</template>

<script>
import integralGrade from "@/api/integral-grade";

export default {
  data() {
    return {
      userList: [],
    }
  },
  created() {
    integralGrade.getAll().then(response => {
      console.log(response);
      this.userList = response.data.items;
    });
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      console.log(row);
      console.log(rowIndex);
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
