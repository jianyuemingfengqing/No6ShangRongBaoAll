<template>
  <div class="personal-main">
    <div class="personal-pay">
		    <h3><i>借款人信息认证</i></h3>

		    <el-steps :active="active" style="margin: 40px">
				    <el-step title="填写借款人信息"></el-step>
				    <el-step title="提交平台审核"></el-step>
				    <el-step title="等待认证结果"></el-step>
		    </el-steps>

		    <div v-if="active === 0" class="user-borrower">
				    <h6>个人基本信息</h6>

				    <h6>联系人信息</h6>

				    <h6>身份认证信息</h6>

				    <h6>其他信息</h6>

				    <el-form label-width="120px">
						    <el-form-item>
								    <el-button
									    type="primary"
									    :disabled="submitBtnDisabled"
									    @click="save"
								    >
										    提交
								    </el-button>
						    </el-form-item>
				    </el-form>
		    </div>

		    <div v-if="active === 1">
				    <div style="margin-top:40px;">
						    <el-alert
							    title="您的认证申请已成功提交，请耐心等待"
							    type="warning"
							    show-icon
							    :closable="false"
						    >
								    我们将在2小时内完成审核，审核时间为周一至周五8:00至20:00。
						    </el-alert>
				    </div>
		    </div>

		    <div v-if="active === 2">
				    <div style="margin-top:40px;">
						    <el-alert
							    v-if="borrowerStatus === 2"
							    title="您的认证审批已通过"
							    type="success"
							    show-icon
							    :closable="false"
						    >
						    </el-alert>

						    <el-alert
							    v-if="borrowerStatus === -1"
							    title="您的认证审批未通过"
							    type="error"
							    show-icon
							    :closable="false"
						    >
						    </el-alert>
				    </div>
		    </div>
    </div>
  </div>
</template>
<script>
export default {
		data() {
				let BASE_API = process.env.BASE_API

				return {
						active: 0, //步骤
						borrowerStatus: null,
						submitBtnDisabled: false,
						//借款人信息
						borrower: {
								borrowerAttachList: [],
						},
						educationList: [], //学历列表
						industryList: [], //行业列表
						incomeList: [], //月收入列表
						returnSourceList: [], //还款来源列表
						contactsRelationList: [], //联系人关系
						uploadUrl: BASE_API + '/api/oss/file/upload', //文件上传地址
				}
		},

		methods: {
				save() {
						this.submitBtnDisabled = true
						this.active = 1
				},
		},
}
</script>
