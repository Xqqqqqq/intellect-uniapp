<template>
	<view class="train">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
		</view>
		<view class="train-line"></view>
		<view class="train-content">
			<view class="train-content-li">
				<view class="content-li-left" style="color: #dd524d; font-size: 30rpx;">总训练</view>
				<view class="content-li-right" style="color: #dd524d; font-size: 30rpx;">17次</view>
			</view>
			<view class="train-content-li">
				<view class="content-li-left">记忆力</view>
				<view class="content-li-right">3次</view>
			</view>
			<view class="train-content-li">
				<view class="content-li-left">注意力</view>
				<view class="content-li-right">5次</view>
			</view>
		</view>
		<view class="train-btn">切换展示项</view>
		<view class="train-btn-clone"></view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaRadar=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				chartData: {
					categories: ['记忆力', '注意力', '观察力', '思维力', '想象力'],
					series: [{
						name: '记忆力',
						// color: '#ffffff',
						data: [90, 110, 165, 195, 187]
					}, {
						name: '注意力',
						data: [190, 210, 105, 35, 27]
					}, {
						name: '观察力',
						data: [10, 20, 100, 35, 27]
					}, {
						name: '思维力',
						data: [101, 220, 140, 39, 50]
					}, {
						name: '想象力',
						data: [122, 320, 70, 300, 200]
					}]
				}
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
	.train-line{
		width: 100%;
		height: 40rpx;
		background-color: $uni-color-bg;
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
		background-color: #FFFFFF;
		padding: 0 50rpx;
		box-sizing: border-box;
		.train-content-li{
			height: 100rpx;
			line-height: 100rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px dashed rgba(86, 86, 86, .3);
			padding: 0 10rpx;
			box-sizing: border-box;
			&:last-child{
				border-bottom: none;
			}
			.content-li-left{
				color: $uni-text-color;
				font-size: 26rpx;
				font-weight: bold;
			}
			.content-li-right{
				color: $uni-color-primary;
				font-size: 28rpx;
			}
		}
	}
	.train-btn{
		width: 80%;
		height: 90rpx;
		line-height: 90rpx;
		background: linear-gradient(90deg, #378DFF,#5BC0FF);
		border-radius: 45rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 3%;
		text-align: center;
		font-weight: bold;
	}
	.train-btn-clone{
		width: 100%;
		height: 90rpx;
		margin-bottom: 8%;
	}
}
</style>
