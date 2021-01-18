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
		<view class="login-down">
			<image src='../../static/img/icons/微信授权.jpg'></image>
		</view>
		<view class="login-bottom">
			<checkbox value="1" style="transform: scale(0.7)"></checkbox>
			<view class="login-botext" @click="gotoUrl('/pages/loginAll/useragreement')">武装大脑服务用户协议</view>	
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeMsg: '发送验证码',
				count: 10,
				disable: false
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
		width: 100%;
		text-align: center;
		margin: auto;
		image{
			margin-top: 100rpx;
			width: 100rpx;
			height: 100rpx;
		}
	}
	.login-bottom{
		width: 100%;
		margin-top: 90rpx;
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
