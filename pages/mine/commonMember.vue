<template>
	<view class="common">
		<view class="common-banner">
			<image src="../../static/img/icons/common.jpg"></image>
		</view>
		<view class="member-price-detail">
			<view class="price-detail-title bg-gradual-orange shadow-blur">会员权益</view>
			<view class="price-detail-li" v-for="(item, index) in detailList" :key="index">
				<view class="detail-li-left">{{index+1}}</view>
				<view class="detail-li-right">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailList:[
					'图像记忆术全开通',
					'视觉记忆术部分开通',
					'方法记忆术部分开通',
					'攒能量，延长会员时间',
					'更多特权敬请期待',
				]
			};
		}
	}
</script>

<style lang="scss">
.common{
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.common-banner{
		width: 100%;
		height: 300rpx;
		border-radius: 15rpx;
		overflow: hidden;
		background-color: #FFFFFF;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.member-price-detail{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 50rpx 50rpx 0 0;
		padding: 60rpx 70rpx;padding-bottom: 10rpx;
		box-sizing: border-box;
		margin-top: 70rpx;
		position: relative;
		.price-detail-title{
			border-radius: 100rpx;
			text-align: center;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: -6%;
			height: 80rpx;
			line-height: 80rpx;
			width: 280rpx;
			font-weight: bold;
			font-size: 30rpx;
		}
		.price-detail-li{
			display: flex;
			margin-bottom: 20rpx;
			.detail-li-left{
				background: url(../../static/img/icons/star.png) no-repeat;
				background-size: 100% 100%;
				width: 60rpx;
				height: 60rpx;
				line-height: 65rpx;
				color: #FFFFFF;
				font-weight: bold;
				text-align: center;
				font-size: 30rpx;
				margin-right: 5%;
			}
			.detail-li-right{
				font-size: 30rpx;
				line-height: 65rpx;
			}
		}
	}
}
</style>
