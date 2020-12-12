<template>
	<view class="longer">
		<view class="longer-top">
			<view class="longer-top-total">
				<view class="top-total-one">累计参与训练180次</view>
				<view class="top-total-two">月均10次</view>
			</view>
			<view class="longer-top-li">
				<view class="top-li-line">
					<view>历史最长连续</view>
					<view>坚持力<text>35</text>天</view>
				</view>
				<view class="top-li-line">
					<view>起始：456454</view>
					<view>结束：454456</view>
				</view>
			</view>
			<view class="longer-top-li">
				<view class="top-li-line">
					<view>本月最长连续</view>
					<view>坚持力<text>35</text>天</view>
				</view>
				<view class="top-li-line">
					<view>起始：456454</view>
					<view>结束：454456</view>
				</view>
			</view>
		</view>
		
		<view class="longer-content">
			<view class="longer-content-box">
				<view class="content-box-top">
					<image src="../../static/img/icons/leiji.png"></image>
					<view>连续使用最多训练</view>
				</view>
				<view class="content-box-detail">
					<view class="box-detail-top">
						<view class="detail-top-img">
							<image src='../../static/img/icons/bj.jpg'></image>
						</view>
						<view class="detail-top-right">
							<view class="top-right-title">图像记忆术</view>
							<view class="top-right-info">数字图像关联训练</view>
							<view class="top-right-bottom">
								<text>上次训练：2020-10-10</text>
								<text class="right-bottom-red">89次</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="longer-content-box">
				<view class="content-box-top">
					<image src="../../static/img/icons/leiji.png"></image>
					<view>累计使用最多训练</view>
				</view>
				<view class="content-box-detail">
					<view class="box-detail-top">
						<view class="detail-top-img">
							<image src='../../static/img/icons/bj.jpg'></image>
						</view>
						<view class="detail-top-right">
							<view class="top-right-title">图像记忆术</view>
							<view class="top-right-info">数字图像关联训练</view>
							<view class="top-right-bottom">
								<text>上次训练：2020-10-10</text>
								<text class="right-bottom-red">89次</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.longer{
	width: 100%;
	.longer-top{
		width: 100%;
		background-color: #FFFFFF;
		padding: 24rpx;
		box-sizing: border-box;
		.longer-top-total{
			width: 100%;
			display: flex;
			justify-content: space-around;
			text-align: center;
			flex-direction: column;
			color: #333333;
			font-size: 40rpx;
			font-weight: bold;
			height: 200rpx;
			padding: 30rpx;
			box-sizing: border-box;
			.top-total-two{
				font-size: 34rpx;
			}
		}
		.longer-top-li{
			border-top: 1px solid #F0F0F0;
			width: 100%;
			padding: 15rpx 0;
			box-sizing: border-box;
			.top-li-line{
				width: 100%;
				display: flex;
				justify-content: space-between;
				line-height: 60rpx;
				font-size: 28rpx;
				color: #666666;
				text{
					font-size: 40rpx;
					color: $uni-color-error;
				}
			}
		}
	}
	.longer-content{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		.longer-content-box{
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			padding: 24rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			.content-box-top{
				display: flex;
				font-size: 32rpx;
				font-weight: bold;
				color: #666666;
				border-bottom: 1px solid #F0F0F0;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				image{
					width: 45rpx;
					height: 45rpx;
					margin-right: 15rpx;
				}
			}
			.content-box-detail{
				margin-top: 35rpx;
				.box-detail-top{
					display: flex;
					.detail-top-img{
						width: 150rpx;
						height: 150rpx;
						border-radius: 15rpx;
						overflow: hidden;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.detail-top-right{
						flex: 1;
						justify-content: space-between;
						display: flex;
						flex-direction: column;
						margin-left: 30rpx;
						font-size: 26rpx;
						.top-right-title{
							font-size: 30rpx;
							color: #333333;
							font-weight: bold;
						}
						.top-right-bottom{
							display: flex;
							width: 100%;
							justify-content: space-between;
							.right-bottom-red{
								color: $uni-color-error;
							}
						}
					}
				}
			}
		}
	}
}
</style>
