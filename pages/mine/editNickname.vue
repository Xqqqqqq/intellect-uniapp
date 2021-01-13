<template>
	<view class="nickname">
		<view class="nickname-box">
			<view class="nickname-box-tip">我的昵称</view>
			<view class="nickname-input">
				<input placeholder="请输入昵称"/>
				<view class="nickname-input-btn">检测</view>
			</view>
			<view class="nickname-box-tip">*重名结果查询*</view>
			<view class="nickname-box-msg" style="color: #dd524d">有重名请重新输入</view>
			<view class="nickname-box-msg" style="color: #4cd964">暂无重名立即修改</view>
		</view>
		<view class="edit-btn">立即修改</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page{
	background-color: $uni-color-primary;
}
.nickname{
	width: 100%;
	padding-top: 40%;
	box-sizing: border-box;
	.nickname-box{
		text-align: center;
		.nickname-box-tip{
			color: #FFFFFF;
			font-size: 26rpx;
			margin-bottom: 40rpx;
		}
		.nickname-input{
			width: 80%;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			margin: auto;
			border-radius: 15rpx;
			overflow: hidden;
			margin-bottom: 60rpx;
			.nickname-input-btn{
				width: 150rpx;
				line-height: 80rpx;
				background-color: $uni-color-warning;
				text-align: center;
				color: #FFFFFF;
				font-size: 26rpx;
			}
			input{
				flex: 1;
				font-size: 26rpx;
				padding-left: 10rpx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				line-height: 80rpx;
				height: 80rpx;
				text-align: left;
			}
		}
		.nickname-box-msg{
			font-size: 26rpx;
			margin-top: 50rpx;
		}
	}
	.edit-btn{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 0;
		color: #FFFFFF;
		font-size: 36rpx;
		font-weight: bold;
		background-color: $uni-color-warning;
	}
}
</style>
