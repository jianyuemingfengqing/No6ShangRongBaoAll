<template>
		<header>
				<div class="header-top min-width">
						<div class="container fn-clear">
								<strong class="fn-left">
										咨询热线：400-000-0000
										<span class="s-time">服务时间：9:00 - 18:00</span>
								</strong>
								<ul class="header_contact">
										<li class="c_1">
												<a class="ico_head_weixin" id="wx"></a>
										</li>
										<li class="c_2">
												<a href="#" target="_blank" title="官方QQ" alt="官方QQ">
														<b class="ico_head_QQ"></b>
												</a>
										</li>
										<li class="c_4">
												<a href="#" target="_blank" title="新浪微博" alt="新浪微博">
														<b class="ico_head_sina"></b>
												</a>
										</li>
								</ul>

								<!-- 用户未登录 -->
								<ul v-if="!userInfo" class="fn-right header-top-ul">
										<!-- <li><a href="" :class="'c-orange'">测试</a></li> -->
										<li>
												<NuxtLink to="/" :class="{ 'c-orange': $route.fullPath === '/' }"
												>返回首页
												</NuxtLink
												>
										</li>
										<li>
												<div class="">
														<NuxtLink
															to="/register"
															:class="{ 'c-orange': $route.fullPath === '/register' }"
														>
																免费注册
														</NuxtLink>
												</div>
										</li>
										<li>
												<div class="">
														<NuxtLink
															to="/login"
															:class="{ 'c-orange': $route.fullPath === '/login' }"
														>
																登录
														</NuxtLink>
												</div>
										</li>
								</ul>

								<!-- 用户已登录 -->
								<ul v-if="userInfo" class="fn-right header-top-ul">
										<li>
												<NuxtLink to="/" class="app">返回首页</NuxtLink>
										</li>
										<li>
												<div class="">
														<NuxtLink to="/user" class="user" title="我的账户">
																<i class="el-icon-user-solid">{{ userInfo.nickName }}</i>
														</NuxtLink>
												</div>
										</li>
										<li>
												<div class="">
														<a
															href="javascript:void(0)"
															class="js-login"
															@click="logout()"
															title="退出"
														>
																退出
														</a>
												</div>
										</li>
								</ul>
						</div>
				</div>
				<div class="header min-width">
						<div class="container">
								<div class="fn-left logo">
										<NuxtLink to="/">
												<img src="~/assets/images/logo.png" title=""/>
										</NuxtLink>
								</div>
								<ul class="top-nav fn-clear">
										<li :class="{ on: $route.fullPath === '/' }">
												<NuxtLink to="/">首页</NuxtLink>
										</li>
										<li :class="{ on: $route.fullPath === '/list' }">
												<NuxtLink to="/lend"> 我要投资</NuxtLink>
										</li>
										<li :class="{ on: $route.fullPath === '/help' }">
												<NuxtLink to="/help">安全保障</NuxtLink>
										</li>
										<li :class="{ on: $route.fullPath === '/about' }">
												<NuxtLink to="/about">关于我们</NuxtLink>
										</li>
								</ul>
						</div>
				</div>
		</header>
</template>
<script>
		import '~/assets/font/iconfont.css'
		import cookie from 'js-cookie'

		export default {
				data() {
						return {
								userInfo: null,
						}
				},

				mounted() {
						//判断 如果已经存在userInfo的数据 直接回显
						// let json = localStorage.getItem("userInfo");
						// if (json) {
						// 		//已存在回显数据
						// 		this.userInfo = JSON.parse(json);
						// } else {
						//查询用户数据回显
						this.showInfo();
						// }
				},

				methods: {
						//显示用户信息
						showInfo() {
								//根据登录成功的token查询token对应用户的 nickname和id以及头像 给前端回显
								//1、获取localstorage中的 token
								let token = localStorage.getItem("SRB-TOKEN");
								//2、如果token存在 发送异步请求查询用户个人信息
								if (token) {
										//token存在
										this.$axios({
												url: "/api/core/userInfo/auth/getUserInfo",
												method: "get",
												headers: {token}, //请求头中携带token
										}).then(response => {
												console.log(response)
												this.userInfo = response.data.data.item;
												// 将登录成功的用户数据缓存到localStorage中  方便后面本地回显
												localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
										})
								}
						},

						//退出
						logout() {
								//删除localStorage中的缓存即可
								localStorage.removeItem("SRB-TOKEN");
								localStorage.removeItem("userInfo");
								//跳转到首页
								window.location = "/";
						},
				},
		}
</script>
