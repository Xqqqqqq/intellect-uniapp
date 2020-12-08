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
				border: 1px solid rgba(147, 147, 147, 0.6);
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
				border: 1px solid rgba(108,143,197,0.6);
				color: $uni-color-primary;
			}
		}
	}
}
</style>
