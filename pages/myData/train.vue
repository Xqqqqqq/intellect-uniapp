<template>
	<view class="train">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li">
					<view class="top-box-li-title">本月</view>
					<view class="top-box-li-num">{{trainInfo.num}}次</view>
				</view>
			</view>
			<view class="wrap-top-tip">碎片化时间训练方向</view>
		</view>
		<view class="charts-title">关键字前5分析</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
		</view>
		<view class="train-line"></view>
		<view class="charts-title" style="background-color: #F5F5F5;">月度训练排行</view>
		<view class="train-content">
			<my-list :myList="collectsList" @gotoUrl="gotoListDetail" @clickAttention="clickAttention"></my-list>
			<no-data v-if="status == 'noMore' && !collectsList.length"></no-data>
			<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import MyList from '@/components/my-list/my-list.vue'
	var _self;
	var canvaRadar=null;
	export default {
		components: {
			MyList,
		},
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				chartData: {
					categories: [],
					series: [{
						data: []
					}, ]
				},
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
				memberId: '',
			}
		},
		onLoad() {
			_self = this;
			this.memberId = JSON.parse(uni.getStorageSync('userInfo')).id
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			// this.getServerData();
			this.getTrainList()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.trainInfo = {};
			this.collectsList = []
			this.chartData.categories = []
			this.chartData.series[0].data = []
			uni.showLoading({
				title: '加载中'
			});
			this.getTrainList()
			uni.hideLoading();
		},
		onReachBottom(){
			if (this.code != '-116') {
				this.page = this.page + 1;
				this.chartData.categories = []
				this.chartData.series[0].data = []
				this.getTrainList();
			}
		},
		methods: {
			// 获取本月训练数据列表
			getTrainList(){
				let _self = this
				this.$Request.get(`/appCollectsController.do?getMonthCollectsList&memberId=${this.memberId}&page=${this.page}`)
				.then(res => {
					this.code = res.code
					this.trainInfo = res.data
					res.data.labelList.forEach(item => {
						this.chartData.categories.push(item.labelName)
						this.chartData.series[0].data.push(item.labelNum)
					})
					_self.showRadar("canvasRadar",this.chartData)
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
			showRadar(canvasId,chartData){
				canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						radar: {
							max: 100//雷达数值的最大值
						}
					}
				});
			},
			// 收藏
			clickAttention(item, index){
				let collectsId = item.id
				this.$Request.get(`/appAttentionController.do?takeCollectsAttention&memberId=${this.memberId}&collectsId=${collectsId}`)
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
			gotoListDetail(item){
				// console.log('1',item)
				uni.navigateTo({
					url: `/pages/train/imageMemory/numEleEntry?id=${item.id}`
				})
			},
			getServerData(){
				let _self = this
				let Radar={categories:[],series:[]};
				Radar.categories= _self.chartData.categories;
				Radar.series= _self.chartData.series;
				_self.showRadar("canvasRadar",Radar);
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data:{
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data)
				// 		let Radar={categories:[],series:[]};
				// 		Radar.categories=res.data.data.Radar.categories;
				// 		Radar.series=res.data.data.Radar.series;
				// 		_self.showRadar("canvasRadar",Radar);
				// 	},
				// 	fail: () => {
				// 		_self.tips="网络错误，小程序端请检查合法域名";
				// 	},
				// });
			},
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	background-color: $uni-color-bg;
}
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.train{
	width: 100%;
	background-color: $uni-color-bg;
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
	.train-line{
		width: 100%;
		height: 40rpx;
		background-color: $uni-color-bg;
	}
	.charts-title{
		position: relative;
		color: #666;
		font-size: 32rpx;
		font-weight: bold;
		background-color: #FFFFFF;
		text-align: center;
		line-height: 100rpx;
		&:before, &:after{
			content: '';
			position: absolute;
			width: 80rpx;
			height: 3rpx;
			background-color: #666666;
			top: 50%;
			transform: translateY(-50%);
		}
		&:before{
			left: 23%;
		}
		&:after{
			right: 23%;
		}
	}
	.qiun-charts {
		width: 100%;
		height: 500rpx;
		background-color: #FFFFFF;
		padding-top: 20rpx;
		box-sizing: border-box;
		.charts {
			width: 100%;
			height: 500rpx;
			background-color: #FFFFFF;
		}
	}
	.train-content{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
	}
}
</style>
