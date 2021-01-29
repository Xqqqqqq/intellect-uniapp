<template>
	<view class="energy">
		<view class="energy-top">
			<view class="energy-top-num">3<text>点</text></view>
			<view class="energy-top-title">我的能量</view>
		</view>
		<view class="energy-content">
			<view class="energy-content-title">消耗记录</view>
			<view class="history-li" v-for="(item, index) in historyList" :key="index" @click="gotoDetail(item)">
				<view class="history-li-top">
					<view class="li-top-left">{{item.title}}</view>
					<view class="li-top-right">能量+{{item.money}}</view>
				</view>
				<view class="history-li-bottom">使用时间：{{item.time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList:[{
					time:'2020-01-01 13:00',
					title:'数字元素测试',
					money: 19.90,
				},{
					time:'2020-01-01 13:00',
					title:'数字元素测试',
					money: 19.90,
				},{
					time:'2020-01-01 13:00',
					title:'数字元素测试',
					money: 19.90,
				},]
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
		padding-top: 40rpx;
		.energy-content-title{
			padding-left: 20rpx;
			box-sizing: border-box;
			border-left: 8rpx solid $uni-color-primary;
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			line-height: 1;
		}
		.history-li{
			width: 100%;
			background-color: #FFFFFF;
			border-bottom: 1px solid #D3D3D3;
			padding: 24rpx 0;
			box-sizing: border-box;
			.history-li-top{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				line-height: 1;
				.li-top-left{
					font-size: 32rpx;
					font-weight: bold;
				}
				.li-top-right{
					font-size: 30rpx;
					font-weight: bold;
					color: $uni-color-error;
				}
			}
			.history-li-bottom{
				color: #666666;
				font-size: 26rpx;
			}
		}
	}
}
</style>
