<template>
	<view class="longer">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li">
					<view class="top-box-li-title">本月</view>
					<view class="top-box-li-num">{{trainInfo.num || 0}}天</view>
				</view>
			</view>
			<view class="wrap-top-tip">碎片化时间训练坚持力</view>
		</view>
		<view class="longer-top">
			<view class="longer-top-li">
				<view class="top-li-line">
					<view>本月最长连续</view>
					<view><text>{{trainInfo.num || 0}}</text>天</view>
				</view>
				<view class="top-li-line">
					<view>起始：{{trainInfo.startTime || 0}}</view>
					<view>结束：{{trainInfo.endTime || 0}}</view>
				</view>
			</view>
		</view>
		
		<view class="longer-content">
			<my-list :myList="collectsList" @gotoUrl="gotoListDetail" @clickAttention="clickAttention"></my-list>
			<no-data v-if="status == 'noMore' && !collectsList.length"></no-data>
			<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
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
				trainInfo:{},
				collectsList:[],
				page:1,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '- 暂时没有新内容了呢 -'
				},
				status: 'loading',
				code:'',
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.trainInfo = {};
			this.collectsList = []
			uni.showLoading({
				title: '加载中'
			});
			this.getTrainList()
			uni.hideLoading();
			uni.stopPullDownRefresh()
		},
		onReachBottom(){
			if (this.code != '-116') {
				this.page = this.page + 1;
				this.getTrainList();
			}
		},
		onShow(){
			this.page = 1;
			this.trainInfo = {};
			this.collectsList = []
			this.getTrainList()
		},
		methods: {
			// 获取本月连续数据列表
			getTrainList(){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					this.$Request.get(`/appCollectsController.do?getMonthNumCollectsList&memberId=${memberId}&page=${this.page}`).then(res => {
						this.code = res.code
						this.trainInfo = res.data
						this.status = 'noMore'
						if(res.code == 0){
							this.collectsList =  [...this.collectsList, ...res.data.collectsList].map(item => {
								return {
									...item,
									studyDate: item.studyDate && item.studyDate.substring(0,10)
								}
							})
						}else if(res.code == '-118' || res.code == '-116'){
							this.status = 'noMore'
						}else{
							uni.showToast({
								title: res.info,
								icon: 'none'
							})
						}
					})
				}else{
					uni.showToast({
						title: '您尚未登录，正在跳往登录页面。。。',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateTo({
							url:'/pages/loginAll/login'
						})
					}, 1000)
				}
			},
			gotoListDetail(item){
				uni.navigateTo({
					url: `/pages/train/imageMemory/numEleEntry?id=${item.id}`
				})
			},
			// 收藏
			clickAttention(item, index){
				let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
				let collectsId = item.id
				this.$Request.get(`/appAttentionController.do?takeCollectsAttention&memberId=${memberId}&collectsId=${collectsId}`)
				.then(res => {
					if(res.code == 0){
						this.collectsList[index].attentionType = item.attentionType == 1 ? 0 : 1
						this.collectsList[index].attentionNum = item.attentionType == 1 ? item.attentionNum - 1 : item.attentionNum + 1
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
