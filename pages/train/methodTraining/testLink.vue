<template>
	<view class="train-link">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="img-pair-top">
			<view class="pair-top-blue">当前组号：1</view>
			<view class="pair-top-red">{{resendTime}}s</view>
			<view class="pair-top-blue">第1组 / 共5组</view>
		</view>
		
		<view class="train-link-content">
			<view class="link-content-top">题目一： ipsum dolor sit amet, consectetur adipiscing elit. 
			Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</view>
			
			<view class="link-content-btn" :class="{'link-content-btn-active': currentTab == index}"
			v-for="(item, index) in btnList" :key="index"
			@click="clickTab(index)">{{index+1}}.{{item}}</view>
		</view>
		
		<view class="img-test-btn">
			<view class="test-btn-li test-btn-li-gray">上一条</view>
			<view class="test-btn-li test-btn-li-blue">下一条</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resendTime: 60,// 倒计时秒数
				btnList:['答案1','答案2','答案3','答案4','答案5'],
				currentTab: -1,
			};
		},
		onShow(){
			// 计时器
			const timer = setInterval(() => {
				this.resendTime = this.resendTime - 1;
				if (this.resendTime === 0) {
					clearInterval(timer);
				}
			}, 1000);
		},
		methods:{
			clickTab(index){
				this.currentTab = index
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
.train-link{
	width: 100%;
	padding: 80rpx 0 100rpx 0;
	box-sizing: border-box;
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
	.img-pair-top{
		position: fixed;
		left: 0;
		top: 88rpx;
		z-index: 99;
		box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
		display: flex;
		justify-content: space-between;
		padding: 0 24rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		.pair-top-blue{
			font-size: 28rpx;
			color: $uni-color-primary;
		}
		.pair-top-red{
			font-size: 28rpx;
			font-weight: bold;
			color: $uni-color-error;
		}
	}
	.img-test-btn{
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		.test-btn-li{
			width: 49.8%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 30rpx;
		}
		.test-btn-li-gray{
			background-color: #D3D3D3;
			color: #666666;
		}
		.test-btn-li-blue{
			background-color: $uni-color-primary;
		}
	}
	.train-link-content{
		width: 100%;
		padding: 50rpx;
		box-sizing: border-box;
		.link-content-top{
			margin-bottom: 50rpx;
		}
		.link-content-btn{
			width: 100%;
			border-radius: 50rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: left;
			font-size: 32rpx;
			background-color: #D3D3D3;
			padding: 0 40rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
		}
		.link-content-btn-active{
			color: #FFFFFF;
			font-weight: bold;
			background-color: $uni-color-primary;
		}
	}
}
</style>
