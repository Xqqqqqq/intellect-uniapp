<template>
	<view>
		<view style="padding:20rpx">配置上传路径,通过@uploadSuccess事件的</view>
		<htz-image-upload :max="9" v-model="ceshiData" :chooseNum="9" :sourceType="['album','camera']" :compress="true"
		 :quality="80" :formData="{'ceshi': '123'}" :remove="true" @uploadSuccess="ceshiUploadSuccess1" @imgDelete="ceshiImgDelete"
		 @uploadFail="ceshiUploadFail" action="http://59.110.49.173:8001/api/common/uploadImg?dir=ad"></htz-image-upload>

		<view>配置上传路径，通过:uploadSuccess属性的</view>
		<htz-image-upload :sourceType="['camera','album']"  :max="11" v-model="ceshiData1" :uploadSuccess="zidingyiSuccess" action="http://59.110.49.173:8001/api/common/uploadImg?dir=ad"></htz-image-upload>

		<view style="padding:20rpx">不配置上传径路，自己处理上传</view>
		<htz-image-upload :max="9" name="file" :chooseNum="9" v-model="imageData" @chooseSuccess="ceshiChooseSuccess"></htz-image-upload>

		<view style="padding:20rpx">循环绑定</view>
		<htz-image-upload v-for="(item,index) in zidingData" :key="index" :max="9" v-model="item.val" :chooseNum="9"
		 :sourceType="['album','camera']" :compress="true" :quality="80" :formData="{'ceshi': '123'}" :remove="true"
		 :uploadSuccess="zidingyiSuccess" @imgDelete="ceshiImgDelete" @uploadFail="ceshiUploadFail" action="http://59.110.49.173:8001/api/common/uploadImg?dir=ad"></htz-image-upload>
		<button type="primary" @click="getData" style="margin: 20rpx;">获取数据</button>
	</view>
</template>
<script>
	import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	export default {
		data() {
			return {
				imageData: [

				],
				ceshiData: [
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602735866382&di=ef10259e855235340cdcb677a53d4a72&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F70%2F91%2F01300000261284122542917592865.jpg',
					'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2462146637,4274174245&fm=26&gp=0.jpg',
				],
				zidingData: [{
					id: 1,
					val: []
				}, {
					id: 2,
					val: []
				}],
				ceshiData1: [],
			}
		},
		onLoad() {

		},
		components: {
			htzImageUpload,
		},
		methods: {
			ceshiUploadSuccess(res) { //上传成功
				//console.log('res',res)
				/****************
				因为上传接口返回的结构不一致，所以以下代码需要根据实际的接口返回结构开发，在此只是展示如果给数组里添加的过程，仅供参考
				***************/
				var _res = JSON.parse(res.data);
				if (_res.code == 200) {
					this.imageData.push('http://59.110.49.173:8001' + _res.result);
				}
				/*******************************/
			},
			ceshiUploadSuccess1(res) { //上传成功
				console.log('res', this)
				/****************
				因为上传接口返回的结构不一致，所以以下代码需要根据实际的接口返回结构开发，在此只是展示如果给数组里添加的过程，仅供参考
				***************/
				var _res = JSON.parse(res.data);
				if (_res.code == 200) {
					this.ceshiData.push('http://59.110.49.173:8001' + _res.result);
				}
				/*******************************/
			},
			zidingyiSuccess(res) {
				var _res = JSON.parse(res.data);
				if (_res.code == 200) {
					return {
						success: true,
						url: 'http://59.110.49.173:8001' + _res.result
					}
				} else {
					return {
						success: false,
						url: ''
					}
				}

			},
			ceshiUploadFail(err) { //上传失败
				console.log('err', err)
			},
			getData() {
				console.log('ceshiData', this.ceshiData)
				console.log('ceshiData1', this.ceshiData1)
				console.log('imageData', this.imageData)
				console.log('zidingData', this.zidingData)
			},
			ceshiChooseSuccess(tempFilePaths) { //选择图片返回
				console.log('ceshiChooseSuccess', tempFilePaths);
				/****************
				以下代码是自定义上传逻辑，仅供参考
				***************/
				this.imgUpload(tempFilePaths);
				/*******************************/
			},
			ceshiImgDelete(tempFilePaths) {
				console.log('ceshiImgDelete', tempFilePaths)
			},
			imgUpload(tempFilePaths) {
				uni.showLoading({
					title: '上传中'
				});
				console.log('imgUpload', tempFilePaths)
				let uploadImgs = [];
				tempFilePaths.forEach((item, index) => {
					uploadImgs.push(new Promise((resolve, reject) => {
						console.log(index, item)
						uni.uploadFile({
							url: "http://59.110.49.173:8001/api/common/uploadImg?dir=ad", //仅为示例，非真实的接口地址
							filePath: item,
							name: 'file',
							success: (uploadFileRes) => {
								console.log('uploadFileRes', uploadFileRes)
								resolve(uploadFileRes);
								var _res = JSON.parse(uploadFileRes.data);
								if (_res.code == 200) {
									this.imageData.push('http://59.110.49.173:8001' + _res.result);
								}
							},
							fail: (err) => {
								console.log(err);
								reject(err);
							},
							complete: () => {
								//uni.hideLoading();
							}
						});
					}))
				})
				Promise.all(uploadImgs) //执行所有需请求的接口
					.then((results) => {
						uni.hideLoading();
					})
					.catch((res, object) => {
						uni.hideLoading();
					});
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;

	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
