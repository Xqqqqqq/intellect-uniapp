<template>
	<!-- 暂停 -->
	<view class="img-pair">
		<view class="img-pair-top" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="pair-top-blue" v-if="allData.startGroupVoList[page.pageNum].groupType == 1">数图配对</view>
			<view class="pair-top-blue" v-if="allData.startGroupVoList[page.pageNum].groupType == 2">数图单选</view>
			<view class="pair-top-blue" v-if="allData.startGroupVoList[page.pageNum].groupType == 3">数图计算</view>
			<view class="pair-top-blue" v-if="allData.startGroupVoList[page.pageNum].groupType == 4">数图排序</view>
			<view class="pair-top-blue" v-if="allData.startGroupVoList[page.pageNum].groupType == 5">混合模式</view>
			<view class="pair-top-blue">第{{page.pageNum+1}}组 / 共{{page.examNum}}组</view>
		</view>
		<numImgPair v-if="allData.startGroupVoList[page.pageNum].groupType == 1" :page="page" :allData="allData" :problemList="problemList"></numImgPair>
		<numImgSelect v-if="allData.startGroupVoList[page.pageNum].groupType == 2" :page="page" :allData="allData" :problemList="problemList"></numImgSelect>
		<numImgCount v-if="allData.startGroupVoList[page.pageNum].groupType == 3" :page="page" :allData="allData" :problemList="problemList"></numImgCount>
		<numImgSort v-if="allData.startGroupVoList[page.pageNum].groupType == 4" :page="page" :allData="allData" :problemList="problemList"></numImgSort>
		<view class="img-pair-btn" @click="clickNext">{{btnName}}</view>
	</view>
</template>

<script>
	import numImgPair from './imgComponentsRead/numImgPair.vue'
	import numImgSelect from './imgComponentsRead/numImgSelect.vue'
	import numImgCount from './imgComponentsRead/numImgCount.vue'
	import numImgSort from './imgComponentsRead/numImgSort.vue'
	export default {
		components: {
			numImgPair,
			numImgSelect,
			numImgCount,
			numImgSort
		},
		data() {
			return {
				allData:{},
				showH5: true,
				topLeftName: '数图配对',
				btnName: '下一组',
				page:{
					pageNum: 0, // 当前组数下标
					examNum: 10,
					examTime: null,
				},
				optionInfo:{
					collectsId: '402aa38151aef50c0151aef50c2600cc',
					time: 0,
					type: 3,
					num: 8
				},// 所有从前一个页面传过来的数据（需要传给后台的数据）
			};
		},
		onShow(){
			if(navigator){
				this.showH5 = true
			}else{
				this.showH5 = false
			}
			this.optionInfo = uni.getStorageSync('optionInfo')
			this.startNumExamination()
		},
		methods:{
			// 获取训练数据列表
			startNumExamination(){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					this.$Request.get('/appExaminationController.do?startNumExamination',{
						...this.optionInfo,
						memberId:memberId
					}).then(res => {
						if(res.code == 0){
							this.allData = res.data
							this.userExamTime = res.data.examTime == 0 ? '' : res.data.examTime
							this.page.examTime = this.userExamTime // 用户选择的每题时间数
							this.page.examNum = this.allData.examNum // 测试组数
							if(this.userExamTime != ''){
								const timer = setInterval(() => {
									// 倒计时
									this.page.examTime = this.page.examTime - 1;
									// 当倒计时为0时
									if (this.page.examTime === 0) {
										// console.log('allData', this.allData)
										if(Number(this.page.pageNum)+ 1 == Number(this.page.examNum)){
											console.log('所有题都答完了')
											this.btnName = '结束答题'
											let answerList = this.problemList.filter(item => item.problemId != '￥')
											console.log(answerList)
											this.takeNumExamination(answerList)
											clearInterval(timer);
										}else{
											this.problemList.push({
												answerId: '￥',
												problemId: '￥',
												problemName: '',
												problemPic: ''
											})
											this.page.pageNum += 1
											this.page.examTime = this.userExamTime
										}
									}
								}, 1000);
							}
						}else{
							uni.showToast({
								title: res.info,
								icon: 'none'
							})
						}
					})
				}else{
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
			clickProblemList(arr){
				this.problemList = arr
			},
			clickNext(){
				if(Number(this.page.pageNum)+ 1 == Number(this.page.examNum)){
					console.log('所有题都答完了')
					this.btnName = '结束答题'
					let answerList = this.problemList.filter(item => item.problemId != '￥')
					console.log(answerList)
					this.takeNumExamination(answerList)
				}else{
					this.problemList.push({
						answerId: '￥',
						problemId: '￥',
						problemName: '',
						problemPic: '',
					})
					this.page.pageNum += 1
				}
			},
			// 答题结束
			takeNumExamination(answerList){
				this.$Request.postJson('/appExaminationController.do?takeNumExamination',{
					answerList: answerList,
					id: this.allData.id
				}).then(res => {
					if(res.code == 0){
						let id = res.data.id
						uni.showToast({
							title: '提交成功，正在跳转...',
							icon: 'none'
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:`/pages/train/imageMemory/numImgTestOver?id=${id}`
							})
						},1000)
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
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
}
</style>
