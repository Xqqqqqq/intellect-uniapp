<template>
	<view class="login">
		<view class="login-up">
			<image src='../../static/img/icons/logo.png'></image>
			<view class="login-uptext">武装大脑</view>
		</view>
		<view class="login-mid">
			<input placeholder="请输入手机号" type="number"/>
			<input placeholder="请输入验证码" type="number"/>
			<view class="login-midsms" @click="clickCodemsg">{{codeMsg}}</view>
			<view class="login-midbtn" @click="gotoUrl('/pages/myData/myData')">登录</view>
		</view>
		<button class="login-down" open-type="getUserInfo" lang="zh_CN" @getuserinfo="loginForProvider" v-if="checked == true">
			<image src='../../static/img/icons/weixin.jpg'></image>
		</button>
		<button class="login-down" v-else @click="openProvider">
			<image src='../../static/img/icons/weixin.jpg'></image>
		</button>
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
				count: 10,
				disable: false,
				checked: false,
			};
		},
		methods:{
			clickCodemsg(){
				if(this.disable == false){
					let timer =  setInterval(() => {
						this.count -= 1
						this.codeMsg = this.count + 's'
						this.disable = true
						if(this.count < 0){
							clearInterval(timer)
							this.codeMsg = '发送验证码'
							this.count = 10
							this.disable = false
						}
					}, 1000)
				}
			},
			gotoUrl(url){
				uni.navigateTo({
					url:url
				})
			},
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
									console.log(loginRes)
				        			vm.authorization = loginRes.code // 获取code
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
			changeCheckbox(e){
				this.checked = !this.checked
			},
			openProvider(){
				uni.showToast({
					title: '请先同意服务协议！',
					icon: 'none'
				});
			}
		}
	}
</script>

<style lang="scss">
page{
		background-color: #FFFFFF;
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
		position: relative;
		input{
			width: 100%;
			height: 100%;
			padding-bottom: 20rpx;
			margin-top: 10%;
			box-sizing: border-box;
			font-size: 32rpx;
			border-bottom: 1px solid #E6E6E6;
		}
		.login-midsms{
			position: absolute;
			top: 32%;
			transform: translateY(-50%);
			right: 10rpx;
			font-size: 28rpx;
			color: #666;
			text-align: center;
			width: 180rpx;
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
