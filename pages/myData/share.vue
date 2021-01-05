<template>
	<view class="share" :style="{background: `url(${bgUrl}) no-repeat`,'background-size': `100% 100%`}">
		<view class="share-btn">保存海报并分享</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgUrl:'../../static/img/icons/bg.jpg'
			};
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height: 100%;
}
.share{
	width: 100%;
	height: 100%;
	.share-btn{
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 10%;
		background-color: $uni-color-warning;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
	}
}
</style>
