<template>
  <div>
    <!-- 输入表单 -->
    <el-form
      :model="item"
      :rules="rules"
      ref="item"
      label-width="100px"
      class="demo-ruleForm"
      style="padding: 50px"
    >
      <el-form-item label="借款额度" prop="borrowAmount">
        <el-input v-model="item.borrowAmount"></el-input>
      </el-form-item>
      <el-form-item label="积分区间" prop="integralStart">
        <el-input v-model="item.integralStart"></el-input>
      </el-form-item>
      <el-form-item prop="integralEnd">
        <el-input v-model="item.integralEnd"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import integralGrade from "@/api/integral-grade";

  export default {
    data() {
      return {
        item: {
          integralStart: 0,
          integralEnd: 0,
        }, // 初始化数据
        rules: {
          //borrowAmount代表要校验的属性
          borrowAmount: [
            { required: true, message: '请输入借款额度', trigger: 'blur' }, //内容空值校验
            { min: 3, max: 7, message: '长度在 3 到 7 位', trigger: 'blur' }, //长度范围校验
          ],
          integralStart: [
            { required: true, message: '请输入积分等级开始', trigger: 'blur' }, //内容空值校验
            { min: 2, max: 7, message: '长度在 2 到 7 位', trigger: 'blur' }, //长度范围校验
          ],
          integralEnd: [
            { required: true, message: '请输入积分等级结束', trigger: 'blur' }, //内容空值校验
            { min: 2, max: 7, message: '长度在 2 到 7 位', trigger: 'blur' }, //长度范围校验
          ],
        },
      }
    },
    methods: {

      submitForm() {
        // debugger
        integralGrade.save(this.item).then(response => {
          this.$message.success("新增成功")
          // 去指定的页面
          this.$router.push('/integralGrade/list')
        })
      }
    }
  }
</script>

<style scoped>

</style>
