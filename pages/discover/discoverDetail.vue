<template>
	<view class="detail">
		<view class="detail-top">
			<view class="detail-top-title">
				标题标题标题标题标题标题标题标题标题标题标题标题标题标题
			</view>
			<view class="detail-top-info">
				<view>作者：方式</view>
				<view>2020-09-09</view>
			</view>
			<view class="detail-top-picker">
				<view>当前分组：无分组</view>
				<picker>更多 ></picker>
			</view>
		</view>
		<view class="detail-content">
			<image src="../../static/img/icons/zhongjiang.png"></image>
			<rich-text :nodes="nodes"></rich-text>
		</view>
		<view class="detail-ul">
			<my-list :myList="listdetial" @gotoUrl="gotoListDetail"></my-list>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-li detail-bottom-li-gray">取消全部收藏</view>
			<view class="detail-bottom-li detail-bottom-li-blue">收藏全部训练</view>
		</view>
		<view class="detail-btn">
			<view class="detail-btn-li">
				<view class="btn-li-num">1.1k</view>
				<view class="btn-li-img">
					<image src='../../static/img/icons/youyong.png'></image>
				</view>
				<view class="btn-li-title">有用</view>
			</view>
			<view class="detail-btn-li">
				<view class="btn-li-num">1.1k</view>
				<view class="btn-li-img">
					<image src='../../static/img/icons/wuyong.png'></image>
				</view>
				<view class="btn-li-title">无用</view>
			</view>
			<view class="detail-btn-li">
				<view class="btn-li-num">1.1k</view>
				<view class="btn-li-img">
					<image src='../../static/img/icons/shoucang2.png'></image>
				</view>
				<view class="btn-li-title">收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyList from '@/components/my-list/my-list.vue'
	export default {
		components: {
			MyList,
		},
		data() {
			return {
				nodes: '',
				listdetial:[{
					src:'../../static/img/icons/common.jpg',
					title: '数字图像记忆',
					source: '官方',
					person: '100',
					detail: '简介：针对0~100的数字进行图像',
					date: '2020-10-10',
					num: 20
				},{
					src:'../../static/img/icons/common.jpg',
					title: '数字图像记忆',
					source: '官方',
					person: '100',
					detail: '简介：针对0~100的数字进行图像',
					date: '2020-10-10',
					num: 20
				}],
			};
		},
		methods:{
			gotoListDetail(item){
				console.log(item)
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.detail{
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.detail-top{
		width: 100%;
		margin-bottom: 30rpx;
		border-bottom: 1rpx solid rgba(211,211,211,0.5);
		padding-bottom: 20rpx;
		box-sizing: border-box;
		.detail-top-title{
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			color: #333333;
		}
		.detail-top-info{
			width: 100%;
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color: #999999;
			line-height: 1;
			margin-bottom: 20rpx;
		}
		.detail-top-picker{
			width: 100%;
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color: #666;
			border-top: 1rpx solid rgba(211,211,211,0.5);
			padding-top: 20rpx;
			box-sizing: border-box;
		}
	}
	.detail-content{
		width: 100%;
		margin-bottom: 30rpx;
		border-bottom: 1rpx solid rgba(211,211,211,0.5);
		padding-bottom: 20rpx;
		box-sizing: border-box;
	}
	.detail-bottom{
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-radius: 15rpx;
		overflow: hidden;
		margin-top: 30rpx;
		.detail-bottom-li{
			width: 50%;
			height: 80rpx;
			line-height: 80rpx;
			color: #FFFFFF;
			text-align: center;
			font-size: 26rpx;
			font-weight: bold;
		}
		.detail-bottom-li-gray{
			background-color: $uni-text-color-disable;
		}
		.detail-bottom-li-blue{
			background-color: $uni-color-primary;
		}
	}
	.detail-btn{
		width: 100%;
		display: flex;
		justify-content: space-around;
		border-radius: 15rpx;
		margin-top: 40rpx;
		.detail-btn-li{
			text-align: center;
			.btn-li-num{
				font-size: 26rpx;
				color: #999999;
				margin-bottom: 10rpx;
			}
			.btn-li-img{
				width: 80rpx;
				height: 80rpx;
				background-color: $uni-text-color-disable;
				border-radius: 50%;
				overflow: hidden;
				margin: auto;
				margin-bottom: 20rpx;
				position: relative;
				image{
					width: 60%;
					height: 60%;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
			.btn-li-title{
				color: #666666;
				font-size: 24rpx;
			}
		}
	}
}
</style>
