<template>
	<view class="detail">
		<view class="detail-box">
			<view class="detail-box-li">
				<view class="detail-box-li-left">名称</view>
				<view class="detail-box-li-right">{{historyInfo.valueName}}</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">期限</view>
				<view class="detail-box-li-right">{{historyInfo.valueDay}}天</view>
			</view>
		</view>
		
		<view class="detail-box">
			<view class="detail-box-li">
				<view class="detail-box-li-left">原价</view>
				<view class="detail-box-li-right">{{historyInfo.bill.billPrice}}元</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">折扣</view>
				<view class="detail-box-li-right">{{historyInfo.bill.billDiscount}}</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">现价</view>
				<view class="detail-box-li-right">{{historyInfo.bill.truePrice + historyInfo.bill.billReduced}}元</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">优惠券</view>
				<view class="detail-box-li-right">{{historyInfo.bill.billReduced}}元</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">实付</view>
				<view class="detail-box-li-right">{{historyInfo.bill.truePrice}}元</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">支付方式</view>
				<view class="detail-box-li-right" v-if="historyInfo.bill.payType == 1">微信支付</view>
				<view class="detail-box-li-right" v-else>支付宝支付</view>
			</view>
			<view class="detail-box-li">
				<view class="detail-box-li-left">支付时间</view>
				<view class="detail-box-li-right">{{historyInfo.bill.createDate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				billId:'2c9a29b67992dc52017992df8b8c0000',
				historyInfo:{}
			};
		},
		onLoad(option){
			console.log(option)
			if(option.billId) {
				this.billId = option.billId
			}
			this.getBuyVipDetail()
		},
		methods:{
			// 获取当前页面的信息
			getBuyVipDetail(){
				this.$Request.get(`/appVipController.do?getBuyVipDetail&billId=${this.billId}`)
				.then(res => {
					if(res.code == 0){
						this.historyInfo = res.data
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
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
