<template>
	<view class="login">
		<view class="login-up">
			<image src='../../static/img/icons/logo.png'></image>
			<view class="login-uptext">武装大脑</view>
		</view>
		<view class="login-mid">
			<input placeholder="请输入手机号" type="number" v-model="tel"/>
			<view class="login-mid-input">
				<input placeholder="请输入验证码" type="number" v-model="telCode"/>
				<view class="login-midsms" @click="clickCodemsg">{{codeMsg}}</view>
			</view>
			<view class="login-midbtn" @click="clickLogin">登录</view>
		</view>
		<button class="login-down" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" v-if="checked == true && weChatPhone == ''">
			<image src='../../static/img/icons/weixin.jpg'></image>
			<!-- 1 -->
		</button>
		<button class="login-down" v-if="checked == true && weChatPhone != ''" @click="clickWechatLogin">
			<image src='../../static/img/icons/weixin.jpg'></image>
			<!-- 2 -->
		</button>
		<button class="login-down" v-if="checked == false" @click="openProvider">
			<image src='../../static/img/icons/weixin.jpg'></image>
			<!-- 3 -->
		</button>
		<!-- <button class="login-down" open-type="getUserInfo" lang="zh_CN" @getuserinfo="loginForProvider" v-if="checked == true">
			<image src='../../static/img/icons/weixin.jpg'></image>
		</button> -->
		<checkbox-group class="login-bottom" @change="changeCheckbox">
			<checkbox style="transform: scale(0.7)" :checked="checked"></checkbox>
			<view class="login-botext" @click="gotoUrl('/pages/loginAll/useragreement')">武装大脑服务用户协议</view>	
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeMsg: '发送验证码',
				count: 60,
				disable: false,
				checked: true,
				tel:'',// 用户登录填写手机号
				telCode: '',//验证码
				weChatPhone:'',//用户微信获取手机号
			};
		},
		mounted(){
			if(uni.getStorageSync('phoneNumber')){
				this.weChatPhone = uni.getStorageSync('phoneNumber')
			}
		},
		methods:{
			changeCheckbox(e){
				this.checked = !this.checked
			},
			// 获取验证码
			clickCodemsg(){
				if (!this.tel) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
					return
				}
				const rsg = /^[1][3,4,5,6,7,8][0-9]{9}$/
				if (this.tel.indexOf('.') !== -1 || !rsg.test(this.tel)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					})
					return
				}
				if(this.disable == false){
					this.$Request.get(`/appTelcodeController.do?getTelcode&tel=${this.tel}&type=2`).then(res => {
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
						if(res.code == '0') {
							let timer =  setInterval(() => {
								this.count -= 1
								this.codeMsg = this.count + 's'
								this.disable = true
								if(this.count < 0){
									clearInterval(timer)
									this.codeMsg = '发送验证码'
									this.count = 60
									this.disable = false
								}
							}, 1000)
						}
					}).catch(error => {
						console.log(error)
					})
				}
			},
			// 点击登录按钮
			clickLogin(){
				if(this.checked == false){
					uni.showToast({
						title: '请先阅读同意服务协议！',
						icon: 'none'
					});
				}else{
					if(!this.tel || !this.telCode){
						uni.showToast({
							title: '请检查输入项！',
							icon: 'none'
						});
					}else{
						// 用户手机登录
						this.$Request.get(`/appMemberController.do?loginMemberTel&tel=${this.tel}&telCode=${this.telCode}`)
						.then(res => {
							if(res.code == 0){
								uni.showToast({
									title: '登录成功，正在跳转...',
									icon: 'none'
								})
								uni.setStorageSync('userInfo', JSON.stringify(res.data.member))
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/myData/myData'
									})
								},1000)
							}else if(res.code == 100){
								// 尚未注册
								this.$Request.get(`/appMemberController.do?registerMember&memberTel=${this.tel}&openid=${uni.getStorageSync('openid')}`
								).then(res => {
									if(res.code == 0){
										uni.showToast({
											title: '登录成功，正在跳转...',
											icon: 'none'
										})
										uni.setStorageSync('userInfo', JSON.stringify(res.data.member))
										setTimeout(()=>{
											uni.switchTab({
												url:'/pages/myData/myData'
											})
										},1000)
									}else{
										uni.showToast({
											title: res.info,
											icon: 'none'
										})
									}
								})
							}else{
								uni.showToast({
									title: res.info,
									icon: 'none'
								});
							}
						})
					}
				}
			},
			// 小程序获取用户手机号
			onGetPhoneNumber(e){
				let vm = this
				if(e.detail.errMsg == 'getPhoneNumber:ok'){
					vm.$Request.postT('/wxController.do?getWxPhone',{
						ivdata:e.detail.iv,
						encrypdata: e.detail.encryptedData,
						sessionKey: uni.getStorageSync('sessionKey')
					},'application/json;charset=UTF-8').then(res => {
						if(res.code == 0){
							uni.setStorageSync('phoneNumber', JSON.parse(res.data.phone).phoneNumber)
							vm.weChatPhone = uni.getStorageSync('phoneNumber')
							vm.wechatLoginMember()
						}else{
							uni.showToast({
								title: res.info,
								icon: 'none'
							});
						}
					})
				}else{
					uni.showToast({
						title: '此程序需要获取您的授权才可进行登录！',
						icon: 'none'
					})
				}
			},
			// 小程序已有手机号，实现微信登录
			clickWechatLogin(){
				this.wechatLoginMember()
			},
			// 小程序查看是否已经注册过，已注册则可登录
			wechatLoginMember(){
				let vm = this
				vm.$Request.get(`/appMemberController.do?loginMember&openid=${uni.getStorageSync('openid')}`).then(res => {
					if(res.code == 0){
						// 已注册，可登录
						uni.showToast({
							title: '登录成功，正在跳转...',
							icon: 'none'
						})
						uni.setStorageSync('userInfo', JSON.stringify(res.data.member))
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/myData/myData'
							})
						},1000)
					}else if(res.code == 100){
						// 尚未注册
						vm.$Request.get(`/appMemberController.do?registerMember&memberTel=${uni.getStorageSync('phoneNumber')}&openid=${uni.getStorageSync('openid')}`
						).then(res => {
							if(res.code == 0){
								uni.showToast({
									title: '登录成功，正在跳转...',
									icon: 'none'
								})
								uni.setStorageSync('userInfo', JSON.stringify(res.data.member))
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/myData/myData'
									})
								},1000)
							}else{
								uni.showToast({
									title: res.info,
									icon: 'none'
								})
							}
						})
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			// 微信小程序点击勾选协议
			openProvider(){
				uni.showToast({
					title: '请先阅读同意服务协议！',
					icon: 'none'
				});
			},
			gotoUrl(url){
				uni.navigateTo({
					url:url
				})
			},
			// 微信登录,暂时没用到
			loginForProvider(type){
				var vm = this;
				let openid = uni.getStorageSync('openid')
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
				        if (~res.provider.indexOf('weixin')) {
				        	uni.login({
				        		provider: 'weixin',
				        		success: function(loginRes) {
									// console.log(loginRes.code) // code
									vm.$Request.get(`/wxController.do?getOpenid&code=${loginRes.code}`).then(res => {
										if(res.errmsg){
											uni.showToast({
												title: res.errmsg,
												icon: 'none'
											})
										}
										// console.log(res) //openid
										if(res.openid){
											uni.setStorageSync('openid', res.openid)
										}
									})
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
										   console.log(info);
										},
										fail: () => {
										   uni.showToast({title:"微信登录授权失败",icon:"none"});
										}
									 })
				        		},
				        		fail(err) {
				        			uni.showToast({
				        				title: '授权失败！',
				        				icon: 'none'
				        			});
				        		}
				        	});
				        }else{
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon:"none"
							});
						}
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
page{
		background-color: #FFFFFF;
	}
button::after{
	border: none;
	background-color: none;
}
.login{
	width: 100%;
	.login-up{
		width: 100%;
		height: 400rpx;
		background-color: $uni-color-primary;
		text-align: center;
		image{
			margin-top: 80rpx;
			width: 21%;
			height: 42%;
		}
		.login-uptext{
			color: #FFFFFF;
			margin-top: 40rpx;
			text-align: center;
			font-size: 43rpx;
		}
	}
	.login-mid{
		width: 80%;
		margin: auto;
		margin-top: 10%;
		input{
			width: 100%;
			height: 100%;
			padding-bottom: 20rpx;
			margin-top: 10%;
			box-sizing: border-box;
			font-size: 32rpx;
			border-bottom: 1px solid #E6E6E6;
		}
		.login-mid-input{
			position: relative;
			width: 100%;
			.login-midsms{
				position: absolute;
				bottom: 40%;
				right: 10rpx;
				font-size: 28rpx;
				color: #666;
				text-align: center;
				width: 180rpx;
				z-index: 1000;
			}
		}
		.login-midbtn{
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			background-color: $uni-color-primary;
			color: #FFFFFF;
			text-align: center;
			font-size: 34rpx;
			font-weight: bold;
			border-radius: 50rpx;
			margin-top: 20%;
		}
	}
	.login-down{
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		margin: auto;
		padding: 0 !important;
		border: none;
		display: flex;
		justify-content: center;
		text-align: center;
		border: 1rpx solid #FFFFFF !important;
		overflow: hidden;
		margin-top: 50rpx;
		background-color: #FFFFFF;
		image{
			width: 100%;
			height: 100%;
			display: inline;
		}
	}
	.login-bottom{
		width: 100%;
		margin-top: 10%;
		text-align: center;
		display: flex;
		justify-content: center;
		.login-botext{
			color: $uni-color-primary;
			margin-top: 5rpx;
			margin-left: 5rpx;
			text-align: center;
			font-size: 30rpx;
		}
	}
}
</style>
