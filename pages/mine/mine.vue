<template>
	<view class="mine">
		<view class="title-box">
			<view class="title-box-name">我的</view>
		</view>
		<view class="mine-top">
			<template v-if="userLogin">
				<view class="mine-top-left" @click="gotoUrl('/pages/mine/editUserInfo')">
					<image :src="userInfo.memberPic || '../../static/img/icons/unlogin.png'"></image>
				</view>
				<view class="mine-top-right" @click="gotoUrl('/pages/mine/editUserInfo')">
					<view class="top-right-name">
						<image v-if="userInfo.isVip == 1" src='../../static/img/icons/vip-yellow.png'></image>
						{{userInfo.memberNickname}}
					</view>
					<view class="top-right-date" v-if="userInfo.isVip == 1">兰盾会员剩余时间：{{userInfo.vipDays}}天</view>
					<view class="top-right-btn shadow-blur" v-if="userInfo.isVip == 0">普通会员</view>
				</view>
				<view class="mine-top-pos" v-if="userInfo.isVip == 0" @click="gotoUrl('/pages/mine/superMember')">
					<image class="top-pos-img" src='../../static/img/icons/vip.png'></image>
					兰盾会员
				</view>
				<view class="mine-top-pos" v-if="userInfo.isVip == 1" @click="gotoUrl('/pages/mine/superMember')">
					<image class="top-pos-img" src='../../static/img/icons/vip.png'></image>
					会员充值
				</view>
			</template>
			<template v-else>
				<view class="mine-top-left">
					<image src="../../static/img/icons/unlogin.png"></image>
				</view>
				<view class="mine-top-right" @click="gotoLogin('/pages/loginAll/login')">
					<view class="top-right-name">点击登录</view>
				</view>
			</template>
		</view>
		<view class="mine-content">
			<view class="mine-content-li" @click="gotoUrl('/pages/mine/energy')">
				<view class="content-li-title">我的能量</view>
				<view class="content-li-num">{{userInfo.memberScore}}</view>
			</view>
			<view class="mine-content-li" @click="gotoUrl('/pages/mine/cardVoucher')">
				<view class="content-li-title">我的卡券</view>
				<view class="content-li-num">{{userInfo.couponNum}}</view>
			</view>
			<view class="mine-content-li" @click="gotoUrl('/pages/mine/collect')">
				<view class="content-li-title">我的收藏</view>
				<view class="content-li-num">{{userInfo.articleNum}}</view>
			</view>
		</view>
		<view class="mine-bottom">
			<view class="mine-bottom-li" @click="gotoTab('/pages/myData/myData')">
				<view class="bottom-li-left">我的训练({{userInfo.collectsNum}})</view>
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
			<view class="mine-bottom-li" @click="gotoLogin('/pages/mine/aboutUs')">
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
				memberId: '',
				userInfo: {},
				code: 0
			}
		},
		onShow(){
			this.memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
			this.getMember()
		},
		onPullDownRefresh() {
			this.userInfo = {};
			uni.showLoading({
				title: '加载中'
			});
			this.getMember()
			uni.hideLoading();
			uni.stopPullDownRefresh()
		},
		methods: {
			// 获取我的信息
			getMember(){
				this.$Request.get(`/appMemberController.do?getMember&memberId=${this.memberId}`)
				.then(res => {
					this.code = res.code
					this.userInfo = res.data.memberVo
					uni.setStorageSync('userInfo', JSON.stringify(res.data.memberVo))
					if(res.code == 0){
						this.userLogin = true
					}else if(res.code == '100'){
						this.userLogin = false
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			gotoUrl(url){
				let vm = this
				if(vm.code == 0){
					uni.navigateTo({
						url:url
					})
				}else if(vm.code == 100){
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
			// 点击登录按钮
			gotoLogin(url){
				uni.navigateTo({
					url:url
				})
			},
			gotoTab(url){
				let vm = this
				if(vm.code == 0){
					uni.switchTab({
						url: url
					})
				}else if(vm.code == 100){
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
			gotoReturn(){
				this.isShowModal = true
			},
			cancel(){
				this.isShowModal = false
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
	page{
		background-color: #f4f4f4;
	}
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
	.shadow-blur {
		position: relative;
	}
	
	.shadow-blur::before {
		content: "";
		display: block;
		background: inherit;
		filter: blur(10upx);
		position: absolute;
		width: 100%;
		height: 100%;
		top: 10upx;
		left: 10upx;
		z-index: -1;
		opacity: 0.4;
		transform-origin: 0 0;
		border-radius: inherit;
		transform: scale(1, 1);
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
		padding:150rpx 50rpx;
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
			margin-right: 30rpx;
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
				max-width: 320rpx;
				overflow:hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}
			.top-right-date{
				text-align: center;
				height: 45rpx;
				line-height: 45rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
				border-radius: 50rpx;
				font-size: 24rpx;
				background-color: #e54d42;
				color: #fff;
			}
			.top-right-btn{
				text-align: center;
				height: 45rpx;
				line-height: 45rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
				border-radius: 50rpx;
				font-size: 24rpx;
				color: #8799a3;
				background-color: #e7ebed;
				width: 180rpx;
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
