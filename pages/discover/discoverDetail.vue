<template>
	<view class="detail">
		<view class="detail-top">
			<view class="detail-top-title">{{articleVo.articleTitle}}</view>
			<view class="detail-top-info">
				<view>作者：{{articleVo.articleAuthor || '未知'}}</view>
				<view>{{articleVo.createDate}}</view>
			</view>
			<!-- <view class="detail-top-picker">
				<view>当前分组：无分组</view>
				<picker>更多 ></picker>
			</view> -->
		</view>
		<view class="detail-content">
			<image :src="articleVo.articleImg"></image>
			<rich-text :nodes="articleVo.content"></rich-text>
		</view>
		<view class="detail-ul">
			<my-list :myList="collectsList" @gotoUrl="gotoListDetail" @clickAttention="clickAttention"></my-list>
			<no-data v-if="status == 'noMore' && !collectsList.length"></no-data>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-li detail-bottom-li-gray" @click="clickButton('drop')">取消全部收藏</view>
			<view class="detail-bottom-li detail-bottom-li-blue" @click="clickButton('up')">收藏全部训练</view>
		</view>
		<view class="detail-btn">
			<view class="detail-btn-li" @click="clickUsefulness('use')">
				<view class="btn-li-num">{{articleVo.thumbNum}}</view>
				<view class="btn-li-img" :class="{'btn-li-img-choose':articleVo.thumbType == 1}">
					<image src='../../static/img/icons/youyong.png'></image>
				</view>
				<view class="btn-li-title">有用</view>
			</view>
			<view class="detail-btn-li" @click="clickUsefulness('unUse')">
				<view class="btn-li-num">{{articleVo.unThumbNum}}</view>
				<view class="btn-li-img" :class="{'btn-li-img-choose':articleVo.thumbType == 2}">
					<image src='../../static/img/icons/wuyong.png'></image>
				</view>
				<view class="btn-li-title">无用</view>
			</view>
			<view class="detail-btn-li" @click="clickArtAttention">
				<view class="btn-li-num">{{articleVo.attentionNum}}</view>
				<view class="btn-li-img" :class="{'btn-li-img-choose':articleVo.attentionType == 1}">
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
				articleVo:{},
				collectsList:[],
				id:'4028d856788109dc0178811031bc000b',
				memberId: '',
				code:'',
				organizeId: '',//分组id
			};
		},
		onLoad(option){
			if(option.id){
				this.id = option.id
			}
			this.memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
			this.getArticleDetail()
		},
		methods:{
			// 获取文章细节
			getArticleDetail(){
				this.$Request.get(`/appArticleController.do?getArticleDetail&memberId=${this.memberId}&id=${this.id}`)
				.then(res => {
					this.code = res.code
					this.articleVo = res.data.articleVo
					if(res.code == 0){
						this.collectsList =  res.data.collectsList.map(item => {
							return {
								...item,
								studyDate: item.studyDate && item.studyDate.substring(0,10)
							}
						})
					}else if(res.code == '-118'){
						this.status = 'noMore'
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			// 训练跳转详情
			gotoListDetail(item){
				uni.navigateTo({
					url: `/pages/train/imageMemory/numEleEntry?id=${item.id}`
				})
			},
			// 收藏训练
			clickAttention(item, index){
				let collectsId = item.id
				this.$Request.get(`/appAttentionController.do?takeCollectsAttention&memberId=${this.memberId}&collectsId=${collectsId}&organizeId=${this.organizeId}`)
				.then(res => {
					if(res.code == 0){
						this.collectsList[index].attentionNum = item.attentionType == 1 ? item.attentionNum - 1 : item.attentionNum + 1
						this.collectsList[index].attentionType = item.attentionType == 1 ? 0 : 1
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			// 点击收藏、取消收藏训练按钮
			clickButton(type){
				switch(type) {
				 case 'up':
					this.upArticleCollectsAttention()
					break;
				 case 'drop':
					this.dropArticleCollectsAttention()
					break;
				} 
			},
			upArticleCollectsAttention(){
				this.$Request.get(`/appAttentionController.do?upArticleCollectsAttention&memberId=${this.memberId}&articleId=${this.id}&organizeId=${this.organizeId}`)
				.then(res => {
					if(res.code == 0){
						uni.showToast({
							title: '收藏成功！',
							icon: 'none'
						})
						this.getArticleDetail()
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			dropArticleCollectsAttention(){
				this.$Request.get(`/appAttentionController.do?dropArticleCollectsAttention&memberId=${this.memberId}&articleId=${this.id}`)
				.then(res => {
					if(res.code == 0){
						uni.showToast({
							title: '取消成功！',
							icon: 'none'
						})
						this.getArticleDetail()
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			// 收藏文章
			clickArtAttention(){
				this.$Request.get(`/appAttentionController.do?takeArticleAttention&memberId=${this.memberId}&articleId=${this.id}&organizeId=${this.organizeId}`)
				.then(res => {
					if(res.code == 0){
						this.articleVo.attentionType = this.articleVo.attentionType == 1 ? 0 : 1
						this.articleVo.attentionNum = this.articleVo.attentionType == 1 ? this.articleVo.attentionNum + 1 : this.articleVo.attentionNum - 1
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			// 点击有用、无用
			clickUsefulness(type){
				switch(type) {
				 case 'use':
					this.usefulArticleThumbs()
					break;
				 case 'unUse':
					this.uselessArticleThumbs()
					break;
				} 
			},
			usefulArticleThumbs(){
				this.$Request.get(`/appAttentionController.do?usefulArticleThumbs&memberId=${this.memberId}&articleId=${this.id}`)
				.then(res => {
					if(res.code == 0){
						uni.showToast({
							title: '操作成功！',
							icon: 'none'
						})
						this.getArticleDetail()
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			uselessArticleThumbs(){
				this.$Request.get(`/appAttentionController.do?uselessArticleThumbs&memberId=${this.memberId}&articleId=${this.id}`)
				.then(res => {
					if(res.code == 0){
						uni.showToast({
							title: '操作成功！',
							icon: 'none'
						})
						this.getArticleDetail()
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
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
				&-choose{
					background-color: #d2f1f0;
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
