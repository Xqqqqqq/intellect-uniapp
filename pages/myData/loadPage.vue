<template>
	<view class="load">
		<view class="load-img">
			<image src='../../static/img/icons/common.jpg'></image>
		</view>
		<view class="load-title">武装大脑</view>
		<view class="load-tip">碎片化时间学习训练工具</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		mounted(){
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/myData/myData'
				})
			},1000)
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height: 100%;
	background-color: $uni-color-primary;
}
.load{
	width: 100%;
	height: 100%;
	.load-img{
		margin: auto;
		margin-top: 10%;
		margin-bottom: 5%;
		width: 200rpx;
		height: 200rpx;
		border-radius: 15rpx;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.load-title{
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 34rpx;
		font-weight: bold;
	}
	.load-tip{
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 26rpx;
		position: fixed;
		left: 0%;
		bottom: 5%;
	}
}
</style>
