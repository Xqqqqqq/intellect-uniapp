<template>
	<view class="activity">
		<view class="activity-top">
			<view class="activity-top-title">输入活动码查询兑换</view>
			<view class="activity-top-input">
				<input placeholder="请输入活动码"/>
				<view class="top-input-btn">扫描二维码</view>
			</view>
			<view class="activity-top-btn">查询</view>
		</view>
		<view class="activity-content">
			<view class="activity-content-title">* 奖励信息查询 *</view>
			<view class="card-ul-li">
				<view class="card-ul-li-left">3<text>点能量</text></view>
				<view class="card-ul-li-content">
					<image src='../../static/img/icons/red.png'></image>
				</view>
				<view class="card-ul-li-right">
					<view class="ul-li-right-title">
						<image src="../../static/img/icons/leiji.png"></image>
						新人能量券
					</view>
					<view class="ul-li-right-status">到期时间：2020-10-10</view>
				</view>
				<view class="card-ul-li-btn">立即领取</view>
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
.activity{
	width: 100%;
	.activity-top{
		background-color: pink;
		padding: 80rpx;
		box-sizing: border-box;
		text-align: center;
		.activity-top-title{
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 30rpx;
		}
		.activity-top-input{
			width: 100%;
			display: flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			line-height: 80rpx;
			height: 80rpx;
			margin-bottom: 40rpx;
			border-radius: 15rpx;
			overflow: hidden;
			input{
				flex: 1;
				font-size: 26rpx;
				padding-left: 20rpx;
				height: 100%;
				line-height: 80rpx;
				text-align: left;
			}
			.top-input-btn{
				width: 200rpx;
				height: 100%;
				line-height: 80rpx;
				background-color: $uni-color-warning;
				color: #FFFFFF;
				text-align: center;
			}
		}
		.activity-top-btn{
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background-color: $uni-color-warning;
			color: #FFFFFF;
			font-size: 28rpx;
			border-radius: 15rpx;
			overflow: hidden;
		}
	}
	.activity-content{
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		.activity-content-title{
			font-size: 32rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
			text-align: center;
			width: 100%;
		}
		.activity-content-li{
			box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
			background-color: #FFFFFF;
		}
		.card-ul-li{
			width: 100%;
			box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
			margin-bottom: 20rpx;
			display: flex;
			border: 2rpx solid $uni-color-error;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			height: 180rpx;
			position: relative;
			.card-ul-li-left{
				width: 180rpx;
				height: 100%;
				background-color: $uni-color-error;
				text-align: center;
				line-height: 180rpx;
				color: #FFFFFF;
				font-size: 70rpx;
				text{
					font-size: 26rpx;
					font-weight: normal;
				}
			}
			.card-ul-li-content{
				width: 5rpx;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.card-ul-li-right{
				flex: 1;
				padding: 15rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				.ul-li-right-title{
					color: #333333;
					font-size: 32rpx;
					font-weight: bold;
					display: flex;
					image{
						width: 45rpx;
						height: 45rpx;
						margin-right: 10rpx;
					}
				}
				.ul-li-right-status{
					font-size: 26rpx;
					color: #666;
				}
			}
			.card-ul-li-btn{
				width: 140rpx;
				height: 60rpx;
				background: $uni-color-error;
				border-radius: 10rpx;
				line-height: 60rpx;
				color: #FFFFFF;
				text-align: center;
				position: absolute;
				right: 24rpx;
				top: 50%;
				transform: translateY(-50%);
				font-size: 26rpx;
			}
			.card-ul-li-btn-other{
				background: $uni-text-color-disable;
			}
		}
	}
}
</style>
