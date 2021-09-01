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
				<text @click="gotoUrl('/pages/myData/groupManage')">分组管理 ></text>
			</view>
			<view class="wrap-select">
			  <input @input="bindNameInput" v-model="changeValue" 
			  type="text" placeholder="请输入搜索内容" placeholder-class="input-placeholder" class="input-length"/>
			  <view class="search-icon" @click="clickSearch">
			    <image src="../../static/img/icons/search.png"></image>
			  </view>
			</view>
			<my-scrollX 
			:scrollList="scrollTopList" :currentTab="currentTopTab"
			:beforeColor="beforeColor" :afterColor="afterColor" @tabChange="tabChange"></my-scrollX>
		</view>
		
		<view class="wrap-content">
			<my-list :myList="collectsList" @gotoUrl="gotoListDetail" @clickAttention="clickAttention"></my-list>
			<no-data v-if="status == 'noMore' && !collectsList.length"></no-data>
			<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
		</view>
	</view>
</template>

<script>
	import myScrollX from '@/components/my-scrollX/my-scrollX.vue'
	import MyList from '@/components/my-list/my-list.vue'
	export default {
		components: {
			myScrollX,
			MyList,
		},
		data() {
			return {
				scrollTopList:[],
				currentTopTab: 0,
				beforeColor: '#666666',
				afterColor: '#2E3B67',
				placeholderText: '请输入搜索内容',
				changeValue: '',
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
				organizeId: '',//分组id
			};
		},
		onPullDownRefresh() {
			this.page = 1;
			this.trainInfo = {};
			this.collectsList = []
			this.changeValue = ''
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
			this.currentTopTab = 0
			this.changeValue = ''
			this.organizeId = ''
			this.getTrainList()
		},
		methods:{
			// 获取首页数据列表
			getTrainList(){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					this.$Request.get(`/appCollectsController.do?getTrainList&memberId=${memberId}&page=${this.page}&type=1&collectsName=${this.changeValue}&organizeId=${this.organizeId}`)
					.then(res => {
						this.code = res.code
						this.trainInfo = res.data
						let scrollTopList = []
						res.data.organizeList && res.data.organizeList.forEach(item => {
							scrollTopList.push({
								id: item.id,
								groupName:item.organizeName
							})
						})
						scrollTopList.unshift({
							id: '',
							groupName:'全部'
						})
						this.scrollTopList = scrollTopList
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
					this.status = 'noMore'
					uni.showModal({
					    title: '提示',
					    content: '您尚未登录，是否去登录？',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url:'/pages/loginAll/login'
					            })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			gotoListDetail(item){
				uni.navigateTo({
					url: `/pages/train/imageMemory/numEleEntry?id=${item.id}`
				})
			},
			// 收藏
			clickAttention(item, index){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					let collectsId = item.id
					this.$Request.get(`/appAttentionController.do?takeCollectsAttention&memberId=${memberId}&collectsId=${collectsId}&organizeId=`)
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
				}else{
					this.status = 'noMore'
					uni.showModal({
					    title: '提示',
					    content: '您尚未登录，是否去登录？',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url:'/pages/loginAll/login'
					            })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			gotoUrl(url){
				uni.navigateTo({
					url: url
				})
			},
			tabChange(item, index){
				this.page = 1;
				this.trainInfo = {};
				this.collectsList = []
				this.currentTopTab = index
				this.organizeId = item.id
				this.getTrainList()
			},
			bindNameInput(e){
				this.changeValue = e.target.value
				this.trainInfo = {};
				this.collectsList = []
				this.page = 1;
				this.getTrainList()
			},
			clickSearch(){
				this.trainInfo = {};
				this.collectsList = []
				this.page = 1;
				this.getTrainList()
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
		.wrap-select{
		  width: 100%;
		  height:70rpx;
		  line-height: 70rpx;
		  background:rgba(245,245,245,1);
		  border-radius:34rpx;
		  position: relative;
		  padding: 0 37rpx;
		  box-sizing: border-box;
		  margin-bottom: 20rpx;
		  margin-top: 20rpx;
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
