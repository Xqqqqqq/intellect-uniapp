<template>
	<view class="group">
		<view class="group-top">
			<view class="group-top-left">我的分组（4）</view>
			<view class="group-top-right">+</view>
		</view>
		<view class="group-content">
			<view class="group-content-li">
				<view class="content-li-left">无分组</view>
				<view class="content-li-right">无分组</view>
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
.group{
	width: 100%;
	.group-top{
		padding: 0 24rpx;
		box-sizing: border-box;
		width: 100%;
		background-color: #FFFFFF;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		.group-top-left{
			font-size: 32rpx;
			font-weight: bold;
			color: $uni-color-primary;
		}
		.group-top-right{
			font-weight: bold;
			font-size: 65rpx;
			color: $uni-color-primary;
		}
	}
	.group-content{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		.group-content-li{
			padding: 24rpx;
			box-sizing: border-box;
			border-radius: 15rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			.content-li-left{
				font-size: 26rpx;
				font-weight: bold;
			}
			.content-li-right{
				
			}
		}
	}
}
</style>
