<template>
	<view class="account">
		<button class="account-li" @click="gotoChange">
			<view class="account-li-left">手机号绑定</view>
			<view class="account-li-content">13688888888</view>
			<view class="account-li-right">更换 ></view>
		</button>
		<button class="account-li" v-if="!clickOk" @click="clickProvider">
			<view class="account-li-left">微信授权绑定</view>
			<view class="account-li-content">13688888888</view>
			<view class="account-li-right">更换 ></view>
		</button>
		<button class="account-li" open-type="getUserInfo" lang="zh_CN" @getuserinfo="loginForProvider" v-else>
			<view class="account-li-left">微信授权绑定</view>
			<view class="account-li-content">13688888888</view>
			<view class="account-li-right">更换 ></view>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clickOk: false,
			};
		},
		methods:{
			gotoChange(){
				uni.navigateTo({
					url: '/pages/loginAll/changePhone'
				})
			},
			clickProvider(){
				let vm = this
				uni.showModal({
				    title: '提示',
				    content: '是否确定更换绑定的微信号？',
				    success: function (res) {
				        if (res.confirm) {
				            vm.clickOk = true
							vm.loginForProvider()
				        } else if (res.cancel) {
				            vm.clickOk = false
				        }
				    }
				});
			},
			loginForProvider(){
				var vm = this;
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
				        if (~res.provider.indexOf('weixin')) {
				        	uni.login({
				        		provider: 'weixin',
				        		success: function(loginRes) {
									console.log(loginRes)
				        			vm.authorization = loginRes.code // 获取code
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
										  console.log(info);
										},
										fail: () => {
										  uni.showToast({title:"微信登录授权失败",icon:"none"});
										}
									  })
				        		},
				        		fail(err) {
				        			uni.showToast({
				        				title: '授权失败！',
				        				icon: 'none'
				        			});
				        		}
				        	});
				        }else{
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon:"none"
							});
						}
				    }
				});
			},
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
			width: 230rpx;
			text-align: left;
		}
		.account-li-content{
			color: $uni-color-primary;
			flex: 1;
			text-align: left;
		}
		.account-li-right{
			color: #666;
			font-size: 26rpx;
			text-align: right;
		}
	}
}
</style>
