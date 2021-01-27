<template>
	<view class="ele-entry">
		<view class="list-content-box">
			<view class="content-box-left">
				<image src="../../../static/img/icons/common.jpg"></image>
			</view>
			<view class="content-box-right">
				<view class="box-right-title">数字元素训练</view>
				<view class="box-right-tip">
					<view>出题：官方</view>
					<view><image src="../../../static/img/icons/shoucang.png"></image>1人收藏</view>
				</view>
				<view class="box-right-line"></view>
				<view class="box-right-tip">简介：杰弗里斯减肥了复健科</view>
				<view class="box-right-tip"><text>上次使用：2020-1-1</text><text>1次/月</text></view>
			</view>
		</view>
		<view class="detail-top-picker">
			<view>当前分组：无分组</view>
			<picker>更多 ></picker>
		</view>
		<view class="ele-content">
			<view class="ele-content-title">内容详述</view>
			<rich-text :nodes="nodes"></rich-text>
		</view>
		<view class="ele-bottom">
			<view class="ele-bottom-title">关键词</view>
			<view class="ele-bottom-ul">
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
				<view class="ele-bottom-ul-li">数学</view>
			</view>
		</view>
		<view class="ele-btn">
			<view class="ele-btn-li ele-btn-li-gray" @click="gotoUrl('/pages/train/imageMemory/historyTest')">历史测试</view>
			<view class="ele-btn-li ele-btn-li-blue" @click="gotoUrl('/pages/train/imageMemory/numImgTest')">前往测试</view>
			<view class="ele-btn-li ele-btn-li-green" @click="gotoUrl('/pages/train/imageMemory/numImgCard')">进入训练</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nodes:''
			};
		},
		methods:{
			gotoUrl(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.ele-entry{
	width: 100%;
	.list-content-box{
		width: 100%;
		background-color: #FFFFFF;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		position: relative;
		margin-bottom: 20rpx;
		.content-box-left{
			width: 180rpx;
			height: 180rpx;
			border-radius: 30rpx;
			overflow: hidden;
			margin-right: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.content-box-right{
			width: 66%;
			.box-right-title{
				color: #333333;
				font-weight: bold;
				font-size: 36rpx;
				width: 83%;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				margin-bottom: 20rpx;
			}
			.box-right-tip{
				color: #666;
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
				margin-bottom: 15rpx;
				image{
					width: 25rpx;
					height: 25rpx;
					margin-right: 10rpx;
				}
			}
			.box-right-line{
				width: 100%;
				height: 1rpx;
				background-color: #F0F0F0;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
			}
		}
	}
	.detail-top-picker{
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #666;
		padding: 24rpx;
		box-sizing: border-box;
		background-color: $uni-bg-color-grey;
	}
	.ele-content{
		padding: 24rpx;
		box-sizing: border-box;
		border-bottom: 1rpx solid #d3d3d3;
		margin-bottom: 20rpx;
		.ele-content-title{
			line-height: 70rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			border-bottom: 1rpx solid #d3d3d3;
		}
	}
	.ele-bottom{
		padding: 24rpx;
		box-sizing: border-box;
		.ele-bottom-title{
			font-size: 26rpx;
			color: #333333;
			margin-bottom: 20rpx;
		}
		.ele-bottom-ul{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			font-size: 26rpx;
			color: #666666;
			.ele-bottom-ul-li{
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
	}
	.ele-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
		width: 100%;
		.ele-btn-li{
			width: 33.3%;
			text-align: center;
		}
		.ele-btn-li-gray{
			background-color: $uni-text-color-disable;
		}
		.ele-btn-li-blue{
			background-color: $uni-color-primary;
		}
		.ele-btn-li-green{
			background-color: $uni-color-success;
		}
	}
}
</style>
