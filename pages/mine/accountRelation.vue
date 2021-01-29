<template>
	<view class="account">
		<view class="account-li" @click="gotoChange">
			<view class="account-li-left">手机号绑定</view>
			<view class="account-li-content">13688888888</view>
			<view class="account-li-right">更换 ></view>
		</view>
		<view class="account-li">
			<view class="account-li-left">微信授权绑定</view>
			<view class="account-li-content">13688888888</view>
			<view class="account-li-right">更换 ></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gotoChange(){
				uni.navigateTo({
					url: '/pages/loginAll/changePhone'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	
}
.account{
	width: 100%;
	.account-li{
		display: flex;
		justify-content: space-between;
		padding: 0 24rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #d3d3d3;
		font-size: 30rpx;
		background-color: #FFFFFF;
		font-weight: bold;
		.account-li-left{
			color: #333333;
			width: 200rpx;
		}
		.account-li-content{
			color: $uni-color-primary;
			flex: 1;
		}
		.account-li-right{
			color: #666;
			font-size: 26rpx;
		}
	}
}
</style>
