<template>
	<view class="discover">
		<view class="discover-top">
			<view class="wrap-select">
			  <input @input="bindNameInput" v-model="articleName" 
			  type="text" placeholder="请输入搜索内容" placeholder-class="input-placeholder" class="input-length"/>
			  <view class="search-icon" @click="clickSearch">
			    <image src="../../static/img/icons/search.png"></image>
			  </view>
			</view>
			<my-scrollX
			:scrollList="scrollTopList" :currentTab="currentTopTab"
			:beforeColor="beforeColor" :afterColor="afterColor" @tabChange="tabChange"></my-scrollX>
		</view>
		
		<view class="discover-ul">
			<view class="discover-ul-li" @click="gotoUrl(item)" v-for="(item, index) in articleList" :key="index">
				<view class="ul-li-left">
					<image :src='item.articleImg'></image>
					<view class="ul-li-left-pos">{{item.typeName}}</view>
				</view>
				<view class="ul-li-right">
					<view class="li-right-title">{{item.articleTitle}}</view>
					<view class="li-right-author">作者：{{item.articleAuthor || '未知'}}</view>
					<view class="li-right-bottom">
						<view class="right-bottom-display">
							<view class="right-bottom-watch">
								<image src='../../static/img/icons/watch.png'></image>{{item.readNum || 0}}
							</view>
							<view class="right-bottom-watch" @click.stop="clickAttention(item, index)">
								<image v-if="item.attentionType ==1" src="../../static/img/icons/shoucang.png"></image>
								<image v-if="item.attentionType ==0" src="../../static/img/icons/star1.png"></image>
								{{item.attentionNum || 0}}
							</view>
							<view class="right-bottom-watch">
								<image src='../../static/img/icons/book.png'></image>{{item.collectsNum || 0}}
							</view>
						</view>
						<view>{{item.createDate}}</view>
					</view>
				</view>
			</view>
			<no-data v-if="status == 'noMore' && !articleList.length"></no-data>
			<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
		</view>
	</view>
</template>

<script>
	import myScrollX from '@/components/my-scrollX/my-scrollX.vue'
	export default {
		components: {
			myScrollX
		},
		data() {
			return {
				scrollTopList:[{
					typeName: '推荐',
					id: ''
				}],
				currentTopTab: 0,
				beforeColor: '#999999',
				afterColor: '#ffffff',
				articleList:[],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '- 暂时没有新内容了呢 -'
				},
				status: 'loading',
				code:'',
				memberId:'',
				typeId:'',
				articleName:'',
				page:1,
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.articleList = []
			this.scrollTopList = [{
				typeName: '推荐',
				id: ''
			}]
			uni.showLoading({
				title: '加载中'
			});
			this.getTrainList()
			uni.hideLoading();
			uni.stopPullDownRefresh()
		},
		onReachBottom(){
			this.scrollTopList = [{
				typeName: '推荐',
				id: ''
			}]
			if (this.code != '-116') {
				this.page = this.page + 1;
				this.getTrainList();
			}
		},
		onShow(){
			this.page = 1;
			this.articleList = []
			this.scrollTopList = [{
				typeName: '推荐',
				id: ''
			}]
			this.getTrainList()
		},
		methods:{
			// 获取首页数据列表
			getTrainList(){
				this.memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
				this.$Request.get('/appArticleController.do?getArticleList',{
					memberId: this.memberId,
					typeId: this.typeId,
					articleName: this.articleName,
					page: this.page
				}).then(res => {
					this.code = res.code
					this.status = 'noMore'
					this.scrollTopList = this.scrollTopList.concat(res.data.typeList).map(item => {
						return {
							...item,
							groupName: item.typeName
						}
					})
					if(res.code == 0){
						this.articleList =  [...this.articleList, ...res.data.articleList].map(item => {
							return {
								...item,
								createDate: item.createDate && item.createDate.substring(0,10)
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
			// 收藏
			clickAttention(item, index){
				let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
				let articleId = item.id
				this.$Request.get(`/appAttentionController.do?takeArticleAttention&memberId=${memberId}&articleId=${articleId}`)
				.then(res => {
					if(res.code == 0){
						this.articleList[index].attentionType = item.attentionType == 1 ? 0 : 1
						this.articleList[index].attentionNum = item.attentionType == 1 ? item.attentionNum + 1 : item.attentionNum - 1
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			bindNameInput(e){
				this.articleName = e.target.value
				console.log(e.target.value)
				this.articleList = []
				this.page = 1
				this.getTrainList()
			},
			clickSearch(){
				this.articleList = []
				this.page = 1
				this.getTrainList()
			},
			tabChange(item, index){
				this.currentTopTab = index
				this.typeId = item.id
				this.articleList = []
				this.scrollTopList = [{
					typeName: '推荐',
					id: ''
				}]
				this.page = 1
				this.getTrainList()
			},
			gotoUrl(item){
				uni.navigateTo({
					url: `/pages/discover/discoverDetail?id=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: $uni-color-bg;
}
.discover{
	width: 100%;
	margin-top: -5rpx;
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
	.discover-ul{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		.discover-ul-li{
			box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
			width: 100%;
			background: #FFFFFF;
			border-radius: 15rpx;
			padding: 25rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			.ul-li-left{
				width: 100%;
				height: 240rpx;
				border-radius: 10rpx;
				overflow: hidden;
				position: relative;
				margin-bottom: 20rpx;
				border: 1px solid #f4f4f4;
				image{
					width: 100%;
					height: 100%;
				}
				.ul-li-left-pos{
					position: absolute;
					border-radius: 0rpx 0 0 30rpx;
					top: 0;
					right: 0;
					background-color: $uni-color-warning;
					color: #FFFFFF;
					font-size: 32rpx;
					font-weight: bold;
					text-align: center;
					height: 45rpx;
					line-height: 45rpx;
					padding: 0 25rpx;
					box-sizing: border-box;
				}
			}
			.ul-li-right{
				flex: 1;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				.li-right-title{
					font-weight: bold;
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}
				.li-right-author{
					font-size: 26rpx;
					color: #666;
					margin-bottom: 25rpx;
				}
				.li-right-bottom{
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color: #999;
					.right-bottom-display{
						display: flex;
						.right-bottom-watch{
							color: #999999;
							display: flex;
							line-height: 40rpx;
							margin-right: 30rpx;
							image{
								width: 40rpx;
								height: 40rpx;
								margin-right: 10rpx;
							}
						}
					}
				}
			}
		}
	}
}
</style>
