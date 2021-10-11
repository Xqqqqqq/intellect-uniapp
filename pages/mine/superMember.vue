<template>
	<view class="super-member">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li">
					<view class="top-box-li-title" v-if="memberInfo.vipDay == 0">当前：普通会员（无限期）</view>
					<view class="top-box-li-title" style="color: #f0ad4e;" v-else>当前：VIP兰盾会员（{{memberInfo.vipDay}}天）</view>
				</view>
			</view>
			<view class="wrap-top-tip">碎片化时间加强思维能力</view>
			<view class="wrap-top-btn" @click="gotoHistory">历史充值</view>
		</view>
		<view class="member-price">
			<view class="member-price-title">请选择开通时长<text>（注：时间累加-可重复购买）</text></view>
			<scroll-view scroll-x="true" class="member-price-scroll">
				<view class="member-price-scroll-li"  @tap="clickPriceTab(index,item)"
				 :class="{'memory-scroll-li-active':currentPriceTab == index}"
				v-for="(item, index) in memberInfo.vipValueList" :key="index">
					<view class="price-scroll-li-name">{{item.vipName}}</view>
					<view class="price-scroll-li-price"><text>￥</text>{{item.truePrice}}</view>
					<view class="price-scroll-li-origin">折扣：{{item.vipDiscount || '无'}}</view>
					<view class="price-scroll-li-date">有效期:{{item.vipDays}}天</view>
					<image src="../../static/img/icons/VIP@2x.png"></image>
				</view>
			</scroll-view>
		</view>
		<picker @change="bindMoneyChange" :value="moneyIndex" :range="memberInfo.cardList" range-key="cardName">
			<view class="member-picker">
				<view class="member-picker-left">优惠折扣</view>
				<view class="member-picker-right" v-if="discountPrice">-{{discountPrice}}元 ></view>
				<view class="member-picker-right" v-else>请选择 ></view>
			</view>
		</picker>
		<radio-group @change="radioChange">
			<label class="member-picker" v-for="(item, index) in radioList" :key="item.value">
				<view class="member-radio">
					<image src='../../static/img/icons/weixin.jpg' class="member-picker-img"></image>
					{{item.name}}
				</view>
				<radio :value="item.value" :checked="index === current" style="transform: scale(0.6);"/>
			</label>
		</radio-group>
		<view class="member-price-detail">
			<view class="price-detail-title">会员权益</view>
			<view class="price-detail-li" v-for="(item, index) in memberInfo.declareList" :key="index">
				<view class="detail-li-left">{{index+1}}</view>
				<view class="detail-li-right">{{item.declareName}}</view>
			</view>
		</view>
		<view class="member-price-btn" @click="openPay">
			<text class="price-btn-sign">￥</text>{{scrollInfo.nowPrice}}
			<text class="price-btn-through" v-if="scrollInfo.vipPrice">（原价：￥{{scrollInfo.vipPrice}}）</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: '',
				memberInfo:{},
				scrollInfo:{}, //所选钱数
				currentPriceTab: 0,
				moneyIndex: 0, //优惠钱数下标
				discountPrice: 0, // 优惠金额
				radioList: [{
					value: '1',
					name: '微信'
				}],
				current: 0
			};
		},
		onLoad(options){
			console.log(options)
			if(options && options.price){
				this.discountPrice = options.price
			}
		},
		onShow(){
			this.getVipPage()
		},
		methods:{
			// 获取当前页面的信息
			getVipPage(){
				this.openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : ''
				this.$Request.get(`/appVipController.do?getVipPage&openid=${this.openid}`)
				.then(res => {
					if(res.code == 0){
						this.memberInfo = res.data
						this.scrollInfo = res.data.vipValueList[0]
						this.scrollInfo.nowPrice = Number(res.data.vipValueList[0].truePrice - this.discountPrice).toFixed(2)
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			// 切换价格
			clickPriceTab(index, item) {
				if (this.currentPriceTab == index) {
					return false
				} else {
					// this.discountPrice = 0
					this.currentPriceTab = index
					this.scrollInfo = item
					this.scrollInfo.nowPrice = Number(item.truePrice - this.discountPrice).toFixed(2) > 0 ? Number(item.truePrice - this.discountPrice).toFixed(2) : 0
				}
			},
			// 选择优惠券
			bindMoneyChange(e){
				// console.log(e.detail)
				this.moneyIndex = e.detail.value
				this.discountPrice = this.memberInfo.cardList[this.moneyIndex].cardValue
				this.scrollInfo.nowPrice = Number(this.scrollInfo.truePrice - this.discountPrice).toFixed(2) > 0 ? Number(this.scrollInfo.truePrice - this.discountPrice).toFixed(2) : 0
			},
			// 选择支付方式
			radioChange(e){
				console.log(e.detail)
			},
			// 支付
			openPay(){
				let vm = this
				uni.getProvider({
					service: 'payment',
					success: res=> {
						if(~res.provider.indexOf('wxpay')){
							uni.showLoading({title: '正在调起微信支付'})
							//#ifdef APP-PLUS
							vm.$Request.get('/wxPayController.do?wxVipPay',{
								openid: uni.getStorageSync('openid'),
								totalMoney: vm.scrollInfo.nowPrice,
								vipValueId: vm.scrollInfo.id,
								cardId: vm.discountPrice == 0 ? '' : vm.memberInfo.cardList[vm.moneyIndex].id
							}).then(res => {
								if(res.code == 0){
									let value = res.data
									console.log('1',value)
									// 微信 App 支付
									let payInfo={
										appid: value.appid,
										noncestr: value.noncestr,
										package:"Sign=WXPay",
										partnerid: value.partnerid,
										prepayid: value.prepayid,
										timestamp: value.timestamp,
										sign: value.sign,
									}
									// 微信支付
									uni.requestPayment({
									    provider: 'wxpay',
									    orderInfo: payInfo,
									    success: function (res) {
											uni.hideLoading();
											uni.showToast({title: '支付成功',icon:'none'})
											setTimeout(()=>{
												uni.switchTab({
													url:'/pages/mine/mine'
												})
											},1000)
									    },
									    fail: function (err) {
											uni.hideLoading();
											uni.showToast({title: '支付失败，请稍后再试',icon:'none'})
									    }
									});
								}else{
									uni.showToast({
										title: res.info,
										icon: 'none'
									})
								}
							})
							//#endif
							
							//#ifdef MP-WEIXIN
							if(uni.getStorageSync('openid')){
								this.$Request.get('/wxPayController.do?wxVipPay',{
									openid: uni.getStorageSync('openid'),
									totalMoney: this.scrollInfo.nowPrice,
									vipValueId: this.scrollInfo.id,
									cardId: this.discountPrice == 0 ? '' : this.memberInfo.cardList[this.moneyIndex].id
								}).then(res => {
									if(res.code == 0){
										let value = res.data
										console.log('23',value)
										// 微信支付
										uni.requestPayment({
										    provider: 'wxpay',
										    timeStamp: value.timestamp,
										    nonceStr: value.noncestr,
										    package: value.package,
										    signType: 'MD5',
										    paySign: value.sign,
										    success: function (res) {
										        uni.hideLoading();
										        uni.showToast({title: '支付成功',icon:'none'})
												setTimeout(()=>{
													uni.switchTab({
														url:'/pages/mine/mine'
													})
												},1000)
										    },
										    fail: function (err) {
										        uni.hideLoading();
										        uni.showToast({title: '支付失败，请稍后再试',icon:'none'})
										    }
										});
									}else{
										uni.showToast({
											title: res.info,
											icon: 'none'
										})
									}
								})
							}else{
								uni.showToast({
									title: '未获取到openid',
									icon: 'none'
								})
							}
							//#endif
						}else {
							uni.showToast({title: '获取微信通道失败，请检查您的微信是否正常启用',icon:'none'})
						}
					}
				})
			},
			gotoHistory(){
				uni.navigateTo({
					url:'/pages/mine/historyRecharge'
				})
			}
		}
	}
</script>

<style lang="scss">
.super-member{
	width: 100%;
	.wrap-top{
		width: 100%;
		background-color: $uni-color-primary;
		padding: 30rpx 0;
		box-sizing: border-box;
		margin-top: -10rpx;
		.wrap-top-box{
			padding: 20rpx 0;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-bottom: 10rpx;
			.top-box-li{
				text-align: center;
				color: #FFFFFF;
				.top-box-li-title{
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
			}
		}
		.wrap-top-tip{
			text-align: center;
			color: #FFFFFF;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			font-weight: bold;
		}
		.wrap-top-btn{
			text-align: center;
			color: #FFFFFF;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			text-decoration: underline;
		}
	}
	.member-price{
		background-color: #FFFFFF;
		width: 100%;
		border-radius: 15rpx;
		padding: 34rpx 24rpx;
		box-sizing: border-box;
		.member-price-title{
			font-size: 28rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 30rpx;
			text{
				color: #999;
				font-size: 24rpx;
			}
		}
		.member-price-scroll{
			width: 100%;
			white-space: nowrap;
			.member-price-scroll-li{
				display: inline-block;
				width: 32%;
				text-align: center;
				padding: 40rpx 0;
				box-sizing: border-box;
				border: 1px solid rgba(147, 147, 147, 0.4);
				color: #666666;
				margin-right: 2%;
				border-radius: 15rpx;
				position: relative;
				.price-scroll-li-name{
					font-size: 30rpx;
					margin-bottom: 30rpx;
					font-weight: bold;
				}
				.price-scroll-li-price{
					font-size: 70rpx;
					margin-bottom: 15rpx;
					font-weight: bold;
					text{
						font-size: 26rpx;
					}
				}
				.price-scroll-li-origin{
					font-size: 26rpx;
					margin-bottom: 20rpx;
				}
				.price-scroll-li-date{
					font-size: 26rpx;
				}
				image{
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					right: 15rpx;
					top: 10rpx;
					display: block;
				}
			}
			.memory-scroll-li-active{
				box-shadow:1px 2px 6px 0px rgba(108,143,197,0.6);
				border: 1px solid rgba(108,143,197,0.4);
				color: $uni-color-primary;
			}
		}
	}
	.member-price-detail{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 50rpx 50rpx 0 0;
		padding: 60rpx 70rpx;
		padding-bottom: 130rpx;
		box-sizing: border-box;
		margin-top: 70rpx;
		position: relative;
		.price-detail-title{
			border-radius: 100rpx;
			text-align: center;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: -10%;
			height: 80rpx;
			line-height: 80rpx;
			width: 280rpx;
			font-weight: bold;
			font-size: 30rpx;
			background-image: linear-gradient(45deg, #ff9700, #ed1c24);
			color: #ffffff;
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
	.member-price-btn{
		width: 95%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background-color: $uni-color-primary;
		font-size: 46rpx;
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 50rpx;
		position: fixed;
		left: 50%;
		bottom: 24rpx;
		transform: translateX(-50%);
		z-index: 99;
		.price-btn-sign{
			font-size: 28rpx;
		}
		.price-btn-through{
			font-size: 28rpx;
			text-decoration: line-through;
		}
	}
	.member-picker{
		width: 100%;
		background-color: #FFFFFF;
		line-height: 100rpx;
		padding: 0 24rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
		.member-picker-left{
			color: $uni-color-warning;
		}
		.member-picker-right{
			color: $uni-color-error;
			font-size: 34rpx;
			font-weight: bold;
		}
		.member-radio{
			vertical-align: middle;
		}
		.member-picker-img{
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
			margin-right: 20rpx;
		}
	}
}
</style>
