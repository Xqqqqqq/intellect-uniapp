<template>
	<view class="energy">
		<view class="energy-top">
			<view class="energy-top-num">0<text>点</text></view>
			<view class="energy-top-title">我的能量</view>
		</view>
		<view class="energy-content">
			<view class="energy-content-title">消耗记录</view>
			<view class="history-li" v-for="(item, index) in historyList" :key="index" @click="gotoDetail(item)">
				<view class="history-li-top">
					<view class="li-top-left">{{item.historyName}}</view>
					<view class="li-top-right">能量{{item.scoreValue}}</view>
				</view>
				<view class="history-li-bottom">时间：{{item.createDate}}</view>
			</view>
			<no-data v-if="status == 'noMore' && !historyList.length"></no-data>
			<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList:[],
				historyInfo: {},
				page:1,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '- 暂时没有新内容了呢 -'
				},
				status: 'loading',
				code:'',
			};
		},
		onPullDownRefresh() {
			this.page = 1;
			this.historyInfo = {};
			this.historyList = []
			uni.showLoading({
				title: '加载中'
			});
			this.getList()
			uni.hideLoading();
			uni.stopPullDownRefresh()
		},
		onReachBottom(){
			if (this.code != '-116') {
				this.page = this.page + 1;
				this.getList();
			}
		},
		onShow(){
			this.page = 1;
			this.historyInfo = {};
			this.historyList = []
			this.getList()
		},
		methods:{
			getList(){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					this.$Request.get(`/appScoreController.do?getScoreHistory&memberId=${memberId}&page=${this.page}`)
					.then(res => {
						this.code = res.code
						this.historyInfo = res.data
						this.status = 'noMore'
						if(res.code == 0){
							this.historyList =  [...this.historyList, ...res.data.historyList].map(item => {
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
		}
	}
</script>

<style lang="scss">
.energy{
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	.energy-top{
		background: url(../../static/img/icons/bj.jpg) no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 250rpx;
		border-radius: 15rpx;
		color: #FFFFFF;
		padding: 5% 15%;
		box-sizing: border-box;
		.energy-top-num{
			font-size: 70rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			text{
				font-size: 30rpx;
			}
		}
		.energy-top-title{
			font-size: 30rpx;
		}
	}
	.energy-content{
		margin-top: 20rpx;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		padding: 24rpx;
		box-sizing: border-box;
		padding-top: 40rpx;
		.energy-content-title{
			padding-left: 20rpx;
			box-sizing: border-box;
			border-left: 8rpx solid $uni-color-primary;
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			line-height: 1;
		}
		.history-li{
			width: 100%;
			background-color: #FFFFFF;
			border-bottom: 1px solid #D3D3D3;
			padding: 24rpx 0;
			box-sizing: border-box;
			.history-li-top{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				line-height: 1;
				.li-top-left{
					font-size: 32rpx;
					font-weight: bold;
					color: #444;
				}
				.li-top-right{
					font-size: 30rpx;
					font-weight: bold;
					color: $uni-color-error;
				}
			}
			.history-li-bottom{
				color: #999;
				font-size: 26rpx;
			}
		}
	}
}
</style>
