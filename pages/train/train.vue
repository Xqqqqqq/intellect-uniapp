<template>
	<view class="train">
		<view class="train-title">
			<view class="train-title-box">记忆力</view>
		</view>
		<view class="train-box">
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">图像记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">视觉记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">方法记忆术</view>
			</view>
		</view>
		<view class="train-title">
			<view class="train-title-box">观察力</view>
		</view>
		<view class="train-box">
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">图像记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">视觉记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">方法记忆术</view>
			</view>
		</view>
		<view class="train-title">
			<view class="train-title-box">注意力</view>
		</view>
		<view class="train-box">
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">图像记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">视觉记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">方法记忆术</view>
			</view>
		</view>
		<view class="train-title">
			<view class="train-title-box">思维力</view>
		</view>
		<view class="train-box">
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">图像记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">视觉记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">方法记忆术</view>
			</view>
		</view>
		<view class="train-title">
			<view class="train-title-box">想象力</view>
		</view>
		<view class="train-box">
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">图像记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">视觉记忆术</view>
			</view>
			<view class="train-box-li">
				<view class="box-li-img">
					<image src="../../static/img/tabs/data-blue.png"></image>
				</view>
				<view class="box-li-text">方法记忆术</view>
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
.train{
	width: 100%;
	.train-title{
		width: 100%;
		background-color: #FFFFFF;
		border-bottom: 1px solid rgba(86, 86, 86, .1);
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		font-size: 34rpx;
		font-weight: bold;
		color: $uni-text-color;
		.train-title-box{
			padding-left: 15rpx;
			box-sizing: border-box;
			border-left: 6rpx solid $uni-color-primary;
		}
	}
	.train-box{
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		padding: 50rpx 0;
		box-sizing: border-box;
		box-shadow:0px 2px 8px 0px rgba(147, 147, 147, 0.3);
		margin-bottom: 20rpx;
		.train-box-li{
			text-align: center;
			.box-li-img{
				width: 100rpx;
				height: 100rpx;
				margin: auto;
				margin-bottom: 20rpx;
				overflow: hidden;
				border-radius: 10rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.box-li-text{
				font-size: 26rpx;
				color: $uni-text-color;
			}
		}
	}
}
</style>
