<template>
	<view class="feed">
		<view class="feed-top">
			<view class="feed-top-li" :class="{'feed-top-li-click': currentTab == index}"
			v-for="(item, index) in problemList" :key="index"
			@click="clickTab(item, index)">{{item.title}}</view>
		</view>
		<view class="feed-content">
			<view class="feed-content-title">问题描述</view>
			<view class="feed-content-text">
				<textarea v-model="informContent" placeholder="请输入问题描述..."></textarea>
			</view>
		</view>
		<view class="feed-bottom">
			<view class="feed-content-title">上传图片</view>
			<uni-file-picker
			    v-model="imageValue" 
			    fileMediatype="image" 
			    mode="grid" 
				:del-icon="true"
				return-type="array"
				:image-styles="imageStyles"
				:limit="4"
			    @select="select" 
			    @progress="progress" 
			    @success="success" 
			    @fail="fail"
				@delete="deleteImg"
			></uni-file-picker>
			<!-- view class="feed-content-ul">
				<image v-for="(item, index) in urls" :key="index" :src="item" @click="clickUrl(index)"></image>
				<image  src='../../static/img/icons/add.png' @click="clickUrl(-1)"></image>
			</view> -->
		</view>
		<view class="feed-btn" @click="submitInfo">提交信息</view>
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	import uniFilePicker from "@/components/uni-file-picker/uni-file-picker.vue";
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		components: {
			avatar,
			htzImageUpload,
			uniFilePicker,
		},
		data() {
			return {
				uploadParams: {
					type: 'dailyLife'
				},
				problemList:[{
					id:1,
					title:'系统操作问题'
				},{
					id:2,
					title:'平台优化建议'
				},{
					id:3,
					title:'违规内容举报'
				},{
					id:4,
					title:'内容方向建议'
				},{
					id:5,
					title:'平台bug上报'
				},{
					id:6,
					title:'其他内容'
				},],
				currentTab:-1,
				urls: [],
				urlImgIndex: 0,
				showAvatar: false,
				imageData: [],
				imageValue:[],
				imageStyles: {
					"height": 115,   // 边框高度
					"width": 115,    // 边框宽度
					"border":{ // 如果为 Boolean 值，可以控制边框显示与否
						"color":"#eee",     // 边框颜色
						"width":"1px",      // 边框宽度
						"style":"solid",    // 边框样式
						"radius":"10px"      // 边框圆角，支持百分比
					}
				},
				memberId: '',
				informType: '',
				informContent: ''
			};
		},
		onLoad(){
			this.memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
		},
		methods:{
			getMemberSignRecord(){
				let memberId = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')).id : ''
				if(uni.getStorageSync('userInfo')){
					this.$Request.postT('/appSignController.do?getMemberSignRecord',{
						memberId: this.memberId
					}).then(res => {
						if(res.code == 0){
							this.trainInfo = res.data
							this.checks = res.data.signList
						}else{
							uni.showToast({
								title: res.info,
								icon: 'none'
							})
						}
					})
				}else{
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
			clickTab(item, index){
				this.currentTab = index
				this.informType = item.id
			},
			// 获取上传状态
			select(e){
				let vm = this
				// console.log('选择文件：',e)
				pathToBase64(e.tempFilePaths[0])
				  .then(base64 => {
					// console.log(base64)
					let pic = base64.replace(/^data:image\/\w+;base64,/, "")
					vm.imageData.push({
						pic,
						tempFilePath: e.tempFilePaths[0]
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
			// 文件从列表移除时触发
			deleteImg(e){
				// console.log('移除：',e.tempFilePath)
				this.imageData.splice(this.imageData.findIndex(item => item.tempFilePath == e.tempFilePath), 1)
			},
			submitInfo(){
				console.log(this.imageData)
				if(this.informType == ''){
					uni.showToast({
						title: '请选择问题类型后提交！',
						icon: 'none'
					})
				}else{
					this.$Request.postJson('/appSystemController.do?takeInform',{
						memberId: this.memberId,
						informContent: this.informContent,
						informType: this.informType,
						picOne: this.imageData[0] ? this.imageData[0].pic : '',
						picTwo: this.imageData[1] ? this.imageData[1].pic : '',
						picThree: this.imageData[2] ? this.imageData[2].pic : '',
						picFour: this.imageData[3] ? this.imageData[3].pic : '',
					}).then(res => {
						if(res.code == 0){
							uni.showToast({
								title: res.info,
								icon: 'none'
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/mine/mine'
								})
							},1000)
						}else{
							uni.showToast({
								title: res.info,
								icon: 'none'
							})
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
.feed{
	width: 100%;
	padding-bottom: 130rpx;
	box-sizing: border-box;
	.feed-top{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.feed-top-li{
			width: 33%;
			text-align: center;
			background-color: #FFFFFF;
			font-weight: bold;
			height: 200rpx;
			line-height: 200rpx;
			font-size: 30rpx;
			margin-bottom: 0.5%;
		}
		.feed-top-li-click{
			background-color: $uni-text-color-disable;
			color: #FFFFFF;
		}
	}
	.feed-content{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		.feed-content-title{
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
		}
		.feed-content-text{
			border: 1px solid #D3D3D3;
			width: 100%;
			height: 400rpx;
			padding: 24rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			textarea{
				width: 100%;
				height: 100%;
				font-size: 26rpx;
			}
		}
	}
	.feed-bottom{
		background-color: #FFFFFF;
		padding: 24rpx;
		box-sizing: border-box;
		.feed-content-title{
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
		}
		.feed-content-ul{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			image{
				width: 180rpx;
				height: 180rpx;
				border-radius: 15rpx;
				margin-right: 7%;
				margin-bottom: 20rpx;
			}
		}
	}
	.feed-btn{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30rpx;
		font-weight: bold;
		background-color: $uni-color-primary;
		position: fixed;
		left: 0;
		bottom: 0;
	}
}
</style>
