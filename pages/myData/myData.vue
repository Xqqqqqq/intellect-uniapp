<template>
	<view class="wrap">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li">
					<view class="top-box-li-title">本月签到</view>
					<view class="top-box-li-num">0</view>
				</view>
				<view class="top-box-li">
					<view class="top-box-li-title">本月训练</view>
					<view class="top-box-li-num">0</view>
				</view>
				<view class="top-box-li">
					<view class="top-box-li-title">最长连续</view>
					<view class="top-box-li-num">0</view>
				</view>
			</view>
			<view class="wrap-top-tip animated">大脑越用越灵活！</view>
		</view>
		
		<view class="wrap-content">
			<view class="wrap-content-box">
				<view class="content-box-left">
					<image src=""></image>
				</view>
				<view class="content-box-right">
					<view class="box-right-title">图像记忆术</view>
					<view class="box-right-tip">数字图像关联训练</view>
					<view class="box-right-tip">上次训练：2020-09-10</view>
				</view>
				<view class="content-box-num">89次</view>
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
page{
	width: 100%;
	background-color: $uni-color-bg;
}
.wrap{
	width: 100%;
	.wrap-top{
		width: 100%;
		background-color: $uni-color-primary;
		padding: 50rpx 0;
		box-sizing: border-box;
		.wrap-top-box{
			padding: 50rpx 0;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-bottom: 20rpx;
			.top-box-li{
				text-align: center;
				color: #FFFFFF;
				.top-box-li-title{
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				.top-box-li-num{
					font-size: 28rpx;
				}
			}
		}
		.wrap-top-tip{
			text-align: center;
			color: #FFFFFF;
			animation: flash 3s infinite;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.wrap-content{
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		.wrap-content-box{
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			position: relative;
			box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
			.content-box-left{
				width: 180rpx;
				height: 180rpx;
				border-radius: 30rpx;
				overflow: hidden;
				background-color: red;
				margin-right: 30rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.content-box-right{
				width: 66%;
				height: 180rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.box-right-title{
					color: #333333;
					font-weight: bold;
					font-size: 36rpx;
					width: 83%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.box-right-tip{
					color: #666;
					font-size: 28rpx;
				}
			}
			.content-box-num{
				position: absolute;
				top:40rpx;
				right: 30rpx;
				color: $uni-color-primary;
				font-size: 32rpx;
			}
		}
	}
}
</style>
