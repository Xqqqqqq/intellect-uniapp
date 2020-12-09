<template>
	<view class="energy">
		<view class="energy-top">
			<view class="energy-top-num">3<text>点</text></view>
			<view class="energy-top-title">我的能量</view>
		</view>
		<view class="energy-content">
			<view class="energy-content-title">消耗记录</view>
			<view class="energy-content-li">
				<view>20200909-13:00</view>
				<view>答题：100</view>
				<view>分数：100</view>
			</view>
			<view class="energy-content-li">
				<view>20200909-13:00</view>
				<view>答题：100</view>
				<view>分数：100</view>
			</view>
			<view class="energy-content-li">
				<view>20200909-13:00</view>
				<view>答题：100</view>
				<view>分数：100</view>
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
.energy{
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.energy-top{
		background: url(../../static/img/icons/bj.jpg) no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 250rpx;
		border-radius: 15rpx;
		color: #FFFFFF;
		padding: 5% 15%;
		.energy-top-num{
			font-size: 70rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			text{
				font-size: 30rpx;
			}
		}
		.energy-top-title{
			font-size: 30rpx;
		}
	}
	.energy-content{
		margin-top: 20rpx;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		padding: 24rpx;
		box-sizing: border-box;
		.energy-content-title{
			padding-left: 20rpx;
			box-sizing: border-box;
			border-left: 8rpx solid $uni-color-primary;
			font-size: 30rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.energy-content-li{
			display: flex;
			justify-content: space-between;
			line-height: 70rpx;
			font-size: 28rpx;
		}
		.energy-content-li:nth-child(even){
			background-color: rgba(75, 149, 230, 0.5);
		}
	}
}
</style>
