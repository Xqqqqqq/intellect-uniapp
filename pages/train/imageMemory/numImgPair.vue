<template>
	<view class="img-pair">
		<view class="img-pair-top" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="pair-top-blue">数图配对：</view>
			<view class="pair-top-red">{{page.examTime}}s</view>
			<view class="pair-top-blue">第{{page.pageNum+1}}组 / 共{{page.examNum}}组</view>
		</view>
		<view class="img-pair-box">
			<view class="pair-box-left">
				<view class="box-left-title" v-html="allData.startGroupVoList[page.pageNum].problemType == '1' ? '元素' : '图片'"></view>
				<view class="box-left-li" :class="{'box-left-li-click':problemList.filter(it => it.problemId === item.id).length > 0}"
				 v-for="(item,index) in leftList" :key="index" @click="clickLeft(item, index)">
					<view v-if="allData.startGroupVoList[page.pageNum].problemType == '1'">{{item.problemName}}</view>
					<image v-else :src="item.problemPic"></image>
				</view>
			</view>
			<view class="pair-box-right">
				<view class="box-right-title" v-html="allData.startGroupVoList[page.pageNum].problemType == '1' ? '图片' : '元素'"></view>
				<view class="box-right-li" v-for="(item,index) in rightList" :key="index" @click="clickRight(item, index)">
					<image v-if="allData.startGroupVoList[page.pageNum].problemType == '1'" :src="item.answerPic"></image>
					<view v-else>{{item.answerName}}</view>
					<image v-if="allData.startGroupVoList[page.pageNum].problemType != '1' && problemList.length > 0 && problemList.filter(it => it.answerId === item.id).length > 0" class="box-right-li-img" :src="problemList.find(it => it.answerId === item.id).problemPic"></image>
					<view v-if="allData.startGroupVoList[page.pageNum].problemType == '1' && problemList.length > 0 && problemList.filter(it => it.answerId === item.id).length > 0" class="box-right-li-num">{{problemList.find(it => it.answerId === item.id).problemName}}</view>
				</view>
			</view>
		</view>
		<view class="img-pair-btn" @click="gotoUrl">下一组</view>
	</view>
</template>

<script>
	import myData from '@/common/json/numImgPair.json'
	export default {
		data() {
			return {
				allData:{},
				leftList:[],
				rightList:[],
				leftInfo:{}, // 左侧选中数据
				rightInfo: {}, // 右侧选中数据
				problemList: [], //保存左侧菜单所有已选中的数据
				showH5: true,
				page:{
					pageNum: 0,
					examNum: 10,
					examTime: null,
				}
			};
		},
		onShow(){
			if(navigator){
				this.showH5 = true
			}else{
				this.showH5 = false
			}
			// 计时器
			console.log(myData)
			this.allData = myData.data
			this.leftList = myData.data.startGroupVoList[0].startProblemVoList
			this.rightList = myData.data.startGroupVoList[0].startAnsweroList
			this.page.examTime = myData.data.examTime
			this.page.examNum = myData.data.examNum
			const timer = setInterval(() => {
				this.page.examTime = this.page.examTime - 1;
				if (this.page.examTime === 0) {
					clearInterval(timer);
				}
			}, 1000);
		},
		methods:{
			clickLeft(item, index){
				if (this.problemList.length > 0) {
					const lastProblemItem = this.problemList[this.problemList.length - 1] 
					// 获取最后点击的元素，判断是否未选择右侧答案，如漏选则弹出提示
					if (lastProblemItem.answerId === '' && lastProblemItem.problemId !== item.id) {
						uni.showToast({
						    title: '请选择答案！',
							icon: 'none',
						    duration: 2000
						});
						return
					}	
				}
				// 获取已选中的左侧元素id
				const problemIdList = this.problemList.map(it => it.problemId)
				// 如果已经有则将其过滤，没有则添加新的选中
				if (problemIdList.includes(item.id)) {
					this.problemList = this.problemList.filter(it => it.problemId !== item.id)
				} else {
					const newProblem = {
						answerId: '',
						problemId: item.id,
						problemName: item.problemName,
						problemPic: item.problemPic
					}
					this.problemList.push(newProblem)
				}
			},
			clickRight(item, index){
				if (this.problemList.length > 0) {
					if (this.problemList.length === 1 && this.problemList[0].answerId === item.id) {
						this.problemList = []
					}
					// 情况1：不切换
					// if (this.problemList.find(it => it.answerId === item.id)) {
					// 	this.problemList = this.problemList.filter(it => it.answerId !== item.id)
					// } else {
					// 	this.problemList.forEach((it, ind) => {
					// 		if (ind === this.problemList.length - 1) {
					// 			if (it.answerId === '') {
					// 				it.answerId = item.id
					// 			}
					// 		}
					// 	})
					// }
					
					// 情况2：切换
					this.problemList.forEach((it, ind) => {
						if (it.answerId === item.id) {
							it.answerId = ''
						}
						if (ind === this.problemList.length - 1) {
							it.answerId = item.id
						}
					})
					this.problemList = this.problemList.filter(it => it.answerId !== '')
				}
			},
			gotoUrl(){
				uni.navigateTo({
					url: '/pages/train/imageMemory/numImgTestOver'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height: 100%;
}
.img-pair{
	width: 100%;
	height: 100%;
	padding: 80rpx 0 100rpx 0;
	box-sizing: border-box;
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: $uni-color-primary;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		.top_view {
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			background-color: $uni-color-primary;
			top: 0;
			z-index: 999;
		}
	}
	.img-pair-top{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
		display: flex;
		justify-content: space-between;
		padding: 0 24rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		.pair-top-blue{
			font-size: 28rpx;
			color: $uni-color-primary;
		}
		.pair-top-red{
			font-size: 28rpx;
			font-weight: bold;
			color: $uni-color-error;
		}
	}
	.img-pair-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		width: 100%;
		text-align: center;
		background-color: $uni-color-primary;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rpx;
		font-weight: bold;
	}
	.img-pair-box{
		width: 100%;
		display: flex;
		.pair-box-left{
			width: 34%;
			.box-left-title{
				width: 100%;
				background-color:$uni-color-primary;
				color: #FFFFFF;
				font-size: 36rpx;
				text-align: center;
				line-height: 80rpx;
			}
			.box-left-li{
				width: 100%;
				height: 230rpx;
				background-color: #FFFFFF;
				text-align: center;
				color: #333333;
				font-weight: bold;
				font-size: 70rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				border-bottom: 1px solid #D3D3D3;
			}
			.box-left-li-click{
				background-color: rgba(0,0,0,.3);
				opacity: 0.5;
			}
		}
		.pair-box-right{
			width: 66%;
			overflow: hidden;
			.box-right-title{
				width: 100%;
				background-color:$uni-text-color-disable;
				color: $uni-color-primary;
				font-size: 36rpx;
				text-align: center;
				line-height: 80rpx;
			}
			.box-right-li{
				width: 50%;
				height: 230rpx;
				border: 1px solid #D3D3D3;
				background-color: #FFFFFF;
				float: left;
				position: relative;
				text-align: center;
				color: #333333;
				font-weight: bold;
				font-size: 70rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				image{
					width: 100%;
					height: 100%;
				}
				.box-right-li-num{
					position: absolute;
					left: 0;
					top: 0;
					font-weight: 60rpx;
					background-color: rgba(75, 149, 230, .5);
					font-weight: bold;
					width: 100%;
					height: 100%;
					color: #FFFFFF;
					text-align: center;
					line-height: 200rpx;
					font-size: 80rpx;
				}
				.box-right-li-img{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					opacity: 0.6;
				}
			}
		}
	}
}
</style>
