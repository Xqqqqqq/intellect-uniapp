<template>
	<view class="train-link">
		<view class="img-pair-top" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="pair-top-blue">当前组号：1</view>
			<view class="pair-top-red">{{resendTime}}s</view>
			<view class="pair-top-blue">第1组 / 共5组</view>
		</view>
		
		<view class="img-test-btn">
			<view class="test-btn-li test-btn-li-gray">上一条</view>
			<view class="test-btn-li test-btn-li-blue" @click="gotoUrl">下一条</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resendTime: 60,// 倒计时秒数
				showH5:true,
			};
		},
		onShow(){
			if(navigator){
				this.showH5 = true
			}else{
				this.showH5 = false
			}
			// 计时器
			const timer = setInterval(() => {
				this.resendTime = this.resendTime - 1;
				if (this.resendTime === 0) {
					clearInterval(timer);
				}
			}, 1000);
		},
		methods:{
			gotoUrl(){
				uni.navigateTo({
					url: '/pages/train/methodTraining/testLink'
				})
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
}
</style>
