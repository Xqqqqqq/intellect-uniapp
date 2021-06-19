<template>
	<view class="history">
		<view class="history-top">
			<view class="history-top-title">{{title}}</view>
			<view class="img-test-top">
				<view class="test-top-li">
					<view class="test-top-li-title">上次成绩</view>
					<view class="test-top-li-num">{{historyInfo.lastScore}}</view>
				</view>
				<view class="test-top-li">
					<view class="test-top-li-title">参与次数</view>
					<view class="test-top-li-num">{{historyInfo.examTimes}}</view>
				</view>
				<view class="test-top-li">
					<view class="test-top-li-title">最好成绩</view>
					<view class="test-top-li-num">{{historyInfo.bestScore}}</view>
				</view>
			</view>
		</view>
		<view class="history-title">历史测试（{{historyList.length}}）</view>
		<view class="history-content" v-if="historyList.length > 0">
			<view class="history-content-li" v-for="(item, index) in historyList" :key="index">
				<view class="content-li-left">
					<view class="li-left-title">{{item.collectsName}}(测试)</view>
					<view class="li-left-detail">
						<text>测试时间：{{item.createDate}}</text>
					</view>
					<view class="li-left-detail">
						<text>题目：{{item.examNum}}</text>
						<text>时间：{{item.examTime || '无限时'}}</text>
					</view>
					<view class="li-left-detail">
						<text>模式：{{item.examTypeName}}</text>
					</view>
				</view>
				<view class="content-li-line"></view>
				<view class="content-li-right">
					<view class="li-right-top">准确率</view>
					<view class="li-right-bottom">{{item.exmScore || 0}}</view>
				</view>
			</view>
		</view>
		<no-data v-if="status == 'noMore' && !historyList.length"></no-data>
		<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				historyInfo:{},
				historyList:[],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '- 暂时没有新内容了呢 -'
				},
				status: 'loading',
				code:'',
				title:'数字元素测试',
				collectsId: '',
			};
		},
		onLoad(options){
			if(options.title){
				this.title = options.title
				this.collectsId = options.collectsId
			}
		},
		onShow(){
			this.page = 1;
			this.historyInfo = {};
			this.historyList = []
			this.getExaminationHistory()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.historyInfo = {};
			this.historyList = []
			uni.showLoading({
				title: '加载中'
			});
			this.getExaminationHistory()
			uni.hideLoading();
			uni.stopPullDownRefresh()
		},
		onReachBottom(){
			if (this.code != '-116') {
				this.page = this.page + 1;
				this.getExaminationHistory();
			}
		},
		methods:{
			// 获取历史训练数据
			getExaminationHistory(){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					this.$Request.get('/appExaminationController.do?getExaminationHistory',{
						page:this.page,
						memberId:memberId,
						collectsId: this.collectsId
					}).then(res => {
						this.code = res.code
						this.historyInfo = res.data
						this.status = 'noMore'
						if(res.code == 0){
							this.historyList =  [...this.historyList, ...res.data.examList]
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
		}
	}
</script>

<style lang="scss">
.history{
	width: 100%;
	.history-top{
		width: 100%;
		background-color: $uni-color-primary;
		text-align: center;
		padding-top: 50rpx;
		box-sizing: border-box;
		.history-top-title{
			font-size: 34rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.img-test-top{
			display: flex;
			justify-content: space-around;
			width: 100%;
			padding: 60rpx 0;
			box-sizing: border-box;
			.test-top-li{
				text-align: center;
				color: #FFFFFF;
				font-size: 34rpx;
				.test-top-li-title{
					font-weight: bold;
					font-size: 32rpx;
					margin-bottom: 30rpx;
				}
			}
		}
	}
	.history-title{
		background-color: #FFFFFF;
		line-height: 80rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: $uni-color-primary;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
	}
	.history-content{
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		.history-content-li{
			background-color: #FFFFFF;
			border-radius: 15rpx;
			box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
			padding: 24rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			width: 100%;
			.content-li-left{
				flex: 1;
				font-size: 28rpx;
				color: #666666;
				padding: 10rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
				.li-left-title{
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
					margin-bottom: 15rpx;
				}
				.li-left-detail{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 8rpx;
				}
			}
			.content-li-line{
				width: 1rpx;
				height: 150rpx;
				border-left: 1rpx dashed #999999;
				margin-top: 5%;
				margin-left: 10rpx;
			}
			.content-li-right{
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				color: $uni-color-error;
				font-weight: bold;
				font-size: 36rpx;
				padding: 45rpx 0;
				box-sizing: border-box;
				text-align: center;
				width: 25%;
				.li-right-top{
					font-weight: normal;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
