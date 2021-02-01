<template>
	<view class="card">
		<view class="card-tab" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="card-tab-li" @click="clickTab(index)"
			:class="{'card-tab-li-click': currentTab == index}"
			v-for="(item, index) in tabList" :key="index">{{item.name}}</view>
		</view>
		
		<view class="card-ul">
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
			<view class="card-ul-li">
				<view class="card-ul-li-left">3<text>元</text></view>
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
				<view class="card-ul-li-btn card-ul-li-btn-other">已兑换</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[{
					id:1,
					name:'我的卡券'
				},{
					id:2,
					name:'历史卡券'
				}],
				currentTab:0,
				showH5: true,
			};
		},
		onShow(){
			if(navigator){
				this.showH5 = true
			}else{
				this.showH5 = false
			}
		},
		methods:{
			clickTab(index){
				this.currentTab = index
			}
		}
	}
</script>

<style lang="scss">
.card{
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	padding-top: 100rpx;
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: $uni-color-primary;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		.top_view {
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			background-color: $uni-color-primary;
			top: 0;
			z-index: 999;
		}
	}
	.card-tab{
		position: fixed;
		left: 0;
		top: 88rpx;
		z-index: 999;
		display: flex;
		background-color: #FFFFFF;
		justify-content: space-around;
		width: 100%;
		line-height: 100rpx;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
		.card-tab-li{
			color: #666666;
			font-size: 32rpx;
		}
		.card-tab-li-click{
			font-size: 34rpx;
			color: $uni-color-primary;
			font-weight: bold;
		}
	}
	.card-ul{
		margin-top: 30rpx;
		width: 100%;
		.card-ul-li{
			width: 100%;
			margin-bottom: 20rpx;
			display: flex;
			border: 2rpx solid $uni-color-error;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			height: 180rpx;
			position: relative;
			box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
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
