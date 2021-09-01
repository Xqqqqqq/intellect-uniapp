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
			<my-list :myList="collectsList" @gotoUrl="gotoListDetail" @clickAttention="clickAttention"></my-list>
			<no-data v-if="status == 'noMore' && !collectsList.length"></no-data>
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
				scrollTopList:[],
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
					}],
					[{
						text: '全部类型',
						value: 0
					}, {
						text: '推荐类型',
						value: 1
					}]
				],
				defaultIndex: [0, 0, 0, 0],
				trainInfo:{},
				collectsList:[],
				page:1,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '- 暂时没有新内容了呢 -'
				},
				status: 'loading',
				parameterInfo:{
					groupId: '', //组别id（选填）
					orderType:0, //排序类型1收藏逆序2收藏正序0默认时间倒序
					vipType:3, //vip类型1vip2消耗能量0免费3全
					attentionType:0,//收藏类型1已收藏2未收藏0全部
					recommendType:0, //推荐类型1推荐0全部
					collectsName: '',
				}, //初始化值
				code:'',
				organizeId: '',//分组id
			};
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
		methods:{
			// 获取训练数据列表
			getTrainList(){
				let memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
				this.$Request.get('/appCollectsController.do?getCollectsList&type=1',{
					...this.parameterInfo,
					page:this.page,
					memberId:memberId
				}).then(res => {
					this.trainInfo = res.data
					res.data.groupList.unshift({
						id:'',
						groupName: '全部'
					})
					this.scrollTopList = res.data.groupList
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
			},
			tabChange(item, index){
				this.page = 1;
				this.trainInfo = {};
				this.collectsList = []
				this.currentTopTab = index
				this.parameterInfo.groupId = item.id
				this.organizeId = item.id
				this.getTrainList()
			},
			onSelected(res) {
				this.page = 1;
				this.trainInfo = {};
				this.collectsList = []
				this.parameterInfo.orderType = res[0][0].value
				this.parameterInfo.vipType = res[1][0].value
				this.parameterInfo.attentionType = res[2][0].value
				this.parameterInfo.recommendType = res[3][0].value
				this.getTrainList()
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
			bindNameInput(e){
				this.parameterInfo.collectsName = e.target.value
				this.page = 1;
				this.trainInfo = {};
				this.collectsList = []
				this.getTrainList()
			},
			clickSearch(){
				this.page = 1;
				this.trainInfo = {};
				this.collectsList = []
				this.getTrainList()
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
