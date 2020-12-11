<template>
	<view class="method-train">
		<view class="img-test-title">方法总结</view>
		<view class="img-test-content">
			<text>概要：该训练通过简单编码记忆大量复杂的事物，记忆效率高。\n适合年龄段：6岁以上。</text>
		</view>
		<view class="img-test-title">记忆训练及测试</view>
		<view class="memory-ul">
			<view class="memory-ul-li">
				<image class="memory-ul-li-img" src='../../../static/img/icons/zhongjiang.png'></image>
				<view class="memory-ul-li-text">数字图像关联训练</view>
			</view>
			<view class="memory-ul-li">
				<image class="memory-ul-li-img" src='../../../static/img/icons/zhongjiang.png'></image>
				<view class="memory-ul-li-text">数字图像</view>
			</view>
			<view class="memory-ul-li">
				<image class="memory-ul-li-img" src='../../../static/img/icons/zhongjiang.png'></image>
				<view class="memory-ul-li-text">数字图像关联训练</view>
			</view>
			<view class="memory-ul-li">
				<image class="memory-ul-li-img" src='../../../static/img/icons/zhongjiang.png'></image>
				<view class="memory-ul-li-text">数字图像关联训练</view>
			</view>
		</view>
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
.method-train{
	width: 100%;
	padding: 50rpx 24rpx;
	box-sizing: border-box;
	.img-test-title{
		width: 100%;
		padding-left: 15rpx;
		border-left: 5rpx solid $uni-color-primary;
		color: $uni-color-primary;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}
	.img-test-content{
		width: 100%;
		background-color: rgba(75,149,230,.2);
		border-radius: 15rpx;
		padding: 25rpx;
		box-sizing: border-box;
		color: #333333;
		line-height: 45rpx;
		font-size: 26rpx;
		margin-bottom: 40rpx;
	}
	.memory-ul{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 40rpx;
		.memory-ul-li{
			text-align: center;
			width: 31%;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			box-shadow:0px 2px 10px 0px #b9c5e6;
			padding: 20rpx 10rpx;
			box-sizing: border-box;
			margin: 2% 1%;
			.memory-ul-li-img{
				width: 150rpx;
				height: 150rpx;
				margin: auto;
				margin-bottom: 5rpx;
			}
			.memory-ul-li-text{
				font-size: 24rpx;
				font-weight: bold;
				color: #666666;
			}
		}
	}
}
</style>
