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
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import dict from "@/api/dict";

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
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
