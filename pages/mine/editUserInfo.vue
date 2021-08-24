<template>
	<view class="edit">
		<view class="edit-li">
			<view class="edit-li-left">头像：</view>
			<view class="edit-li-right">
				<uni-file-picker 
				    v-model="imageValue" 
				    fileMediatype="image" 
				    mode="grid" 
					:del-icon="false"
					return-type="object"
					:image-styles="imageStyles"
					disable-preview
				    @select="select" 
				    @progress="progress" 
				    @success="success" 
				    @fail="fail" 
				></uni-file-picker>
				<!-- <image :src="userInfo.memberPic ? userInfo.memberPic : '../../static/img/icons/unlogin.png'"></image> -->
			</view>
		</view>
		<view class="edit-li" @click="gotoNickname">
			<view class="edit-li-left">昵称：</view>
			<view class="edit-li-right">{{userInfo.memberNickname}} ></view>
		</view>
		<picker @change="bindSexChange" :value="sexIndex" :range="sexList" range-key="title">
			<view class="edit-li">
				<view class="edit-li-left">性别：</view>
				<view class="edit-li-right">{{sexList[sexIndex].title}} ></view>
			</view>
		</picker>
		<!-- <view class="edit-btn">保存信息</view> -->
	</view>
</template>

<script>
	import uniFilePicker from "@/components/uni-file-picker/uni-file-picker.vue";
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		components: {
			uniFilePicker,
		},
		data() {
			return {
				sexList:[{
					id:0,
					title:'保密'
				},{
					id:1,
					title:'男'
				},{
					id:2,
					title:'女'
				},],
				sexIndex:0,
				userInfo:{},
				memberId:'',
				imageValue:[{
					url: '',
					extname: 'png',
					name: 'shuijiao.png'
				},],
				imageStyles: {
					"height": 80,   // 边框高度
					"width": 80,    // 边框宽度
					"border":{ // 如果为 Boolean 值，可以控制边框显示与否
						"color":"#eee",     // 边框颜色
						"width":"1px",      // 边框宽度
						"style":"solid",    // 边框样式
						"radius":"50%"      // 边框圆角，支持百分比
					}
				}
			};
		},
		onShow(){
			this.memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
			this.getMember()
		},
		methods:{
			// 获取上传状态
			select(e){
				let vm = this
				// console.log('选择文件：',e)
				pathToBase64(e.tempFilePaths[0])
				  .then(base64 => {
					// console.log(base64)
					let pic = base64.replace(/^data:image\/\w+;base64,/, "")
					vm.$Request.postJson('/appMemberController.do?updateMemberPic',{
						id: vm.memberId,
						pic: pic
					}).then(res => {
						if(res.code == 0){
						}
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					})
				  })
				  .catch(error => {
					console.error(error)
				  })
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},
			// 上传成功
			success(e){
				console.log('上传成功',e)
			},
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			},
			// 获取我的信息
			getMember(){
				this.$Request.get(`/appMemberController.do?getMember&memberId=${this.memberId}`)
				.then(res => {
					this.userInfo = res.data.memberVo
					this.sexIndex = this.sexList.findIndex(item => item.id == res.data.memberVo.memberSex)
					this.imageValue[0].url = res.data.memberVo.memberPic
					console.log(this.imageValue)
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
				this.$Request.postJson('/appMemberController.do?updateMemberSex',{
					id: this.memberId,
					memberSex: this.sexList[e.detail.value].id
				}).then(res => {
					if(res.code == 0){
					}
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				})
			},
			gotoNickname(){
				wx.navigateTo({
					url:'/pages/mine/editNickname'
				})
			},
			myUpload(rsp) {
				console.log(rsp)
				this.userInfo.memberPic = rsp.path; //更新头像方式一
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
			// image{
			// 	width: 150rpx;
			// 	height: 150rpx;
			// 	border-radius: 50%;
			// }
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
