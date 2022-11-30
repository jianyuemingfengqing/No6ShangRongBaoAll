<template>
  <!--登录-->
  <div class="wrap">
    <div class="tdbModule loginPage">
      <div class="registerTitle">用户登录</div>
      <div class="registerCont">
        <ul>
          <li>
            <span class="dis"></span>
            <input v-model="userInfo.userType" type="radio" value="1" />
            投资人
            <input v-model="userInfo.userType" type="radio" value="2" />
            借款人
          </li>
          <li>
            <span class="dis">手机号：</span>
            <input class="input" v-model="userInfo.mobile" />
          </li>

          <li>
            <span class="dis">密码：</span>
            <input class="input" v-model="userInfo.password" type="password" />
          </li>
          <li class="btn">
            <button @click="login()" :class="{ disabled: !isValid }">
              立即登录
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/register.css";
import cookie from "js-cookie";
// import ip from "internal-ip";
export default {
  data() {
    return {
      userInfo: {
        userType: 1,
      },
      isValid: true, //表单校验是否成功
    };
  },
  mounted() {
    // console.log("ip:" + ip.internalIpV4());
    if (
      this.$route.query.errorCode &&
      Number(this.$route.query.errorCode) === 211
    ) {
      //登录状态失效 跳转过来的请求
      this.$message.warning("登录状态失效，请重新登录");
    }
  },
  methods: {
    //登录
    login() {
      /*
        $axios可以配置请求和响应拦截器
            请求拦截器：可以对请求报文进行处理
            响应拦截器：可以拦截响应报文处理
      */
      this.$axios.$post("/api/core/userInfo/login", this.userInfo).then((r) => {
        console.log(r); //token代表登录成功的jwt token
        /*
          token 登录成功后 我们希望在多个页面中可以获取它使用  
              方式1： 通过路径参数或者 请求参数 每跳转一个页面 都携带此参数
              方式2： 浏览器的缓存技术
                    localStorage：
                        缓存后不会主动过期，浏览器提交请求时报文不会自动携带localstorage中的值访问后端
                    cookie：
                        cookie可以设置过期时间，浏览器访问时会自动携带cookie到请求报文中   还可以设置作用域(path)
        
        
       */
        //持久化缓存  除非手动清空浏览器缓存 或者js代码手动删除缓存
        localStorage.setItem("SRB-TOKEN", r.data.token);
        //设置cookie到浏览器中缓存 过期时间为7天   不设置过期时间默认存在浏览器运存中
        // cookie.set("SRB-COOKIE-TOKEN", r.data.token, { expires: 7, path: "/" });
        this.$message.success("登录成功");
        //this.$router.push("/user");
        window.location = "/user";
        //npm install internal-ip
      });
    },
  },
};
</script>
