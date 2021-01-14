<template>
	<view class="mine">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="title-box">
			<view class="title-box-name">我的</view>
		</view>
		<view class="mine-top">
			<template v-if="userLogin">
				<view class="mine-top-left">
					<image src="../../static/img/icons/zhongjiang.png"></image>
				</view>
				<view class="mine-top-right">
					<view class="top-right-name">哈哈哈</view>
					<view class="top-right-date" v-if="isVip">兰盾会员剩余时间：180天</view>
					<view class="top-right-btn bg-gradual-orange text-center shadow-blur" 
					v-if="!isVip" @click="gotoUrl('/pages/mine/commonMember')">普通成员</view>
				</view>
				<view class="mine-top-pos" v-if="!isVip" @click="gotoUrl('/pages/mine/superMember')">
					<image class="top-pos-img" src='../../static/img/icons/vip.png'></image>
					兰盾会员
				</view>
				<view class="mine-top-pos" v-if="isVip" @click="gotoUrl('/pages/mine/superMember')">
					立即充值
				</view>
			</template>
			<template v-else>
				<view class="mine-top-left">
					<image src="../../static/img/icons/zhongjiang.png"></image>
				</view>
				<view class="mine-top-right" @click="gotoUrl('/pages/myData/login')">
					<view class="top-right-name">点击登录</view>
				</view>
			</template>
		</view>
		<view class="mine-content">
			<view class="mine-content-li" @click="gotoUrl('/pages/mine/energy')">
				<view class="content-li-title">我的能量</view>
				<view class="content-li-num">0</view>
			</view>
			<view class="mine-content-li" @click="gotoUrl('/pages/mine/cardVoucher')">
				<view class="content-li-title">我的卡券</view>
				<view class="content-li-num">0</view>
			</view>
			<view class="mine-content-li" @click="gotoUrl('/pages/mine/collect')">
				<view class="content-li-title">我的收藏</view>
				<view class="content-li-num">0</view>
			</view>
		</view>
		<view class="mine-bottom">
			<view class="mine-bottom-li" @click="gotoTab('/pages/myData/myData')">
				<view class="bottom-li-left">我的训练(3)</view>
				<view class="bottom-li-right">></view>
			</view>
			<view class="mine-bottom-li" @click="gotoUrl('/pages/mine/activityExchange')">
				<view class="bottom-li-left">奖励兑换</view>
				<view class="bottom-li-right">></view>
			</view>
			<view class="mine-bottom-li" @click="gotoUrl('/pages/mine/accountRelation')">
				<view class="bottom-li-left">账号管理</view>
				<view class="bottom-li-right">></view>
			</view>
			<view class="mine-bottom-li" @click="gotoUrl('/pages/mine/feedback')">
				<view class="bottom-li-left">意见建议</view>
				<view class="bottom-li-right">></view>
			</view>
			<view class="mine-bottom-li" @click="gotoUrl('/pages/mine/aboutUs')">
				<view class="bottom-li-left">关于我们</view>
				<view class="bottom-li-right">></view>
			</view>
			<view class="mine-bottom-li" @click="gotoReturn">
				<view class="bottom-li-left">退出登录</view>
				<view class="bottom-li-right">></view>
			</view>
		</view>
		<l-modal :isShowModal="isShowModal" :modalTitle="modalTitle" @onClickCancel="cancel" @onClickConfirm="confirm">
			<view class="modal-text">
				是否确定退出登录？
			</view>
		</l-modal>
	</view>
</template>

<script>
	import lModal from '@/components/l-modal/l-modal.vue'
	export default {
		components: {
			lModal,
		},
		data() {
			return {
				userLogin: true, // 用户是否登录
				isVip: true, // 是否是vip
				isShowModal: false,
				modalTitle: '提示',
			}
		},
		methods: {
			gotoUrl(url){
				uni.navigateTo({
					url:url
				})
			},
			gotoTab(url){
				uni.switchTab({
					url: url
				})
			},
			gotoReturn(){
				this.isShowModal = true
			},
			cancel(){
				this.isShowModal = false
				this.modalTitle = ''
			},
			confirm() {
				this.isShowModal = false
				uni.clearStorage();
				uni.showToast({
					icon: 'success',
					title: '退出登录成功！',
					duration: 2000
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/myData/loadPage'
					})
				}, 1500)
			},
		}
	}
</script>

<style lang="scss">
.mine{
	width: 100%;
	.modal-text{
		width: 100%;
		font-weight: bold;
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		font-size: 32rpx;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: $uni-color-primary;
		z-index: 999;
		.top_view {
			height: var(--status-bar-height);
			width: 100%;
		}
	}
	.title-box{
		width: 100%;
		display: flex;
		margin-top: var(--status-bar-height);
		justify-content: space-between;
		padding: 14rpx 24rpx;
		box-sizing: border-box;
		position: fixed;
		height: 82rpx;
		z-index: 999;
		top: 0;
		left: 0;
		background: linear-gradient(to right, rgb(94, 92, 216), $uni-color-primary);
		.title-box-name{
			font-size:32rpx;
			color:rgba(255,255,255,1);
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.mine-top{
		width: 100%;
		padding:150rpx 80rpx;
		box-sizing: border-box;
		background: linear-gradient(to right, rgb(94, 92, 216), $uni-color-primary);
		position: relative;
		display: flex;
		color: #FFFFFF;
		.mine-top-left{
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			overflow: hidden;
			border: 4rpx solid #FFFFFF;
			margin-right: 40rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.mine-top-right{
			height: 150rpx;
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			.top-right-name{
				font-weight: bold;
				font-size: 36rpx;
			}
			.top-right-date{
				font-size: 28rpx;
			}
			.top-right-btn{
				text-align: center;
				height: 45rpx;
				line-height: 45rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
				border-radius: 50rpx;
				font-size: 24rpx;
			}
		}
		.mine-top-pos{
			border-radius: 50rpx 0 0 50rpx;
			position: absolute;
			top: 48%;
			transform: translateY(-50%);
			right: 0;
			background-color: #FFFFFF;
			padding-left: 15rpx;
			padding-right: 10rpx;
			height: 55rpx;
			line-height: 55rpx;
			color: $uni-color-warning;
			display: flex;
			font-weight: bold;
			font-size: 26rpx;
			.top-pos-img{
				width: 35rpx;
				height: 35rpx;
				display: inline-block;
				margin-top: 10rpx;
				margin-right: 10rpx;
			}
		}
	}
	.mine-content{
		border-radius: 25rpx;
		background-color: #FFFFFF;
		margin: auto;
		margin-top: -13%;
		width: 95%;
		display: flex;
		justify-content: space-around;
		z-index: 99;
		position: relative;
		.mine-content-li{
			text-align: center;
			padding: 40rpx 0;
			box-sizing: border-box;
			.content-li-title{
				font-size: 26rpx;
				color: #666;
				margin-bottom: 20rpx;
			}
			.content-li-num{
				font-weight: bold;
				font-size: 45rpx;
				color: #333333;
			}
		}
	}
	.mine-bottom{
		width: 95%;
		margin: auto;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		border-radius: 15rpx;
		.mine-bottom-li{
			height: 90rpx;
			line-height: 90rpx;
			width: 100%;
			border-bottom: 1px solid #F0F0F0;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			box-sizing: border-box;
			.bottom-li-left{
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;
			}
			.bottom-li-right{
				font-size: 30rpx;
				color: #666666;
			}
		}
	}
}
</style>
