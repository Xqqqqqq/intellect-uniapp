<template>
	<view class="img-pair-box">
		<view class="pair-box-left">
			<view class="box-left-title" v-html="allData.startGroupVoList[page.pageNum].problemType == '1' ? '元素' : '图片'"></view>
			<view class="box-left-li" :class="{'box-left-li-click':pairProblemList.filter(it => it.problemId === item.id).length > 0}"
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
				<image v-if="allData.startGroupVoList[page.pageNum].problemType != '1' && pairProblemList.length > 0 && pairProblemList.filter(it => it.answerId === item.id).length > 0" class="box-right-li-img" :src="pairProblemList.find(it => it.answerId === item.id).problemPic"></image>
				<view v-if="allData.startGroupVoList[page.pageNum].problemType == '1' && pairProblemList.length > 0 && pairProblemList.filter(it => it.answerId === item.id).length > 0" class="box-right-li-num">{{pairProblemList.find(it => it.answerId === item.id).problemName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			page:{
				type:Object,
				default: {
					pageNum: 0,
					examNum: 10,
					examTime: null,
				}
			},
			allData:{
				type:Object,
				default: {}
			},
			problemList:{
				type:Array,
				default: []
			}
		},
		data() {
			return {
				leftList:[],
				rightList:[],
				pairProblemList: this.problemList
			};
		},
		mounted(){
			this.leftList = this.allData.startGroupVoList[this.page.pageNum].startProblemVoList
			this.rightList = this.allData.startGroupVoList[this.page.pageNum].startAnsweroList
		},
		methods:{
			clickLeft(item, index){
				if (this.pairProblemList.length > 0) {
					const lastProblemItem = this.pairProblemList[this.pairProblemList.length - 1] 
					if (lastProblemItem.answerId === '' && lastProblemItem.problemId !== item.id) {
						uni.showToast({
						    title: '请选择答案！',
							icon: 'none',
						    duration: 2000
						});
						return
					}	
				}
				const problemIdList = this.pairProblemList.map(it => it.problemId)
				if (problemIdList.includes(item.id)) {
					this.pairProblemList = this.pairProblemList.filter(it => it.problemId !== item.id)
				} else {
					const newProblem = {
						answerId: '',
						problemId: item.id,
						problemName: item.problemName,
						problemPic: item.problemPic
					}
					this.pairProblemList.push(newProblem)
				}
				this.$emit('clickPairLeft', this.pairProblemList)
			},
			clickRight(item, index){
				if (this.pairProblemList.length > 0) {
					if (this.pairProblemList.length === 1 && this.pairProblemList[0].answerId === item.id) {
						this.pairProblemList = []
					}
					// 情况1：不切换
					// if (this.pairProblemList.find(it => it.answerId === item.id)) {
					// 	this.pairProblemList = this.pairProblemList.filter(it => it.answerId !== item.id)
					// } else {
					// 	this.pairProblemList.forEach((it, ind) => {
					// 		if (ind === this.pairProblemList.length - 1) {
					// 			if (it.answerId === '') {
					// 				it.answerId = item.id
					// 			}
					// 		}
					// 	})
					// }
					
					// 情况2：切换
					this.pairProblemList.forEach((it, ind) => {
						if (it.answerId === item.id) {
							it.answerId = ''
						}
						if (ind === this.pairProblemList.length - 1) {
							it.answerId = item.id
						}
					})
					this.pairProblemList = this.pairProblemList.filter(it => it.answerId !== '')
					this.$emit('clickPairRight', this.pairProblemList)
				}
			},
		}
	}
</script>

<style lang="scss">
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
</style>
