<template>
	<view class="center">
		<view class="discover-top">
			<view class="wrap-select">
			  <input @input="bindNameInput" v-model="goodsName" 
			  type="text" placeholder="请输入训练名称" placeholder-class="input-placeholder" class="input-length"/>
			  <view class="search-icon" @click="clickSearch">
			    <image src="../../static/img/icons/search.png"></image>
			  </view>
			</view>
			<my-scrollX
			:scrollList="scrollTopList" :currentTab="currentTopTab"
			:beforeColor="beforeColor" :afterColor="afterColor" @tabChange="tabChange"></my-scrollX>
		</view>
		<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @onSelected='onSelected'></ren-dropdown-filter>
		<view class="wrap-content">
			<my-list :myList="trainInfo.collectsList" @gotoUrl="gotoListDetail" @clickAttention="clickAttention"></my-list>
			<no-data v-if="status == 'noMore' && !trainInfo.collectsList.length"></no-data>
			<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
		</view>
	</view>
</template>

<script>
	import myScrollX from '@/components/my-scrollX/my-scrollX.vue'
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import MyList from '@/components/my-list/my-list.vue'
	export default {
		components: {
			myScrollX,
			RenDropdownFilter,
			MyList,
		},
		data() {
			return {
				goodsName:'',
				scrollTopList:[{
					id:1,
					name: '推荐',
				},{
					id:0,
					name: '全部',
				}],
				currentTopTab: 0,
				beforeColor: '#999999',
				afterColor: '#ffffff',
				filterData: [
					[{
						text: '全部收藏',
						value: 0
					},{
						text: '收藏升序',
						value: 2
					}, {
						text: '收藏降序',
						value: 1
					}],
					[{
						text: '全部特权',
						value: 3
					}, {
						text: '专属VIP',
						value: 1
					}, {
						text: '免费使用',
						value: 0
					}, {
						text: '消耗能量',
						value: 2
					}],
					[{
						text: '全部收藏',
						value: 0
					}, {
						text: '已收藏',
						value: 1
					}, {
						text: '未收藏',
						value: 2
					}]
				],
				defaultIndex: [0, 0, 0],
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
				parameterInfo:{
					recommendType:1,
					orderType:0,
					vipType:3,
					attentionType:0,
				}, //初始化值
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
			// 获取训练数据列表
			getTrainList(){
				this.$Request.get('/appCollectsController.do?getCollectsList&type=1&groupId',{
					...this.parameterInfo,
					page:this.page
				}).then(res => {
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
			tabChange(item, index){
				this.currentTopTab = index
				this.parameterInfo.recommendType = item.id
				this.getTrainList()
			},
			onSelected(res) {
				this.parameterInfo.orderType = res[0][0].value
				this.parameterInfo.vipType = res[1][0].value
				this.parameterInfo.attentionType = res[2][0].value
				this.getTrainList()
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
			bindNameInput(e){
				this.goodsName = e.target.value
				console.log(e.target.value)
			},
			clickSearch(){
			},
		}
	}
</script>

<style lang="scss">
.center{
	width: 100%;
	.discover-top{
		width: 100%;
		background-color: $uni-color-primary;
		padding: 40rpx 24rpx;
		padding-bottom: 24rpx;
		box-sizing: border-box;
		.wrap-select{
		  width: 100%;
		  height:70rpx;
		  line-height: 70rpx;
		  background:rgba(245,245,245,1);
		  border-radius:34rpx;
		  position: relative;
		  padding: 0 37rpx;
		  box-sizing: border-box;
		  margin-bottom: 40rpx;
		  .input-length{
		    width: 90%;
		    height: 100%;
		    line-height: 70rpx;
		    font-size: 28rpx;
		  }
		  .input-placeholder{
		    font-size: 26rpx;
		    color: #A1A1A1;
		  }
		  .search-icon{
		    width: 35rpx;
		    height: 35rpx;
		    position: absolute;
		    top: 50%;
		    right: 34rpx;
		    transform: translateY(-50%);
		    text-align: center;
		    z-index: 999;
		  }
		  .search-icon image{
		    width: 90%;
		    height: 90%;
		    margin: auto;
		    display: inline;
		  }
		}
	}
	.wrap-content{
		padding: 24rpx;
		box-sizing: border-box;
	}
}
</style>
