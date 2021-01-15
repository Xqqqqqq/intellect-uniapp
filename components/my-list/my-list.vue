<template>
	<view>
		<view class="list-content-box" v-for="(item, index) in myList" :key="index" @click="gotoUrl(item)">
			<view class="content-box-left">
				<image :src="item.src"></image>
			</view>
			<view class="content-box-right">
				<view class="box-right-title">{{item.title}}</view>
				<view class="box-right-tip">
					<view>出题：{{item.source}}</view>
					<view><image src="../../static/img/icons/shoucang.png"></image>{{item.person}}人收藏</view>
				</view>
				<view class="box-right-line"></view>
				<view class="box-right-tip">简介：{{item.detail}}</view>
				<view class="box-right-tip"><text>上次使用：{{item.date}}</text><text>{{item.num}}次/月</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 数组
			myList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			gotoUrl(item){
				this.$emit('gotoUrl', item)
			}
		}
	}
</script>

<style lang="scss">
.list-content-box{
	width: 100%;
	background-color: #FFFFFF;
	border-radius: 15rpx;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	position: relative;
	box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
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
</style>
