<template>
	<view class="super-member">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li">
					<view class="top-box-li-title">当前：普通会员（无限期）</view>
				</view>
			</view>
			<view class="wrap-top-tip">碎片化时间加强思维能力</view>
			<view class="wrap-top-btn" @click="gotoHistory">历史充值</view>
		</view>
		<view class="member-price">
			<view class="member-price-title">请选择开通时长</view>
			<scroll-view scroll-x="true" class="member-price-scroll">
				<view class="member-price-scroll-li"  @tap="clickPriceTab(index,item)"
				 :class="{'memory-scroll-li-active':currentPriceTab == index}"
				v-for="(item, index) in scrollPriceList" :key="index">
					<view class="price-scroll-li-name">{{item.name}}</view>
					<view class="price-scroll-li-price"><text>￥</text>{{item.price}}</view>
					<view class="price-scroll-li-origin" v-if="item.originPrice">原价：￥{{item.originPrice}}</view>
					<view class="price-scroll-li-origin" v-else>原价：￥{{item.price}}</view>
					<view class="price-scroll-li-date">有效期:{{item.date}}天</view>
					<image src="../../static/img/icons/VIP@2x.png"></image>
				</view>
			</scroll-view>
		</view>
		<picker>
			<view class="member-picker">
				<view class="member-picker-left">优惠折扣</view>
				<view class="member-picker-right">-5元 ></view>
			</view>
		</picker>
		<view class="member-price-detail">
			<view class="price-detail-title bg-gradual-orange shadow-blur">会员权益</view>
			<view class="price-detail-li" v-for="(item, index) in detailList" :key="index">
				<view class="detail-li-left">{{index+1}}</view>
				<view class="detail-li-right">{{item}}</view>
			</view>
		</view>
		<view class="member-price-btn">
			<text class="price-btn-sign">￥</text>{{scrollInfo.price}}
			<text class="price-btn-through" v-if="scrollInfo.sign">（折扣：{{scrollInfo.sign}}）</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollPriceList:[{
					id:0,
					name: '试用版',
					price: 19.9,
					originPrice: null,
					sign: null,
					date: '30'
				},{
					id:1,
					name: '思维训练',
					price: 199,
					originPrice: 200,
					sign: '8折',
					date: '180'
				},{
					id:2,
					name: '武装大脑',
					price: 1999,
					originPrice: 2000,
					sign: '6折',
					date: '365'
				}],
				currentPriceTab: 0,
				detailList:[
					'普通训练全开通',
					'会员转享训练全开通',
					'自动签到攒能量',
					'赛事排名参与权限',
				],
				scrollInfo:{}
			};
		},
		mounted(){
			this.scrollInfo = this.scrollPriceList[0]
		},
		methods:{
			// 导航切换
			clickPriceTab(index, item) {
				if (this.currentPriceTab == index) {
					return false
				} else {
					this.currentPriceTab = index
					this.scrollInfo = item
				}
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
					font-size: 75rpx;
					margin-bottom: 15rpx;
					font-weight: bold;
					text{
						font-size: 26rpx;
					}
				}
				.price-scroll-li-origin{
					font-size: 26rpx;
					margin-bottom: 20rpx;
					text-decoration: line-through;
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
		.member-picker-left{
			color: $uni-color-warning;
		}
		.member-picker-right{
			color: $uni-color-error;
			font-size: 34rpx;
			font-weight: bold;
		}
	}
}
</style>
