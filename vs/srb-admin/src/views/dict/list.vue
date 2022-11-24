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
    </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        disabled: false,
        uploadPath : 'http://192.168.144.130/admin/core/dict/import'
      };
    },
    methods: {
      handleUploadError(err, file, fileList) {
        console.log(err);
        this.$message.error("导入失败")
      },
      handleUploadSuccess(response, file, fileList){
        console.log(response)
        this.$message.success("导入成功")
      },
      handleBeforeUpload(file){
        // 防止重复提交
        this.disabled = true
      }
    }
  }
</script>

<style scoped>

</style>
