<template>
	<view class="code">
		<view class="code-logo">
			<image src='../../static/img/icons/star.png'></image>
		</view>
		<view class="code-ul">
			<view class="code-ul-li">
				<input placeholder="请输入手机号" type="number"/>
			</view>
			<view class="code-ul-li">
				<input placeholder="请输入验证码" type="number"/>
				<view class="code-ul-sms" @click="clickCodemsg">{{codeMsg}}</view>
			</view>
			<view class="code-ul-btn" @click="gotoUrl">登录</view>
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
			gotoUrl(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.code{
	width: 100%;
	.code-logo{
		width: 144rpx;
		height: 144rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: auto;
		margin-top: 20%;
		box-shadow:1px 2px 6px 0px rgba(108,143,197,0.6);
		image{
			width: 100%;
			height: 100%;
		}
	}
	.code-ul{
		width: 85%;
		margin: auto;
		margin-top: 20%;
		.code-ul-li{
			width: 100%;
			margin-bottom: 30rpx;
			position: relative;
			height: 100rpx;
			input{
				width: 100%;
				height: 100%;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				font-size: 32rpx;
				border-bottom: 1px solid #E6E6E6;
			}
			.code-ul-sms{
				position: absolute;
				top: 43%;
				transform: translateY(-50%);
				right: 10rpx;
				font-size: 28rpx;
				color: #666;
				text-align: center;
				width: 180rpx;
			}
		}
		.code-ul-btn{
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
}
</style>
