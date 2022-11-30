<template>
  <!--注册-->
  <div class="wrap">
    <div v-if="step === 1" class="tdbModule register">
      <div class="registerTitle">注册账户</div>
      <div class="registerLc1">
        <p class="p1">填写账户信息</p>
        <p class="p2">注册成功</p>
      </div>

      <div class="registerCont">
        <ul>
          <li>
            <span class="dis"></span>
            <input v-model="userInfo.userType" type="radio" value="1" />
            我要投资
            <input v-model="userInfo.userType" type="radio" value="2" />
            我要借钱
          </li>
          <li class="telNumber">
            <span class="dis">手机号码</span>
            <input class="input" v-model="userInfo.mobile" />
            <button v-if="!sending" class="button" @click="send()">
              获取验证码
            </button>
            <button v-else disabled class="button disabled">
              {{ leftSecond }}秒后重发
            </button>
          </li>

          <li>
            <span class="dis">短信验证码</span>
            <input class="input" v-model="userInfo.code" />
            <span class="info">
              请输入验证码
            </span>
          </li>

          <li>
            <span class="dis">密码</span>
            <input type="password" v-model="userInfo.password" class="input" />
            <span class="info">
              6-24个字符，英文、数字组成，区分大小写
            </span>
          </li>

          <li class="agree">
            <input type="checkbox" checked />
            我同意《<NuxtLink to="#" target="_black">尚融宝注册协议</NuxtLink>》
            <span>请查看协议</span>
          </li>
          <li class="btn">
            <button :disabled="flag" @click="register()">
              下一步
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="step === 2" class="tdbModule register">
      <div class="registerTitle">注册账户</div>
      <div class="registerLc2">
        <p class="p1">填写账户信息</p>
        <p class="p2">注册成功</p>
      </div>
      <div class="registerCont">
        <ul>
          <li class="scses">
            {{ this.userInfo.mobile }} 恭喜您注册成功！
            <NuxtLink class="blue" to="/login">
              请登录
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/register.css";
export default {
  data() {
    return {
      flag: false,
      step: 1, //注册步骤
      userInfo: {
        userType: 1,
      },
      timer: null,
      sending: false, // 是否发送验证码
      second: 10, // 倒计时间
      leftSecond: 0, //剩余时间
    };
  },

  methods: {
    //发短信
    send() {
      //http://192.168.1.170/api/sms/sendMsg/1123123123/0'
      //获取手机号码 访问后端接口发送验证码: 验证码发送成功给用户提示
      this.$axios
        .get(`/api/sms/sendMsg/${this.userInfo.mobile}/0`)
        .then((r) => {
          console.log(r);
          this.$message.success("验证码发送成功");
        });
      this.timeDown();
    },

    //倒计时
    timeDown() {
      //修改sending为true 显示倒计时
      this.sending = true;
      this.leftSecond = 60;
      //更新倒计时
      // setTimeout(()=>{} , 1000)  延迟任务  1000ms后执行一次函数
      //定时任务 每过1000ms执行一次函数
      this.timer = setInterval(() => {
        this.leftSecond--;
        //倒计时结束：修改sending为false 可以再次获取验证码
        if (this.leftSecond <= 0) {
          this.sending = false;
          this.leftSecond = 0;
          //结束定时任务
          clearInterval(this.timer);
        }
      }, 1000);
    },

    //注册
    register() {
      //注册按钮点击后禁用提交按钮防止表单重复提交
      this.flag = true;
      //提交注册请求
      this.$axios
        // post/get/this.$axios() 发起异步请求成功返回的是响应报文对象
        // $post/$get  异步成功返回的是R对象
        .$post("/api/core/userInfo/register", this.userInfo)
        .then((r) => {
          //r代表 响应报文对象  r.data代表后端的R对象
          console.log(r);
          this.$message.success("注册成功");
          //跳转到成功页面
          this.$router.push("/login");
        });
    },
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
