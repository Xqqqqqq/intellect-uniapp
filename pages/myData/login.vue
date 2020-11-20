<template>
	<view class="login">
		<view class="login-text">超能训练</view>
		<view class="login-btn">手机验证码登录</view>
		<view class="login-btn">微信账号登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	background-color: $uni-color-primary;
}
.login{
	width: 100%;
	padding-top: 30%;
	box-sizing: border-box;
	.login-text{
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 54rpx;
		margin-bottom: 30%;
	}
	.login-btn{
		border-radius: 60rpx;
		text-align: center;
		background-color: #FFFFFF;
		width: 55%;
		margin: auto;
		margin-top: 13%;
		font-size: 34rpx;
		color: $uni-color-primary;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
	}
}
</style>
