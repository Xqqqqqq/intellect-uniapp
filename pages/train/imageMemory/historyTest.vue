<template>
	<view class="history">
		<view class="history-top">
			<view class="history-top-title">数字元素测试</view>
			<view class="img-test-top">
				<view class="test-top-li">
					<view class="test-top-li-title">上次成绩</view>
					<view class="test-top-li-num">0</view>
				</view>
				<view class="test-top-li">
					<view class="test-top-li-title">参与次数</view>
					<view class="test-top-li-num">0</view>
				</view>
				<view class="test-top-li">
					<view class="test-top-li-title">最好成绩</view>
					<view class="test-top-li-num">0</view>
				</view>
			</view>
		</view>
		<view class="history-title">历史测试（3）</view>
		<view class="history-content">
			<view class="history-content-li">
				<view class="content-li-left">
					<view class="li-left-title">数字元素训练</view>
					<view class="li-left-detail">
						<text>测试时间：2020-01-01 13:00</text>
					</view>
					<view class="li-left-detail">
						<text>题目：30</text>
						<text>时间：无时限</text>
					</view>
					<view class="li-left-detail">
						<text>模式：混合模式</text>
					</view>
				</view>
				<view class="content-li-line"></view>
				<view class="content-li-right">
					<view class="li-right-top">准确率</view>
					<view class="li-right-bottom">100%</view>
				</view>
			</view>
			<view class="history-content-li">
				<view class="content-li-left">
					<view class="li-left-title">数字元素训练</view>
					<view class="li-left-detail">
						<text>测试时间：2020-01-01 13:00</text>
					</view>
					<view class="li-left-detail">
						<text>题目：30</text>
						<text>时间：无时限</text>
					</view>
					<view class="li-left-detail">
						<text>模式：混合模式</text>
					</view>
				</view>
				<view class="content-li-line"></view>
				<view class="content-li-right">
					<view class="li-right-top">准确率</view>
					<view class="li-right-bottom">100%</view>
				</view>
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
.history{
	width: 100%;
	.history-top{
		width: 100%;
		background-color: $uni-color-primary;
		text-align: center;
		padding-top: 50rpx;
		box-sizing: border-box;
		.history-top-title{
			font-size: 34rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.img-test-top{
			display: flex;
			justify-content: space-around;
			width: 100%;
			padding: 60rpx 0;
			box-sizing: border-box;
			.test-top-li{
				text-align: center;
				color: #FFFFFF;
				font-size: 34rpx;
				.test-top-li-title{
					font-weight: bold;
					font-size: 32rpx;
					margin-bottom: 30rpx;
				}
			}
		}
	}
	.history-title{
		background-color: #FFFFFF;
		line-height: 80rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: $uni-color-primary;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
	}
	.history-content{
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		.history-content-li{
			background-color: #FFFFFF;
			border-radius: 15rpx;
			box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
			padding: 24rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			width: 100%;
			.content-li-left{
				flex: 1;
				font-size: 28rpx;
				color: #666666;
				padding: 10rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
				.li-left-title{
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
					margin-bottom: 15rpx;
				}
				.li-left-detail{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 8rpx;
				}
			}
			.content-li-line{
				width: 1rpx;
				height: 150rpx;
				border-left: 1rpx dashed #999999;
				margin-top: 5%;
				margin-left: 10rpx;
			}
			.content-li-right{
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				color: $uni-color-error;
				font-weight: bold;
				font-size: 36rpx;
				padding: 45rpx 0;
				box-sizing: border-box;
				text-align: center;
				width: 25%;
				.li-right-top{
					font-weight: normal;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
