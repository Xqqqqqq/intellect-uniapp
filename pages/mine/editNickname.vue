<template>
	<view class="nickname">
		<view class="nickname-box">
			<view class="nickname-box-tip">我的昵称</view>
			<view class="nickname-input">
				<input placeholder="请输入昵称" v-model="memberNickname"/>
				<view class="nickname-input-btn" @click="checkName">检测</view>
			</view>
			<view class="nickname-box-tip">*点击按钮查看重名查询结果*</view>
			<view class="nickname-box-msg" style="color: #dd524d" v-if="code == 150">有重名请重新输入</view>
			<view class="nickname-box-msg" style="color: #4cd964" v-if="code == 0">暂无重名立即修改</view>
		</view>
		<view class="edit-btn" v-if="code == 0" @click="clickChange">立即修改</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memberNickname: '',
				code: -1, //0成功150重名，其他失败
				memberId: '',
			};
		},
		onShow(){
			this.memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
		},
		methods:{
			checkName(){
				// 验证用户新昵称
				if(this.memberNickname){
					this.$Request.get(`/appMemberController.do?checkNickname&memberId=${this.memberId}&memberNickname=${this.memberNickname}`)
					.then(res => {
						this.code = res.code
						if(res.code == 0 || res.code == 150){
						}else{
							uni.showToast({
								title: res.info,
								icon: 'none'
							})
						}
					})
				}else{
					uni.showToast({
						title: '请输入昵称！',
						icon: 'none'
					})
				}
			},
			clickChange(){
				if(this.memberNickname){
					this.$Request.get(`/appMemberController.do?updateNickname&memberId=${this.memberId}&memberNickname=${this.memberNickname}`)
					.then(res => {
						if(res.code == 0){
							uni.showToast({
								title: '昵称修改成功！',
								icon: 'none'
							})
							setTimeout(()=>{
								uni.navigateTo({
									url: '/pages/mine/editUserInfo'
								})
							},1000)
						}else if(res.code == 100){
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
						}else if(res.code == 150){
							this.code = 150
						}else{
							uni.showToast({
								title: res.info,
								icon: 'none'
							})
						}
					})
				}else{
					uni.showToast({
						title: '请输入昵称！',
						icon: 'none'
					})
				}
			}
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
