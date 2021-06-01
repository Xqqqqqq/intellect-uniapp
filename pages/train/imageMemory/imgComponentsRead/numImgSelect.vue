<template>
	<view class="img-select-box">
		<view class="select-box-top" v-for="(item, index) in topList" :key="index">
			<view v-if="allData.startGroupVoList[page.pageNum].showType == '1'">{{item.problemName}}</view>
			<image v-else :src="item.problemPic" mode="widthFix"></image>
		</view>
		<view class="select-box-title" v-if="allData.startGroupVoList[page.pageNum].showType == '1'">选择元素对应图片：</view>
		<view class="select-box-title" v-else>选择图片对应元素：</view>
		<view class="select-box-content">
			<view class="box-content-li"
			v-for="(item, index) in bottomList" :key="index" @click="chooseOne(item, index)">
				<image v-if="allData.startGroupVoList[page.pageNum].showType == '1'" :src="item.answerPic"></image>
				<view v-else>{{item.answerName}}</view>
				<view v-if="currentTab == index" class="box-content-li-block"></view>
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
				topList:[],
				bottomList:[],
				selectProblemList: this.problemList,
				currentTab:-1,
			};
		},
		watch: {
			page(){
				this.currentTab = -1
				this.topList = this.allData.startGroupVoList[this.page.pageNum].startProblemVoList
				this.bottomList = this.allData.startGroupVoList[this.page.pageNum].startAnsweroList
			}
		},
		mounted(){
			this.topList = this.allData.startGroupVoList[this.page.pageNum].startProblemVoList
			this.bottomList = this.allData.startGroupVoList[this.page.pageNum].startAnsweroList
		},
		methods:{
			chooseOne(item, index){
				this.currentTab = index
				const newProblem = {
					answerId: item.id,
					problemId: this.topList[0].id,
					problemName: this.topList[0].problemName,
					problemPic: this.topList[0].problemPic
				}
				this.selectProblemList.push(newProblem)
				this.$emit('clickSelectBottom', this.selectProblemList)
			},
		}
	}
</script>

<style lang="scss">
.img-select-box{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	.select-box-top{
		width: 100%;
		height: 300rpx;
		font-size: 100rpx;
		color: #333333;
		text-align: center;
		font-weight: bolder;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		image{
			width: 350rpx;
			margin: auto;
		}
	}
	.select-box-title{
		box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
		background-color: #FFFFFF;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #333333;
		margin-bottom: 20rpx;
	}
	.select-box-content{
		display: flex;
		justify-content: space-between;
		flex-flow: wrap;
		align-content: flex-start;
		align-items: flex-start;
		.box-content-li{
			width: 33%;
			height: 220rpx;
			background-color: #FFFFFF;
			text-align: center;
			margin-bottom: 0.5%;
			position: relative;
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			font-size: 50rpx;
			font-weight: bold;
			image{
				width: 220rpx;
				height: 100%;
				margin: auto;
			}
			.box-content-li-block{
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				background-color: rgba(0, 0, 0, 0.3);
			}
		}
		&:after{
			content: '';
			width: 33%;
		}
	}
}
</style>
