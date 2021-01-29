<template>
	<view class="img-pair">
		<view class="img-pair-top" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="pair-top-blue">数图配对：</view>
			<view class="pair-top-red">{{page.examTime}}s</view>
			<view class="pair-top-blue">第{{page.pageNum+1}}组 / 共{{page.examNum}}组</view>
		</view>
		<numImgPair :page="page" :allData="allData" :problemList="problemList" @clickPairLeft="clickPairLeft" @clickPairRight="clickPairRight"></numImgPair>
		<view class="img-pair-btn" @click="gotoUrl">下一组</view>
	</view>
</template>

<script>
	import myData from '@/common/json/numImgPair.json'
	import numImgPair from './imgComponents/numImgPair.vue'
	export default {
		components: {
			numImgPair
		},
		data() {
			return {
				allData:{},
				problemList: [], //保存所有已选中的数据
				showH5: true,
				page:{
					pageNum: 0,
					examNum: 10,
					examTime: null,
				}
			};
		},
		onShow(){
			if(navigator){
				this.showH5 = true
			}else{
				this.showH5 = false
			}
			// 计时器
			this.allData = myData.data
			this.page.examTime = myData.data.examTime
			this.page.examNum = myData.data.examNum
			const timer = setInterval(() => {
				this.page.examTime = this.page.examTime - 1;
				if (this.page.examTime === 0) {
					clearInterval(timer);
				}
			}, 1000);
		},
		methods:{
			clickPairLeft(arr){
				this.problemList = arr
				console.log('left',arr)
			},
			clickPairRight(arr){
				this.problemList = arr
				console.log('right',arr)
			},
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height: 100%;
}
.img-pair{
	width: 100%;
	height: 100%;
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
		top: 0;
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
	.img-pair-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		width: 100%;
		text-align: center;
		background-color: $uni-color-primary;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rpx;
		font-weight: bold;
	}
}
</style>
