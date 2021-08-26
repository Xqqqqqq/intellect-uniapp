<template>
	<view class="share">
		<image src="../../static/img/icons/star-bg.jpg" class="share-bg"></image>
		<view class="share-box">
			<view class="share-box-title">
				<text>邀请好友\n获能量兑换券</text>
			</view>
			<view class="share-box-code-tip">邀请兑奖码：JDJKFSKLDJFS</view>
			<view class="share-box-code">
				<image src="https://img1.baidu.com/it/u=1078861629,3747050294&fm=26&fmt=auto&gp=0.jpg"></image>
			</view>
			<view class="share-box-detail">邀请与被邀请双方，各获得一张<text>3</text>点能量券</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<button class="btn" type="default" @click="savePhoto('https://img1.baidu.com/it/u=1078861629,3747050294&fm=26&fmt=auto&gp=0.jpg')">保存二维码</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<button class="btn" type="default" @click="savePosterPath('https://img1.baidu.com/it/u=1078861629,3747050294&fm=26&fmt=auto&gp=0.jpg')">保存二维码</button>
		<!-- #endif -->
		<!-- .sync修饰符:当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。 -->
		<!-- <yz-canvas-poster :ifShow.sync="ifShow" :imageBg="imageBg" :imageHead="imageHead" :imageBody="imageBody"
			:textHead="textHead">
		</yz-canvas-poster> -->
		<!-- <button class="btn" type="default" @click="canvasShow">保存二维码</button> -->
	</view>
</template>

<script>
	// import yzCanvasPoster from '@/components/yz-canvas-poster/yz-canvas-poster.vue'
	export default {
		components: {
			// yzCanvasPoster
		},
		data() {
			return {
				// ifShow: false,
				// imageBg: '../../static/img/icons/bg.jpg',
				// imageHead: ['../../static/img/icons/zhongjiang.png', 50, 20, 40, 40],
				// imageBody: ['../../static/img/icons/zhongjiang.png', 98, 240, 120, 120],
				// textHead:  ['myCanvas', 100, 40, '#ffffff', '20']
			}
		},
		methods: {
			// 小程序
			savePosterPath(url){
				uni.downloadFile({
					url,
					success: (resFile) => {
					  console.log(resFile, "resFile");
					  if (resFile.statusCode === 200) {
						uni.getSetting({
						  success: (res) => {
							if (!res.authSetting["scope.writePhotosAlbum"]) {
							  uni.authorize({
								scope: "scope.writePhotosAlbum",
								success: () => {
								  uni.saveImageToPhotosAlbum({
									filePath: resFile.tempFilePath,
									success: (res) => {
									  return uni.showToast({
										title: "保存成功！",
									  });
									},
									fail: (res) => {
									  return uni.showToast({
										title: res.errMsg,
									  });
									},
									complete: (res) => {},
								  });
								},
								fail: () => {
								  uni.showModal({
									title: "您已拒绝获取相册权限",
									content: "是否进入权限管理，调整授权？",
									success: (res) => {
									  if (res.confirm) {
										uni.openSetting({
										  success: (res) => {
											console.log(res.authSetting);
										  },
										});
									  } else if (res.cancel) {
										return uni.showToast({
										  title: "已取消！",
										});
									  }
									},
								  });
								},
							  });
							} else {
							  uni.saveImageToPhotosAlbum({
								filePath: resFile.tempFilePath,
								success: (res) => {
								  return uni.showToast({
									title: "保存成功！",
								  });
								},
								fail: (res) => {
								  return uni.showToast({
									title: res.errMsg,
								  });
								},
								complete: (res) => {},
							  });
							}
						  },
						  fail: (res) => {},
						});
					  } else {
						return uni.showToast({
						  title: resFile.errMsg,
						});
					  }
					},
					fail: (res) => {
					  return uni.showToast({
						title: res.errMsg,
					  });
					},
				  });
			},
			// APP-PLUS
			savePhoto(url){
				// 先下载图片
				uni.downloadFile({
					url,
					success: (res) => {
						// 获取到图片本地地址后再保存图片到相册（因为此方法不支持远程地址）
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title: "保存成功！",
								});
							},
							fail: () => {
							  uni.showToast({
								title: "保存失败",
							  });
							},
						});
					},
				});
			},
			canvasShow() {
				// this.ifShow = true;
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.share{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
		padding: 10% 0;
		box-sizing: border-box;
		.share-bg{
			position: fixed;
			z-index: -1;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
		.share-box{
			background-color: rgba(255, 255, 255, 0.5);
			width: 85%;
			border-radius: 10rpx;
			padding: 60rpx 20rpx;
			box-sizing: border-box;
			.share-box-title{
				text-shadow: 2px 2px 2px grey;
				text-align: center;
				font-size: 45rpx;
				font-weight: bold;
				margin-bottom: 15%;
				line-height: 1.3;
			}
			.share-box-code{
				width: 300rpx;
				height: 300rpx;
				margin: auto;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.share-box-code-tip{
				text-align: center;
				font-size: 24rpx;
				margin-bottom: 10rpx;
			}
			.share-box-detail{
				margin-top: 10%;
				font-size: 30rpx;
				text{
					font-size: 50rpx;
					color: $uni-color-error;
				}
			}
		}
		.btn {
			width: 85%;
			border-radius: 20rpx;
			text-align: center;
			line-height: 88rpx;
			color: #FFFFFF;
			background-color: $uni-color-primary;
		}
	}
</style>