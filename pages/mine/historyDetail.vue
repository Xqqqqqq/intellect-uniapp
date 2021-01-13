<template>
	<view class="detail">
		<view class="detail-box">
			<view class="detail-box-li">
				<view class="detail-box-li-left">名称</view>
				<view class="detail-box-li-right">会员试用版</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">期限</view>
				<view class="detail-box-li-right">30天</view>
			</view>
		</view>
		
		<view class="detail-box">
			<view class="detail-box-li">
				<view class="detail-box-li-left">原价</view>
				<view class="detail-box-li-right">90元</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">折扣</view>
				<view class="detail-box-li-right">8折</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">现价</view>
				<view class="detail-box-li-right">50元</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">优惠券</view>
				<view class="detail-box-li-right">-5元</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">实付</view>
				<view class="detail-box-li-right">44元</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">支付方式</view>
				<view class="detail-box-li-right">微信支付</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">支付时间</view>
				<view class="detail-box-li-right">2020-09-09 13：00</view>
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
.detail{
	width: 100%;
	.detail-box{
		width: 100%;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		.detail-box-li{
			width: 100%;
			display: flex;
			justify-content: space-between;
			line-height: 100rpx;
			padding: 0 24rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid rgba(211, 211, 211, 0.5);
			.detail-box-li-left{
				color: #333333;
				font-size: 28rpx;
				font-weight: bold;
			}
			.detail-box-li-right{
				color: #666666;
				font-size: 28rpx;
			}
		}
	}
}
</style>
