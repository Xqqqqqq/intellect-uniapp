<template>
	<view class="feed">
		<view class="feed-top">
			<view class="feed-top-li" :class="{'feed-top-li-click': currentTab == index}"
			v-for="(item, index) in problemList" :key="index"
			@click="clickTab(item, index)">{{item.title}}</view>
		</view>
		<view class="feed-content">
			<view class="feed-content-title">问题描述</view>
			<view class="feed-content-text">
				<textarea placeholder="请输入问题描述..."></textarea>
			</view>
		</view>
		<view class="feed-bottom">
			<view class="feed-content-title">上传图片</view>
			<htz-image-upload :max="9" name="file" :chooseNum="9" v-model="imageData" @chooseSuccess="ceshiChooseSuccess"></htz-image-upload>
			<!-- view class="feed-content-ul">
				<image v-for="(item, index) in urls" :key="index" :src="item" @click="clickUrl(index)"></image>
				<image  src='../../static/img/icons/add.png' @click="clickUrl(-1)"></image>
			</view> -->
		</view>
		<view class="feed-btn">提交信息</view>
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	export default {
		components: {
			avatar,
			htzImageUpload,
		},
		data() {
			return {
				uploadParams: {
					type: 'dailyLife'
				},
				problemList:[{
					id:1,
					title:'系统操作问题'
				},{
					id:2,
					title:'平台优化建议'
				},{
					id:3,
					title:'违规内容举报'
				},{
					id:4,
					title:'内容方向建议'
				},{
					id:5,
					title:'平台bug上报'
				},{
					id:6,
					title:'其他内容'
				},],
				currentTab:-1,
				urls: [],
				urlImgIndex: 0,
				showAvatar: false,
				imageData: [],
			};
		},
		methods:{
			clickTab(item, index){
				this.currentTab = index
			},
			ceshiChooseSuccess(tempFilePaths) { //选择图片返回
				console.log('ceshiChooseSuccess', tempFilePaths);
				/****************
				以下代码是自定义上传逻辑，仅供参考
				***************/
				this.imgUpload(tempFilePaths);
				/*******************************/
			},
		}
	}
</script>

<style lang="scss">
.feed{
	width: 100%;
	padding-bottom: 130rpx;
	box-sizing: border-box;
	.feed-top{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.feed-top-li{
			width: 33%;
			text-align: center;
			background-color: #FFFFFF;
			font-weight: bold;
			height: 200rpx;
			line-height: 200rpx;
			font-size: 30rpx;
			margin-bottom: 0.5%;
		}
		.feed-top-li-click{
			background-color: $uni-text-color-disable;
			color: #FFFFFF;
		}
	}
	.feed-content{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		.feed-content-title{
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
		}
		.feed-content-text{
			border: 1px solid #D3D3D3;
			width: 100%;
			height: 400rpx;
			padding: 24rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			textarea{
				width: 100%;
				height: 100%;
				font-size: 26rpx;
			}
		}
	}
	.feed-bottom{
		background-color: #FFFFFF;
		padding: 24rpx;
		box-sizing: border-box;
		.feed-content-title{
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
		}
		.feed-content-ul{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			image{
				width: 180rpx;
				height: 180rpx;
				border-radius: 15rpx;
				margin-right: 7%;
				margin-bottom: 20rpx;
			}
		}
	}
	.feed-btn{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30rpx;
		font-weight: bold;
		background-color: $uni-color-primary;
		position: fixed;
		left: 0;
		bottom: 0;
	}
}
</style>
