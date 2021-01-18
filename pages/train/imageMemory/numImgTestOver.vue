<template>
	<view class="test-over">
		<view class="test-over-top">
			<view class="over-top-li">
				<view class="test-over-circle">
					<cmd-progress type="circle" :percent="75" :stroke-width="10" :width="120"></cmd-progress>
				</view>
				<view class="over-top-li-right">
					<view class="over-top-li-box">
						<view class="top-li-box-num">75%</view>
						<view class="top-li-box-title">正确率</view>
					</view>
					<view class="over-top-li-box">
						<view class="top-li-box-num">100</view>
						<view class="top-li-box-title">题目</view>
					</view>
				</view>
			</view>
			<view class="over-top-li">
				<view class="over-top-li-box">
					<view class="top-li-box-num">75</view>
					<view class="top-li-box-title">正确题数</view>
				</view>
				<view class="over-top-li-line"></view>
				<view class="over-top-li-box">
					<view class="top-li-box-num">25</view>
					<view class="top-li-box-title">错误题数</view>
				</view>
			</view>
		</view>
		
		<view class="test-over-content">
			<view class="over-content-title">ERROR <text>错记元素</text></view>
			<view class="over-content-box">
				<view class="content-box-li">
					<view class="box-li-left">
						<image src='../../../static/img/icons/zhongjiang.png'></image>
					</view>
					<view class="box-li-content">
						<image src="../../../static/img/icons/blue-arrow.png"></image>
					</view>
					<view class="box-li-left">1</view>
				</view>
				<view class="content-box-li">
					<view class="box-li-left">
						<image src='../../../static/img/icons/zhongjiang.png'></image>
					</view>
					<view class="box-li-content">
						<image src="../../../static/img/icons/blue-arrow.png"></image>
					</view>
					<view class="box-li-left">1</view>
				</view>
				<view class="content-box-li">
					<view class="box-li-left">
						<image src='../../../static/img/icons/zhongjiang.png'></image>
					</view>
					<view class="box-li-content">
						<image src="../../../static/img/icons/blue-arrow.png"></image>
					</view>
					<view class="box-li-left">1</view>
				</view>
			</view>
		</view>
		
		<view class="test-over-bottom">
			<view class="over-bottom-li bottom-li-green">重新测试</view>
			<view class="over-bottom-li bottom-li-yellow">前往训练</view>
			<view class="over-bottom-li bottom-li-red">回看过程</view>
		</view>
		<view class="test-over-bottom-clone"></view>
	</view>
</template>

<script>
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	export default {
		components: {
			cmdProgress
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.test-over{
	width: 100%;
	.test-over-top{
		width: 100%;
		background-color: #FFFFFF;
		padding-top: 40rpx;
		box-sizing: border-box;
		.over-top-li{
			width: 100%;
			display: flex;
			justify-content: space-around;
			padding: 0 50rpx;
			box-sizing: border-box;
			.test-over-circle{
			}
			.over-top-li-right{
				margin-bottom: 30rpx;
			}
			.over-top-li-box{
				text-align: center;
				margin-bottom: 40rpx;
				.top-li-box-num{
					color: #333333;
					font-weight: bold;
					font-size: 44rpx;
					margin-bottom: 10rpx;
				}
				.top-li-box-title{
					color: #666666;
					font-size: 24rpx;
				}
			}
			.over-top-li-line{
				width: 1rpx;
				height: 80rpx;
				border-left: 1rpx dashed #999999;
				margin-top: 2%;
			}
		}
	}
	.test-over-content{
		width: 100%;
		margin-top: 40rpx;
		.over-content-title{
			color: $uni-color-primary;
			font-size: 26rpx;
			margin-bottom: 30rpx;
			text-align: center;
			font-weight: bold;
			line-height: 1.1;
			font-style:italic;
			text {
			    display: block; /*设置为块级元素会独占一行形成上下居中的效果*/
			    font-size: 36rpx;
			    color: #666;
			    position: relative; /*定位横线（当横线的父元素）*/
			}
			text:before, text:after {
			    content: ''; /*CSS伪类用法*/
			    position: absolute;/*定位背景横线的位置*/
			    top: 52%;
			    background: #666; /*宽和高做出来的背景横线*/
			    width: 9%;
			    height: 2px;
			}
			text:before{
			    left: 28%; /*调整背景横线的左右距离*/
			} 
			text:after {
			    right: 28%;
			} 
		}
		.over-content-box{
			width: 100%;
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			.content-box-li{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 30rpx;
				.box-li-left{
					background-color: #FFFFFF;
					width: 280rpx;
					border-radius: 15rpx;
					overflow: hidden;
					text-align: center;
					height: 280rpx;
					line-height: 280rpx;
					font-weight: bold;
					font-size: 100rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.box-li-content{
					width: 50rpx;
					height: 50rpx;
					margin-top: 18%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	.test-over-bottom{
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		line-height: 100rpx;
		color: #FFFFFF;
		.over-bottom-li{
			width: 33%;
			text-align: center;
		}
		.bottom-li-green{
			background-color: $uni-text-color-grey;
		}
		.bottom-li-yellow{
			background-color: $uni-color-primary;
		}
		.bottom-li-red{
			background-color: #ED926E;
		}
	}
	.test-over-bottom-clone{
		width: 100%;
		height: 100rpx;
	}
}
</style>
