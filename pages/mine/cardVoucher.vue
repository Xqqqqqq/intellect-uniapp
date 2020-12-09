<template>
	<view class="card">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="card-tab">
			<view class="card-tab-li" @click="clickTab(index)"
			:class="{'card-tab-li-click': currentTab == index}"
			v-for="(item, index) in tabList" :key="index">{{item.name}}</view>
		</view>
		
		<view class="card-ul">
			<view class="card-ul-li">
				<view class="card-ul-li-left"></view>
				<view class="card-ul-li-content">
					<image src='../../static/img/icons/red.png'></image>
				</view>
				<view class="card-ul-li-right"></view>
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
					name:'全部'
				},{
					id:2,
					name:'未使用'
				},{
					id:3,
					name:'已使用'
				},{
					id:4,
					name:'已失效'
				},],
				currentTab:0,
			};
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
			border: 2rpx solid #F24F52;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			height: 130rpx;
			.card-ul-li-left{
				width: 150rpx;
				height: 100%;
				background-color: #F24F52;
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
			}
		}
	}
}
</style>
