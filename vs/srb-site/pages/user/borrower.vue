<template>
  <div class="personal-main">
    <div class="personal-pay">
      <h3><i>借款人信息认证</i></h3>
      <el-steps :active="active" simple>
        <el-step title="填写借款人信息" icon="el-icon-edit"></el-step>
        <el-step title="提交平台审核" icon="el-icon-upload"></el-step>
        <el-step title="认证结果" icon="el-icon-picture"></el-step>
      </el-steps>
      <div v-if="active === 0" class="user-borrower">
        <h6>个人基本信息</h6>
        <el-form label-width="120px">
          <el-form-item label="年龄">
            <el-col :span="5">
              <el-input v-model="borrower.age" />
            </el-col>
          </el-form-item>

          <el-form-item label="性别">
            <el-select v-model="borrower.sex">
              <el-option :value="1" :label="'男'" />
              <el-option :value="0" :label="'女'" />
            </el-select>
          </el-form-item>
          <el-form-item label="婚否">
            <el-select v-model="borrower.marry">
              <el-option :value="true" :label="'是'" />
              <el-option :value="false" :label="'否'" />
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="borrower.education">
              <el-option
                v-for="item in educationList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="行业">
            <el-select v-model="borrower.industry">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="月收入">
            <el-select v-model="borrower.income">
              <el-option
                v-for="item in incomeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="还款来源">
            <el-select v-model="borrower.returnSource">
              <el-option
                v-for="item in returnSourceList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <h6>联系人信息</h6>
        <el-form label-width="120px">
          <el-form-item label="联系人姓名">
            <el-col :span="5">
              <el-input v-model="borrower.contactsName" />
            </el-col>
          </el-form-item>
          <el-form-item label="联系人手机">
            <el-col :span="5">
              <el-input v-model="borrower.contactsMobile" />
            </el-col>
          </el-form-item>
          <el-form-item label="联系人关系">
            <el-select v-model="borrower.contactsRelation">
              <el-option
                v-for="item in contactsRelationList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <h6>身份认证信息</h6>
        <el-form label-width="120px">
          <el-form-item label="身份证人像面">
            <el-upload
              :on-success="onUploadSuccessIdCard1"
              :on-remove="onUploadRemove"
              :multiple="false"
              :action="uploadUrl"
              :data="{ module: 'idCard1' }"
              :limit="1"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证国徽面">
            <el-upload
              :on-success="onUploadSuccessIdCard2"
              :on-remove="onUploadRemove"
              :multiple="false"
              :action="uploadUrl"
              :data="{ module: 'idCard2' }"
              :limit="1"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <h6>其他信息</h6>
        <el-form label-width="120px">
          <el-form-item label="房产信息">
            <el-upload
              :on-success="onUploadSuccessHouse"
              :on-remove="onUploadRemove"
              :multiple="false"
              :action="uploadUrl"
              :data="{ module: 'house' }"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="车辆信息">
            <el-upload
              :on-success="onUploadSuccessCar"
              :on-remove="onUploadRemove"
              :multiple="false"
              :action="uploadUrl"
              :data="{ module: 'car' }"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>

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
        <div style="margin-top: 40px">
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
        <div style="margin-top: 40px">
          <el-alert
            v-if="borrowerStatus === 2"
            title="您的认证审批已通过"
            type="success"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-button
            v-if="borrowerStatus === 2"
            @click="handleApply"
            type="success"
          >
            我要借款
          </el-button>
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
    return {
      uploadUrl: "http://192.168.176.128/api/oss/upload", //上传文件的接口地址
      contactsRelationList: [], //联系人关系列表
      incomeList: [], //收入列表
      industryList: [], //行业列表
      educationList: [], //学历列表
      returnSourceList: [], //还款来源
      borrower: {
        //附件集合
        attachs: [],
      }, //借款人
      submitBtnDisabled: false,
		    // 表单进来后不显示
      active: undefined,
      // active: 0,
      borrowerStatus: 0,
    };
  },
  created() {
    this.getBorrowerStatus();
  },
  methods: {
    handleApply() {
      //跳转到借款页
      this.$router.push("/user/apply");
    },
    //借款人认证信息页面初始化查询 借款人认证状态
    getBorrowerStatus() {
      this.$axios
        .$get("/api/core/borrower/auth/getBorrowerStatus")
        .then((r) => {
          this.borrowerStatus = r.data.status;
          if (r.data.status === 1) {
            //认证中
            this.active = 1;
          } else if (r.data.status === 2 || r.data.status === -1) {
            //认证结果
            this.active = 2;
          } else {
            //还未提交借款人认证信息
            this.active = 0;
            //查询收入
            this.$axios
              .$get("/api/core/dict/getDictsByDictCode/income")
              .then((r) => {
                this.incomeList = r.data.items;
              });
            //查询行业
            this.$axios
              .$get("/api/core/dict/getDictsByDictCode/industry")
              .then((r) => {
                this.industryList = r.data.items;
              });
            //查询学历
            this.$axios
              .$get("/api/core/dict/getDictsByDictCode/education")
              .then((r) => {
                this.educationList = r.data.items;
              });
            //查询还款来源
            this.$axios
              .$get("/api/core/dict/getDictsByDictCode/returnSource")
              .then((r) => {
                this.returnSourceList = r.data.items;
              });
            //联系人关系
            this.$axios
              .$get("/api/core/dict/getDictsByDictCode/relation")
              .then((r) => {
                this.contactsRelationList = r.data.items;
              });
          }
        });
    },
    onUploadSuccessHouse(response, file, fileList) {
      this.borrower.attachs.push({
        imageType: "house",
        imageUrl: response.data.path,
        imageName: file.name,
      });
    },
    onUploadSuccessCar(response, file, fileList) {
      this.borrower.attachs.push({
        imageType: "car",
        imageUrl: response.data.path,
        imageName: file.name,
      });
    },
    onUploadRemove(file, fileList) {
      //移除图片的回调
      //从借款人附件列表中移除该附件
      let fileName = file.name;
      let attachs2 = [];
      if (this.borrower.attachs) {
        for (let index = 0; index < this.borrower.attachs.length; index++) {
          let attach = this.borrower.attachs[index];
          if (attach.imageName !== fileName) {
            attachs2.push(attach);
          }
        }
      }
      this.borrower.attachs = attachs2;
    },
    //上传身份证正面照成功的回调: 将上传成功的图片路径获取设置给borrower
    onUploadSuccessIdCard1(response, file, fileList) {
      console.log(response);
      console.log(file);
      this.borrower.attachs.push({
        imageType: "idCard1",
        imageUrl: response.data.path,
        imageName: file.name,
      });
    },
    //上传身份证反面照成功的回调
    onUploadSuccessIdCard2(response, file, fileList) {
      this.borrower.attachs.push({
        imageType: "idCard2",
        imageUrl: response.data.path,
        imageName: file.name,
      });
    },
    save() {
      this.submitBtnDisabled = true; // 禁止重复提交, 取消按钮使用
      // console.log(this.borrower);
      this.$axios
        .$post("/api/core/borrower/auth/commitBorrower", this.borrower)
        .then((r) => {
          this.$message.success("个人基本信息提交成功");
          this.active = 1; // 提交成功后 切换页面
        });
    },
  },
};
</script>
