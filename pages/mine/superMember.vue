<template>
	<view class="super-member">
		<view class="member-price">
			<view class="member-price-title">请选择开通时长</view>
			<scroll-view scroll-x="true" class="member-price-scroll">
				<view class="member-price-scroll-li"  @tap="clickPriceTab(index)"
				 :class="{'memory-scroll-li-active':currentPriceTab == index}"
				v-for="(item, index) in scrollPriceList" :key="index">
					<view class="price-scroll-li-name">{{item.name}}</view>
					<view class="price-scroll-li-price"><text>￥</text>{{item.price}}</view>
					<view class="price-scroll-li-date">有效期:{{item.date}}天</view>
				</view>
			</scroll-view>
		</view>
		<view class="member-price-detail">
			<view class="price-detail-title bg-gradual-orange shadow-blur">会员权益</view>
			<view class="price-detail-li" v-for="(item, index) in detailList" :key="index">
				<view class="detail-li-left">{{index+1}}</view>
				<view class="detail-li-right">{{item}}</view>
			</view>
		</view>
		<view class="member-price-btn">立即购买</view>
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
					date: '30'
				},{
					id:1,
					name: '思维训练',
					price: 199,
					date: '180'
				},{
					id:2,
					name: '大脑修行',
					price: 1999,
					date: '365'
				},],
				currentPriceTab: 0,
				detailList:[
					'图像记忆术全开通',
					'视觉记忆术全开通',
					'方法记忆术全开通',
					'自动签到攒能量，延长会员时间',
					'赛事排名参与权限',
					'新功能试用',
				]
			};
		},
		methods:{
			// 导航切换
			clickPriceTab(index) {
				if (this.currentPriceTab == index) {
					return false
				} else {
					this.currentPriceTab = index
				}
			},
		}
	}
</script>

<style lang="scss">
.super-member{
	width: 100%;
	padding: 24rpx;
	padding-bottom: 124rpx;
	box-sizing: border-box;
	.member-price{
		background-color: #FFFFFF;
		width: 100%;
		border-radius: 15rpx;
		padding: 34rpx 14rpx;
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
				&:nth-child(3n){
					margin-right: 0;
				}
				.price-scroll-li-name{
					font-size: 30rpx;
					margin-bottom: 30rpx;
					font-weight: bold;
				}
				.price-scroll-li-price{
					font-size: 75rpx;
					margin-bottom: 30rpx;
					font-weight: bold;
					text{
						font-size: 26rpx;
					}
				}
				.price-scroll-li-date{
					font-size: 26rpx;
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
	.member-price-btn{
		width: 95%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background-color: $uni-color-primary;
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 50rpx;
		position: fixed;
		left: 50%;
		bottom: 24rpx;
		transform: translateX(-50%);
		z-index: 99;
	}
}
</style>
