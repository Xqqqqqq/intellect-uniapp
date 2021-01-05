<template>
	<view class="test-link">
		<view class="img-pair-top" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="pair-top-blue">测试通关：1</view>
			<view class="pair-top-blue">第1组 / 共5组</view>
		</view>
		<view class="train-link-num">
			<view class="link-num-li">第一组没有哪张图片</view>
		</view>
		<view class="train-link-img">
			<view class="link-img-li" v-for="(item, index) in imgList" :key="index">
				<image :src="item"></image>
			</view>
		</view>
		<view class="train-link-input">
			<input type="number" class="link-input-li"/>
			<input type="number" class="link-input-li"/>
			<input type="number" class="link-input-li"/>
			<input type="number" class="link-input-li"/>
			<input type="number" class="link-input-li"/>
		</view>
		<view class="img-test-btn">
			<view class="test-btn-li test-btn-li-blue" @click="gotoUrl">查看结果</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[
					"../../../static/img/icons/blue-arrow.png",
					"../../../static/img/icons/blue-arrow.png",
					"../../../static/img/icons/blue-arrow.png",
					"../../../static/img/icons/blue-arrow.png",
					"../../../static/img/icons/blue-arrow.png",
				],
				showH5:true,
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
			gotoUrl(){
				uni.navigateTo({
					url:'/pages/train/visualMemory/numImgTestOver'
				})
			}
		}
	}
</script>

<style lang="scss">
.test-link{
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
	}
	.train-link-num{
		display: flex;
		width: 100%;
		justify-content: space-around;
		background-color: #F1F1F1;
		.link-num-li{
			line-height: 300rpx;
			font-size: 50rpx;
			font-weight: bold;
		}
	}
	.train-link-img{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.link-img-li{
			width: 33%;
			height: 250rpx;
			box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
			background-color: #FFFFFF;
			margin-bottom: .5%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		&:after{
			content: '';
			width: 33%;
		}
	}
	.train-link-input{
		width: 100%;
		display: flex;
		.link-input-li{
			width: 20%;
			border: 1rpx solid #F0F0F0;
			background-color: #FFFFFF;
			height: 150rpx;
			text-align: center;
			font-size: 36rpx;
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
			width: 100%;
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
