<template>
	<view class="img-test">
		<view class="img-test-box">
			<view class="img-test-title">训练规则说明</view>
			<view class="img-test-content">
				记忆元素混入对应的文章里，在阅读的同时集中注意力记忆相关元素，练习后参与测试的环节有相关的记忆元素问题提问。
				<text>\n（1）训练环节：阅读记忆环节。\n</text>
				<text>（2）测试环节：答题回忆环节。\n</text>
				第一阶段有限时，进入第二阶段将无法返回第一阶段。
			</view>
			
			<view class="img-test-title">训练设置</view>
			<view class="img-test-content">
				<picker @change="bindTypeChange" :value="typeIndex" :range="typeArr" range-key="name">
					<view class="test-content-picker">
						<view class="content-picker-left">训练文章</view>
						<view class="content-picker-right">{{typeArr[typeIndex].name}} ></view>
					</view>
				</picker>
				<view class="test-content-line"></view>
				<picker @change="bindTypeChange" :value="typeIndex" :range="typeArr" range-key="name">
					<view class="test-content-picker">
						<view class="content-picker-left">文章难度</view>
						<view class="content-picker-right">{{typeArr[typeIndex].name}} ></view>
					</view>
				</picker>
				<view class="test-content-line"></view>
				<picker @change="bindTypeChange" :value="typeIndex" :range="typeArr" range-key="name">
					<view class="test-content-picker">
						<view class="content-picker-left">问题个数</view>
						<view class="content-picker-right">{{typeArr[typeIndex].name}} ></view>
					</view>
				</picker>
				<view class="test-content-line"></view>
				<picker @change="bindSecondChange" :value="secondIndex" :range="secondArr" range-key="name">
					<view class="test-content-picker">
						<view class="content-picker-left">训练时限</view>
						<view class="content-picker-right">{{secondArr[secondIndex].name}} ></view>
					</view>
				</picker>
			</view>
			
			<view class="img-test-title">历史成绩</view>
			<view class="img-test-content">
				<view class="img-test-ul">
					<view class="img-test-ul-li">
						<view>20200909-13:00</view>
						<view>答题：100</view>
						<view>分数：100</view>
					</view>
					<view class="img-test-ul-title">超级记忆片段节选</view>
					<view class="img-test-ul-li">
						<view>20200909-13:00</view>
						<view>答题：30</view>
						<view>分数：100</view>
					</view>
					<view class="img-test-ul-title">超级记忆片段节选</view>
					<view class="img-test-ul-li">
						<view>20200909-13:00</view>
						<view>答题：100</view>
						<view>分数：100</view>
					</view>
					<view class="img-test-ul-title">超级记忆片段节选</view>
					<view class="img-test-ul-li">
						<view>20200909-13:00</view>
						<view>答题：100</view>
						<view>分数：100</view>
					</view>
					<view class="img-test-ul-title">超级记忆片段节选</view>
				</view>
			</view>
		</view>
		
		<view class="img-test-btn-clone"></view>
		<view class="img-test-btn">
			<view class="test-btn-li test-btn-li-blue" @click="gotoUrl">开始考试</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				secondArr:[{
					id: 1,
					name: '25秒'
				},{
					id: 2,
					name: '不读秒'
				},],
				secondIndex: 0,
				typeArr:[{
					id: 1,
					name: '数图配对'
				},{
					id: 2,
					name: '数图单选'
				},{
					id: 3,
					name: '数图计算'
				},{
					id: 4,
					name: '数图排序'
				},],
				typeIndex: 0,
			};
		},
		methods:{
			bindSecondChange(e){
				this.secondIndex = e.detail.value
			},
			bindTypeChange(e){
				this.typeIndex = e.detail.value
			},
			gotoUrl(){
				uni.navigateTo({
					url: '/pages/train/methodTraining/trainingLink'
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
			text{
				color: $uni-color-error;
			}
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
				.img-test-ul-title{
					font-size: 40rpx;
					text-align: center;
					width: 100%;
					line-height: 80rpx;
					color: #333333;
					font-weight: bold;
				}
			}
		}
	}
	.img-test-btn-clone{
		width: 100%;
		height: 50rpx;
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
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 30rpx;
		}
		.test-btn-li-gray{
			background-color: #D3D3D3;
			color: #666666;
		}
		.test-btn-li-blue{
			background-color: $uni-color-primary;
		}
	}
}
</style>
