<template>
	<view class="edit">
		<view class="edit-li">
			<view class="edit-li-left">头像：</view>
			<view class="edit-li-right">
				<image :src="userInfo.memberPic ? userInfo.memberPic : '../../static/img/icons/unlogin.png'"></image>
			</view>
		</view>
		<view class="edit-li" @click="gotoNickname">
			<view class="edit-li-left">昵称：</view>
			<view class="edit-li-right">{{userInfo.memberNickname}} ></view>
		</view>
		<picker @change="bindSexChange" :value="sexIndex" :range="sexList" range-key="title">
			<view class="edit-li">
				<view class="edit-li-left">性别：</view>
				<view class="edit-li-right">{{sexList[sexIndex+1].title}} ></view>
			</view>
		</picker>
		<view class="edit-btn">保存信息</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				sexList:[{
					id:1,
					title:'男'
				},{
					id:2,
					title:'女'
				},],
				sexIndex:0,
				userInfo:{},
				memberId:''
			};
		},
		onShow(){
			this.memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
			this.getMember()
		},
		methods:{
			// 获取我的信息
			getMember(){
				this.$Request.get(`/appMemberController.do?getMember&memberId=${this.memberId}`)
				.then(res => {
					this.userInfo = res.data.memberVo
					uni.setStorageSync('userInfo', JSON.stringify(res.data.memberVo))
					if(res.code == 0 || res.code == 100){
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			bindSexChange(e){
				this.sexIndex = e.detail.value
			},
			gotoNickname(){
				wx.navigateTo({
					url:'/pages/mine/editNickname'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f4f4f4;
}
.edit{
	width: 100%;
	.edit-li{
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #D3D3D3;
		background-color: #FFFFFF;
		padding: 34rpx 24rpx;
		box-sizing: border-box;
		.edit-li-left{
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
		.edit-li-right{
			font-size: 30rpx;
			color: #666;
			image{
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
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
