<template>
	<view class="img-test">
		<uni-nav-bar left-icon="back" title="数字元素测试" @clickLeft="gotoTest"
		statusBar="true" fixed="true" backgroundColor="#2E3B67" color="#ffffff"></uni-nav-bar>
		<view class="img-test-top">
			<view class="test-top-li">
				<view class="test-top-li-title">上次成绩</view>
				<view class="test-top-li-num">{{historyInfo.lastScore || 0}}</view>
			</view>
			<view class="test-top-li">
				<view class="test-top-li-title">参与次数</view>
				<view class="test-top-li-num">{{historyInfo.examTimes || 0}}</view>
			</view>
			<view class="test-top-li">
				<view class="test-top-li-title">最好成绩</view>
				<view class="test-top-li-num">{{historyInfo.bestScore || 0}}</view>
			</view>
		</view>
		<view class="img-test-box">
			<view class="img-test-title">测试规则说明</view>
			<view class="img-test-content">
				共1~100个数字及对应的图片，元素选图片和图片选元素两种形式随机出现选出答案，共8组。
			</view>
			
			<view class="img-test-title">考试设置</view>
			<view class="img-test-content">
				<picker @change="bindSecondChange" :value="secondIndex" :range="secondArr" range-key="name">
					<view class="test-content-picker">
						<view class="content-picker-left">是否读秒</view>
						<view class="content-picker-right">{{secondArr[secondIndex].name}} ></view>
					</view>
				</picker>
				<view class="test-content-line"></view>
				<picker @change="bindTypeChange" :value="typeIndex" :range="typeArr" range-key="name">
					<view class="test-content-picker">
						<view class="content-picker-left">测试形式</view>
						<view class="content-picker-right">{{typeArr[typeIndex].name}} ></view>
					</view>
				</picker>
				<view class="test-content-line"></view>
				<picker @change="bindNumChange" :value="numIndex" :range="numArr" range-key="name">
					<view class="test-content-picker">
						<view class="content-picker-left">题目个数</view>
						<view class="content-picker-right">{{numArr[numIndex].name}} ></view>
					</view>
				</picker>
			</view>
		</view>
		
		<view class="img-test-btn-clone"></view>
		<view class="img-test-btn">
			<view class="test-btn-li test-btn-li-blue" @click="gotoUrl">
				开始测试
				<view class="test-btn-li-text">(首次开通需消耗1点能量)</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				secondArr:[{
					id: 0,
					name: '不读秒'
				},{
					id: 5,
					name: '5秒/题'
				},{
					id: 10,
					name: '10秒/题'
				},{
					id: 15,
					name: '15秒/题'
				},],
				secondIndex: 0,
				typeArr:[{
					id: 1,
					name: '数图配对',
				},{
					id: 2,
					name: '数图单选',
				},{
					id: 3,
					name: '数图计算',
				},{
					id: 4,
					name: '数图排序',
				},{
					id: 5,
					name: '混合模式',
				},],
				typeIndex: 0,
				numArr:[{
					id: 8,
					name: '8题',
				},{
					id: 16,
					name: '16题',
				},{
					id: 32,
					name: '32题',
				},],
				numIndex: 0,
				optionInfo:{
					collectsId: '702aa38151aef50c0151aef50c2600cc',
					time: '',
					type: '',
					num: ''
				},// 所有从前一个页面传过来的数据（需要传给后台的数据）
				historyInfo:{},
			};
		},
		onLoad(option){
			console.log(option.collectsId)
			if(option){
				this.optionInfo.collectsId = option.collectsId
			}
			this.optionInfo.time = this.secondArr[0].id
			this.optionInfo.type = this.typeArr[0].id
			this.optionInfo.num = this.numArr[0].id
			this.getExaminationHistory()
		},
		methods:{
			// 获取历史训练数据
			getExaminationHistory(){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					this.$Request.get('/appExaminationController.do?getExaminationHistory',{
						page:1,
						memberId:memberId,
						collectsId: this.optionInfo.collectsId
					}).then(res => {
						this.historyInfo = res.data
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
			gotoTest(){
				uni.redirectTo({
					url: `/pages/train/imageMemory/numEleEntry?id=${this.optionInfo.collectsId}`
				})
			},
			bindSecondChange(e){
				this.secondIndex = e.detail.value
				this.optionInfo.time = this.secondArr[e.detail.value].id
			},
			bindTypeChange(e){
				this.typeIndex = e.detail.value
				this.optionInfo.type = this.typeArr[e.detail.value].id
			},
			bindNumChange(e){
				this.numIndex = e.detail.value
				this.optionInfo.num = this.numArr[e.detail.value].id
			},
			gotoUrl(){
				console.log('点击按钮')
				// console.log(this.optionInfo)
				uni.setStorageSync('optionInfo', this.optionInfo)
				uni.navigateTo({
					url: '/pages/train/imageMemory/numImgAll'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.img-test{
	width: 100%;
	margin-top: -5rpx;
	.img-test-top{
		display: flex;
		justify-content: space-around;
		width: 100%;
		background-color: $uni-color-primary;
		padding: 50rpx 0;
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
	.img-test-box{
		width: 100%;
		padding: 50rpx 24rpx;
		box-sizing: border-box;
		.img-test-title{
			width: 100%;
			padding-left: 15rpx;
			border-left: 5rpx solid $uni-color-primary;
			color: $uni-color-primary;
			font-size: 32rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
		.img-test-content{
			width: 100%;
			background-color: rgba(75,149,230,.2);
			border-radius: 15rpx;
			padding: 25rpx;
			box-sizing: border-box;
			color: #666666;
			line-height: 45rpx;
			font-size: 26rpx;
			margin-bottom: 40rpx;
			.test-content-line{
				height: 1rpx;
				width: 100%;
				border-bottom: 1rpx dashed #FFFFFF;
			}
			.test-content-picker{
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding: 0 10rpx;
				box-sizing: border-box;
				height: 80rpx;
				line-height: 80rpx;
				.content-picker-left{
					color: #333333;
				}
				.content-picker-right{
					color:$uni-color-primary;
					font-weight: bold;
				}
			}
			.img-test-ul{
				width: 100%;
				.img-test-ul-li{
					width: 100%;
					display: flex;
					justify-content: space-between;
					color: #666666;
					font-size: 26rpx;
					height: 70rpx;
					line-height: 70rpx;
					view:nth-child(2n){
						width: 20%;
					}
				}
				// .img-test-ul-li:nth-child(2n){
				// 	color: $uni-color-primary;
				// }
			}
		}
	}
	.img-test-btn-clone{
		width: 100%;
		height: 100rpx;
	}
	.img-test-btn{
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		.test-btn-li{
			width: 100%;
			text-align: center;
			color: #FFFFFF;
			font-size: 30rpx;
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			padding: 10rpx 0;
			box-sizing: border-box;
		}
		.test-btn-li-gray{
			background-color: #D3D3D3;
			color: #666666;
		}
		.test-btn-li-blue{
			background-color: $uni-color-primary;
			.test-btn-li-text{
					font-size: 26rpx;
			}
		}
	}
}
</style>
