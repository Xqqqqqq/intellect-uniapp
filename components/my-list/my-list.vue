<template>
	<view>
		<view class="list-content-box" v-for="(item, index) in myList" :key="index" @click="gotoUrl(item)">
			<view class="content-box-left">
				<image :src="item.collectsPic" v-if="item.collectsPic"></image>
			</view>
			<view class="content-box-right">
				<view class="box-right-title">
					<image v-if="item.vipType == 1" src="../../static/img/icons/vip-yellow.png"></image>
					{{item.collectsName}}
				</view>
				<view class="box-right-tip">
					<view>出题：{{item.collectsAuthor}}</view>
					<view @click.stop="clickAttention(item, index)">
						<image v-if="item.attentionType ==1" src="../../static/img/icons/shoucang.png"></image>
						<image v-if="item.attentionType ==0" src="../../static/img/icons/star1.png"></image>
						{{item.attentionNum}}人收藏
					</view>
				</view>
				<view class="box-right-line"></view>
				<view class="box-right-tip">简介：{{item.collectsRemarks}}</view>
				<view class="box-right-tip"><text>上次使用：{{item.studyDate || '暂无'}}</text><text>{{item.studyMonth}}次/本月</text></view>
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
			},
			clickAttention(item,index){
				this.$emit('clickAttention', item, index)
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
		width: 170rpx;
		height: 170rpx;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 30rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.content-box-right{
		width: 68%;
		.box-right-title{
			color: #333333;
			font-weight: bold;
			font-size: 36rpx;
			width: 83%;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			margin-bottom: 20rpx;
			image{
				width: 35rpx;
				height: 35rpx;
				margin-right: 20rpx;
			}
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
