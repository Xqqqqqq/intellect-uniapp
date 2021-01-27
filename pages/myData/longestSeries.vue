<template>
	<view class="longer">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li">
					<view class="top-box-li-title">本月</view>
					<view class="top-box-li-num">3天</view>
				</view>
			</view>
			<view class="wrap-top-tip">碎片化时间训练坚持力</view>
		</view>
		<view class="longer-top">
			<view class="longer-top-li">
				<view class="top-li-line">
					<view>本月最长连续</view>
					<view><text>3</text>天</view>
				</view>
				<view class="top-li-line">
					<view>起始：456454</view>
					<view>结束：454456</view>
				</view>
			</view>
		</view>
		
		<view class="longer-content">
			<my-list :myList="listdetial" @gotoUrl="gotoListDetail"></my-list>
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
			}
		},
		methods: {
			gotoListDetail(item){
				console.log(item)
			}
		}
	}
</script>

<style lang="scss">
.longer{
	width: 100%;
	.wrap-top{
		width: 100%;
		background-color: $uni-color-primary;
		padding: 30rpx 0;
		box-sizing: border-box;
		margin-top: -10rpx;
		.wrap-top-box{
			padding: 20rpx 0;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-bottom: 10rpx;
			.top-box-li{
				text-align: center;
				color: #FFFFFF;
				.top-box-li-title{
					font-size: 36rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				.top-box-li-num{
					font-size: 30rpx;
				}
			}
		}
		.wrap-top-tip{
			text-align: center;
			color: #FFFFFF;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			font-weight: bold;
		}
	}
	.longer-top{
		width: 100%;
		background-color: #FFFFFF;
		padding: 24rpx;
		box-sizing: border-box;
		box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
		.longer-top-total{
			width: 100%;
			display: flex;
			justify-content: space-around;
			text-align: center;
			flex-direction: column;
			color: #333333;
			font-size: 40rpx;
			font-weight: bold;
			height: 200rpx;
			padding: 30rpx;
			box-sizing: border-box;
			.top-total-two{
				font-size: 34rpx;
			}
		}
		.longer-top-li{
			width: 100%;
			.top-li-line{
				width: 100%;
				display: flex;
				justify-content: space-between;
				line-height: 60rpx;
				font-size: 28rpx;
				color: #666666;
				text{
					font-size: 40rpx;
					color: $uni-color-error;
				}
			}
		}
	}
	.longer-content{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
	}
}
</style>
