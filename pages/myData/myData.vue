<template>
	<view class="wrap">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li" @click="gotoUrl('/pages/myData/calendar')">
					<view class="top-box-li-title">本月签到</view>
					<view class="top-box-li-num">{{trainInfo.sign || 0}}</view>
				</view>
				<view class="top-box-li" @click="gotoUrl('/pages/myData/train')">
					<view class="top-box-li-title">本月训练</view>
					<view class="top-box-li-num">{{trainInfo.train || 0}}</view>
				</view>
				<view class="top-box-li" @click="gotoUrl('/pages/myData/longestSeries')">
					<view class="top-box-li-title">本月连续</view>
					<view class="top-box-li-num">{{trainInfo.continuous || 0}}</view>
				</view>
			</view>
			<view class="wrap-top-tip animated">决胜于碎片化时间的利用</view>
		</view>
		
		<view class="wrap-bottom">
			<view class="wrap-bottom-title">
				<text>我的训练</text>
				<text v-if="showClassify" @click="gotoUrl('/pages/myData/groupManage')">分组管理 ></text>
			</view>
			<top-input v-if="showClassify" class="top-input" :changeValue="changeValue" :placeholderText="placeholderText" @changeInput="changeInput"></top-input>
			<my-scrollX v-if="showClassify" 
			:scrollList="scrollTopList" :currentTab="currentTopTab"
			:beforeColor="beforeColor" :afterColor="afterColor" @tabChange="tabChange"></my-scrollX>
		</view>
		
		<view class="wrap-content">
			<my-list :myList="trainInfo.collectsList" @gotoUrl="gotoListDetail" @clickAttention="clickAttention"></my-list>
			<no-data v-if="status == 'noMore' && !trainInfo.collectsList.length"></no-data>
			<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
		</view>
	</view>
</template>

<script>
	import myScrollX from '@/components/my-scrollX/my-scrollX.vue'
	import TopInput from '@/components/top-input/top-input.vue'
	import MyList from '@/components/my-list/my-list.vue'
	export default {
		components: {
			myScrollX,
			TopInput,
			MyList,
		},
		data() {
			return {
				showClassify: false,
				scrollTopList:[{
					id:0,
					name: '无分类',
				},{
					id:1,
					name: '英语',
				},{
					id:2,
					name: '记忆',
				},{
					id:3,
					name: '医疗',
				},{
					id:4,
					name: '法律',
				},{
					id:3,
					name: '少儿',
				},],
				currentTopTab: 0,
				beforeColor: '#666666',
				afterColor: '#2E3B67',
				placeholderText: '请输入搜索内容',
				changeValue: '',
				trainInfo:{
					collectsList:[
						{
							collectsPic:'https://img1.baidu.com/it/u=1091405991,859863778&fm=26&fmt=auto&gp=0.jpg',
							collectsName:'1111',
							collectsAuthor: '111',
							attentionNum: '11',
							collectsRemarks: '111111111111111',
							studyDate: '11',
							studyMonth: '11',
							vipType: 1,
							id:1,
							attentionType: 1
						},
						{
							collectsPic:'https://img1.baidu.com/it/u=1091405991,859863778&fm=26&fmt=auto&gp=0.jpg',
							collectsName:'1111',
							collectsAuthor: '111',
							attentionNum: '11',
							collectsRemarks: '111111111111111',
							studyDate: '11',
							studyMonth: '11',
							vipType: 1,
							id:1,
							attentionType: 0
						},
					]
				},
				page:1,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '- 暂时没有新内容了呢 -'
				},
				status: 'noMore',
			};
		},
		onPullDownRefresh() {
			this.page = 1;
			this.trainInfo = {};
			uni.showLoading({
				title: '加载中'
			});
			this.getTrainList()
			uni.hideLoading();
		},
		// onReachBottom(){ //不知道一共多少条
		// 	if (this.page * 10 < this.total) {
		// 		this.page = this.page + 1;
		// 		this.getTrainList();
		// 	}
		// },
		mounted(){
			this.getTrainList()
		},
		methods:{
			// 获取首页数据列表
			getTrainList(){
				this.$Request.get(`/appCollectsController.do?getTrainList&page=${this.page}&type=1&groupId`).then(res => {
					if(res.code == 0){
						this.trainInfo = res.data
						this.trainInfo.collectsList =  [...this.trainInfo.collectsList, ...res.data.collectsList]
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
			gotoListDetail(item){
				console.log('1',item)
				uni.navigateTo({
					url: '/pages/train/imageMemory/numEleEntry'
				})
			},
			// 收藏
			clickAttention(item, index){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					let collectsId = item.id
					this.$Request.get(`/appAttentionController.do?takeCollectsAttention&memberId=${memberId}&collectsId=${collectsId}`)
					.then(res => {
						if(res.code == 0){
							this.trainInfo.collectsList[index].attentionType = item.attentionType == 1 ? 0 : 1
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
			gotoUrl(url){
				uni.navigateTo({
					url: url
				})
			},
			tabChange(item, index){
				this.currentTopTab = index
				console.log(item, index)
			},
			changeInput(value){
				console.log(value)
				this.changeValue = value
			},
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	background-color: $uni-color-bg;
}
.wrap{
	width: 100%;
	.wrap-top{
		width: 100%;
		background-color: $uni-color-primary;
		padding: 30rpx 0;
		box-sizing: border-box;
		margin-top: -10rpx;
		.wrap-top-box{
			padding: 40rpx 0;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-bottom: 10rpx;
			.top-box-li{
				text-align: center;
				color: #FFFFFF;
				.top-box-li-title{
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				.top-box-li-num{
					font-size: 28rpx;
				}
			}
		}
		.wrap-top-tip{
			text-align: center;
			color: #FFFFFF;
			animation: flash 3s infinite;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.wrap-content{
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
	}
	.wrap-bottom{
		background-color: #fff;
		padding: 30rpx 24rpx;
		// padding-bottom: 0rpx;
		box-sizing: border-box;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
		.top-input{
			margin-bottom: 40rpx;
			border: 1px solid $uni-border-color;
		}
		.wrap-bottom-title{
			width: 100%;
			display: flex;
			justify-content: space-between;
			color: $uni-text-color;
			font-size: 30rpx;
			// margin-bottom: 20rpx;
			font-weight: bold;
		}
	}
}
</style>
