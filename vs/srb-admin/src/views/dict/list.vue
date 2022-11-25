<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadPath"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
    >
      <el-button size="small" type="primary" icon="el-icon-upload2">导入excel</el-button>
      <el-button
        @click="exportData"
        type="primary"
        size="mini"
        icon="el-icon-upload2">导出Excel
      </el-button>

    </el-upload>
    <el-table
      :data="dictList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dictCode"
        label="编码">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope"  v-show="">
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
  import dict from "@/api/dict";
  import integralGrade from "@/api/integral-grade";

  export default {
    data() {
      return {
        disabled: false,
        BASE_API: 'http://192.168.144.130',
        uploadPath: this.BASE_API + '/admin/core/dict/import',
        exportPath: this.BASE_API + '/admin/core/dict/import',
        dictList: [],
      };
    },
    created() {
      this.getDictList(1);
    },
    methods: {
      handleUploadError(err, file, fileList) {
        console.log(err);
        this.$message.error("导入失败")
      },
      handleUploadSuccess(response, file, fileList) {
        console.log(response)
        this.$message.success("导入成功")
      },
      handleBeforeUpload(file) {
        // 防止重复提交
        this.disabled = true
      },
      exportData() {
        window.location.href = this.exportPath
      },
      getDictList(id) {
        dict.getDictByPid(id).then(response => {
          console.log(response);
          this.dictList = response.data.items
        })
      },
      load(tree, treeNode, resolve) {
        dict.getDictByPid(tree.id).then(response => {
          resolve(
            response.data.items,
          )
        })
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
    }
  }
</script>

<style scoped>

</style>
