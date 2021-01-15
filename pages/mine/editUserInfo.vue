<template>
	<view class="edit">
		<view class="edit-li">
			<view class="edit-li-left">头像：</view>
			<view class="edit-li-right" @click="openavatar">
				<image :src="userImg ? userImg : '../../static/img/icons/common.jpg'"></image>
			</view>
		</view>
		<view class="edit-li" @click="gotoNickname">
			<view class="edit-li-left">昵称：</view>
			<view class="edit-li-right">哈哈 ></view>
		</view>
		<picker @change="bindSexChange" :value="sexIndex" :range="sexList" range-key="title">
			<view class="edit-li">
				<view class="edit-li-left">性别：</view>
				<view class="edit-li-right">{{sexList[sexIndex].title}} ></view>
			</view>
		</picker>
		<view class="edit-btn">保存信息</view>
		<avatar v-show="avatarShow" selWidth="200px" selHeight="200upx" @upload="myUpload" ref="avatar" avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;">
		</avatar>
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				userImg:'',
				avatarShow: false,
				sexList:[{
					id:0,
					title:'男'
				},{
					id:1,
					title:'女'
				},],
				sexIndex:0
			};
		},
		methods:{
			openavatar(){
				this.avatarShow = true
				this.$refs.avatar.fChooseImg(1, {
					selWidth: "300upx",
					selHeight: "300upx",
					expWidth: '260upx',
					expHeight: '260upx'
				});
			},
			myUpload(rsp) {
				this.avatarShow = false
				this.userImg = rsp.base64
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
