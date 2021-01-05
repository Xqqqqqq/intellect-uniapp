<template>
	<view class="train">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li">
					<view class="top-box-li-title">本月</view>
					<view class="top-box-li-num">30次</view>
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
			<my-list :myList="listdetial" @gotoUrl="gotoListDetail"></my-list>
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
					categories: ['英语词根', '少儿基础', '法律元素', '数字图像', '英文前缀'],
					series: [{
						name: '英语词根',
						// color: '#ffffff',
						data: [90, 110, 165, 195, 187]
					}, {
						name: '少儿基础',
						data: [190, 210, 105, 35, 27]
					}, {
						name: '法律元素',
						data: [10, 20, 100, 35, 27]
					}, {
						name: '数字图像',
						data: [101, 220, 140, 39, 50]
					}, {
						name: '英文前缀',
						data: [122, 320, 70, 300, 200]
					}]
				},
				listdetial:[{
					src:'../../static/img/icons/common.jpg',
					title: '数字图像记忆',
					source: '官方',
					person: '100',
					detail: '简介：针对0~100的数字进行图像',
					date: '2020-10-10',
					num: 20
				},{
					src:'../../static/img/icons/common.jpg',
					title: '数字图像记忆',
					source: '官方',
					person: '100',
					detail: '简介：针对0~100的数字进行图像',
					date: '2020-10-10',
					num: 20
				}],
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
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
			showRadar(canvasId,chartData){
				canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize:11,
					legend:{show:true},
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
							max: 200//雷达数值的最大值
						}
					}
				});
			},
			gotoListDetail(item){
				console.log(item)
			}
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
