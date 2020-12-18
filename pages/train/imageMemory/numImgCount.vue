<template>
	<view class="img-pair">
		<view class="img-pair-top" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="pair-top-blue">数图计算：</view>
			<view class="pair-top-red">{{resendTime}}s</view>
			<view class="pair-top-blue">第1组 / 共8组</view>
		</view>
		<view class="img-select-box">
			<view class="select-box-top">1</view>
			<view class="select-box-title">选择<text>向后第一张</text>图片：</view>
			<view class="select-box-content">
				<view class="box-content-li" :class="{'box-content-li-choose': currentTab == index}"
				v-for="(item, index) in infoList" :key="index" @click="chooseOne(item, index)">
					<image :src="item.img"></image>
				</view>
			</view>
		</view>
		<view class="img-pair-btn" @click="gotoUrl">下一组</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resendTime: 60,// 倒计时秒数
				infoList:[{
					id:1,
					num:1,
					img:'../../../static/img/icons/zhongjiang.png'
				},{
					id:2,
					num:2,
					img:'../../../static/img/icons/zhongjiang.png'
				},{
					id:3,
					num:3,
					img:'../../../static/img/icons/zhongjiang.png'
				},{
					id:4,
					num:4,
					img:'../../../static/img/icons/zhongjiang.png'
				},{
					id:1,
					num:1,
					img:'../../../static/img/icons/zhongjiang.png'
				},{
					id:2,
					num:2,
					img:'../../../static/img/icons/zhongjiang.png'
				},{
					id:1,
					num:1,
					img:'../../../static/img/icons/zhongjiang.png'
				},{
					id:2,
					num:2,
					img:'../../../static/img/icons/zhongjiang.png'
				},],
				currentTab:-1,
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
			chooseOne(item, index){
				this.currentTab = index
			},
			gotoUrl(){
				uni.navigateTo({
					url: '/pages/train/imageMemory/numImgTestOver'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
}
.img-pair{
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
	.img-select-box{
		width: 100%;
		.select-box-top{
			width: 100%;
			height: 300rpx;
			line-height: 300rpx;
			font-size: 100rpx;
			color: #333333;
			text-align: center;
			font-weight: bolder;
		}
		.select-box-title{
			box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
			background-color: #FFFFFF;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 24rpx;
			box-sizing: border-box;
			font-size: 26rpx;
			color: #333333;
			margin-bottom: 20rpx;
			text{
				color: $uni-color-error;
			}
		}
		.select-box-content{
			display: flex;
			justify-content: space-between;
			flex-flow: wrap;
			align-content: flex-start;
			align-items: flex-start;
			.box-content-li{
				width: 33%;
				height: 220rpx;
				background-color: #FFFFFF;
				text-align: center;
				margin-bottom: 0.5%;
				image{
					width: 220rpx;
					height: 100%;
					margin: auto;
				}
			}
			.box-content-li-choose{
				opacity: 0.5;
				background-color: $uni-color-primary;
			}
			&:after{
				content: '';
				width: 33%;
			}
		}
	}
}
</style>
