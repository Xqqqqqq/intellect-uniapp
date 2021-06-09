<template>
	<view class="ele-entry">
		<view class="list-content-box">
			<view class="content-box-left">
				<image :src="entryInfo.collectsPic"></image>
			</view>
			<view class="content-box-right">
				<view class="box-right-title">{{entryInfo.collectsName}}</view>
				<view class="box-right-tip">
					<view>出题：{{entryInfo.collectsAuthor}}</view>
					<view><image src="../../../static/img/icons/shoucang.png"></image>{{entryInfo.attentionNum}}人收藏</view>
				</view>
				<view class="box-right-line"></view>
				<view class="box-right-tip">简介：<rich-text style="width: 80%;" :nodes="entryInfo.collectsRemarks"></rich-text></view>
				<view class="box-right-tip"><text>上次使用：{{entryInfo.studyDate || '暂无'}}</text><text>{{entryInfo.studyMonth}}次/本月</text></view>
			</view>
		</view>
		<!-- <view class="detail-top-picker">
			<view>当前分组：无分组</view>
			<picker>更多 ></picker>
		</view> -->
		<view class="ele-content">
			<view class="ele-content-title">内容详述</view>
			<rich-text :nodes="entryInfo.collectsContent"></rich-text>
		</view>
		<view class="ele-bottom">
			<view class="ele-bottom-title">关键词</view>
			<view class="ele-bottom-ul">
				<view class="ele-bottom-ul-li" v-if="entryInfo.labelOne">{{entryInfo.labelOne}}</view>
				<view class="ele-bottom-ul-li" v-if="entryInfo.labelTwo">{{entryInfo.labelTwo}}</view>
				<view class="ele-bottom-ul-li" v-if="entryInfo.labelThree">{{entryInfo.labelThree}}</view>
				<view class="ele-bottom-ul-li" v-if="entryInfo.labelFour">{{entryInfo.labelFour}}</view>
			</view>
		</view>
		<view class="ele-btn">
			<view class="ele-btn-li ele-btn-li-gray" @click="gotoUrl('/pages/train/imageMemory/historyTest', 'history')">历史测试</view>
			<view class="ele-btn-li ele-btn-li-blue" @click="gotoUrl('/pages/train/imageMemory/numImgTest', 'test')">前往测试</view>
			<view class="ele-btn-li ele-btn-li-green" @click="gotoUrl('/pages/train/imageMemory/numImgCard', 'card')">进入训练</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nodes:'',
				entryInfo:{},
				collectsId: '',
				memberId: '',
			};
		},
		onLoad(options){
			console.log(options.id)
			this.memberId = JSON.parse(uni.getStorageSync('userInfo')).id
			if(options.id){
				this.collectsId = options.id
				this.getCollects()
			}
		},
		methods:{
			// 获取详情数据
			getCollects(){
				this.$Request.get(`/appCollectsController.do?getCollects&memberId=${this.memberId}&collectsId=${this.collectsId}`)
				.then(res => {
					if(res.code == 0){
						this.entryInfo = res.data
						this.entryInfo.studyDate = res.data.studyDate.substring(0,10)
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			gotoUrl(url, type){
				if(type == 'card'){ // 进入训练
					uni.navigateTo({
						url: `${url}?collectsId=${this.collectsId}`
					})
				}else if(type == 'history'){ // 历史测试
					uni.navigateTo({
						url: `${url}?title=${this.entryInfo.collectsName}`
					})
				}else if(type == 'test') { //前往测试
					uni.navigateTo({
						url: `${url}?collectsId=${this.collectsId}`
					})
				}
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.ele-entry{
	width: 100%;
	padding-bottom: 100rpx;
	box-sizing: border-box;
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
