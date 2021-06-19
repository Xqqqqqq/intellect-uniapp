<template>
	<view class="img-sort">
		<view class="select-box-content">
			<view class="box-content-li" :class="{'box-content-li-click':sortProblemList.find(it => it.problemId === item.id)}"
			v-for="(item,index) in topList" :key="index" @click="clickTop(item, index)">
				<view v-if="allData.startGroupVoList[page.pageNum].showType == '1'">{{item.problemName}}</view>
				<image v-else :src="item.problemPic"></image>
			</view>
		</view>
		<view class="select-box-title">点击以上图片从大到小排序：</view>
		<view class="select-box-content">
			<view class="box-content-li"
			 v-for="(item,index) in bottomList" :key="index" @click="clickBottom(item, index)">
				<image v-if="allData.startGroupVoList[page.pageNum].showType == '1'" :src="item.answerPic"></image>
				<view v-else>{{item.answerName}}</view>
				<image v-if="allData.startGroupVoList[page.pageNum].showType != '1' && sortProblemList.length > 0 && sortProblemList.filter(it => it.answerId === item.id).length > 0" class="box-right-li-img" :src="sortProblemList.find(it => it.answerId === item.id).problemPic"></image>
				<view v-if="allData.startGroupVoList[page.pageNum].showType == '1' && sortProblemList.length > 0 && sortProblemList.filter(it => it.answerId === item.id).length > 0" class="box-right-li-num">{{sortProblemList.find(it => it.answerId === item.id).problemName}}</view>
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
				sortProblemList: this.problemList
			};
		},
		watch: {
			page: {
				handler(val, oval) {
					this.topList = this.allData.startGroupVoList[val.pageNum].startProblemVoList
					this.bottomList = this.allData.startGroupVoList[val.pageNum].startAnsweroList
				},
				immediate: true,
				deep: true
			},
		},
		mounted(){
			this.topList = this.allData.startGroupVoList[this.page.pageNum].startProblemVoList
			this.bottomList = this.allData.startGroupVoList[this.page.pageNum].startAnsweroList
		},
		methods:{
			clickTop(item, index){
				if(this.sortProblemList.length > 0){
					const lastProblemItem = this.sortProblemList[this.sortProblemList.length-1]
					if (lastProblemItem.answerId === '' && lastProblemItem.problemId !== item.id){
						uni.showToast({
						    title: '请选择答案！',
							icon: 'none',
						    duration: 2000
						});
						return
					}
				}
				const problemIdList = this.sortProblemList.map(it => it.problemId)
				if(problemIdList.includes(item.id)){
					this.sortProblemList = this.sortProblemList.filter(it => it.problemId !== item.id)
				}else{
					const newProblem = {
						answerId: '',
						problemId: item.id,
						problemName: item.problemName,
						problemPic: item.problemPic
					}
					this.sortProblemList.push(newProblem)
				}
				this.$emit('clickSortTop', this.sortProblemList)
			},
			clickBottom(item, index){
				const lastProblemItem = this.sortProblemList[this.sortProblemList.length-1]
				if (this.sortProblemList.length > 0 && lastProblemItem.problemName) {
					if(this.sortProblemList.length == 1 && this.sortProblemList[0].answerId == item.id){
						this.sortProblemList = []
						this.$emit('clickSortBottom', this.sortProblemList)
						return
					}
					this.sortProblemList.forEach((it,ind) => {
						if (it.answerId === item.id) {
							it.answerId = ''
						}
						if (ind === this.sortProblemList.length - 1) {
							it.answerId = item.id
						}
					})
					this.sortProblemList = this.sortProblemList.filter(it => it.answerId !== '')
					this.$emit('clickSortBottom', this.sortProblemList)
				}else {
					uni.showToast({
					    title: '请选择问题！',
						icon: 'none',
					    duration: 2000
					});
				}
			},
		}
	}
</script>

<style lang="scss">
.img-sort{
	width: 100%;
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
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			font-weight: bold;
			font-size: 50rpx;
			position: relative;
			image{
				width: 220rpx;
				height: 100%;
				margin: auto;
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
		.box-content-li-click{
			opacity: 0.5;
			background-color: rgba(0, 0, 0, 0.3);
		}
		&:after{
			content: '';
			width: 33%;
		}
	}
}
</style>
