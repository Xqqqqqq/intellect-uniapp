<template>
	<view class="train-link">
		<view class="img-pair-top" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="pair-top-blue">当前组号：{{pageNum}}</view>
			<view class="pair-top-blue">第{{pageNum}}组 / 共{{totalPage}}组</view>
		</view>
		<view class="train-link-num">
			<view class="link-num-li" v-for="(item, index) in trainList[pageNum-1].numList" :key="index">{{item}}</view>
		</view>
		<view class="train-link-img">
			<view class="link-img-li" v-for="(item, index) in trainList[pageNum-1].imgList" :key="index">
				<image :src="item"></image>
			</view>
		</view>
		<view class="train-link-tip">提示：将他们串联成故事</view>
		<view class="img-test-btn">
			<view class="test-btn-li test-btn-li-gray" @click="returnPrev">上一条</view>
			<view class="test-btn-li test-btn-li-blue" @click="gotoNext" v-if="pageNum != totalPage">下一条</view>
			<view class="test-btn-li test-btn-li-blue" @click="gotoUrl" v-else>开始测试</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trainList:[
					{
						numList:[2,4,6,7,43],
						imgList:[
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/common.jpg",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/blue-arrow.png",
						]
					},
					{
						numList:[1,3,4,6,7],
						imgList:[
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/vip.png",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/blue-arrow.png",
						]
					},
					{
						numList:[54,57,87,3,6],
						imgList:[
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/解决方法.png",
							"../../../static/img/icons/blue-arrow.png",
						]
					},
					{
						numList:[29,45,3,6,46],
						imgList:[
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/排名.png",
							"../../../static/img/icons/解决方法.png",
							"../../../static/img/icons/blue-arrow.png",
						]
					},
					{
						numList:[54,57,87,3,6],
						imgList:[
							"../../../static/img/icons/视觉智能＊.png",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/blue-arrow.png",
							"../../../static/img/icons/解决方法.png",
							"../../../static/img/icons/blue-arrow.png",
						]
					},
				],
				showH5:true,
				totalPage: 5,//总共条数
				pageNum: 1, //当前显示页数
				btnName: '下一条',
			};
		},
		onShow(){
			if(navigator){
				this.showH5 = true
			}else{
				this.showH5 = false
			}
			console.log(this.trainList[0])
		},
		methods:{
			returnPrev(){
				if(this.pageNum == 1){
					uni.showToast({
					    title: '已返回至第一页！',
					    duration: 2000
					});
				}else{
					this.pageNum -= 1
				}
				this.btnName = '下一条'
			},
			gotoNext(){
				if(this.pageNum+1 == this.totalPage){
					this.btnName = '开始测试'
				}
				if(this.pageNum != this.totalPage){
					this.pageNum += 1
				}
			},
			gotoUrl(){
				uni.navigateTo({
					url:'/pages/train/visualMemory/testLink'
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
	}
	.train-link-num{
		display: flex;
		width: 100%;
		justify-content: space-around;
		background-color: #F1F1F1;
		.link-num-li{
			line-height: 300rpx;
			font-size: 70rpx;
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
	.train-link-tip{
		line-height: 100rpx;
		text-align: center;
		width: 100%;
		font-size: 28rpx;
		color: $uni-color-error;
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
