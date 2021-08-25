<template>
	<!-- <view class="content" v-show="ifShow" @click="changeIfShow" >-->
	<view class="content" v-show="ifShow" @click="changeIfShow">
		<canvas class="canvas-img" canvas-id="firstCanvas" id="firstCanvas" @longpress="canvasGet"></canvas>
	</view>
</template>

<script>
	export default {
		name: 'yz-canvas-poster',
		data() {
			return {
				canvasPath: '', //
				context: null
			}
		},
		props: {
			ifShow: {
				type: Boolean,
				default: false
			},
			imageBg: {
				type: String,
				default: ''
			},
			imageHead: {
				type: Array,
				default: []
			},
			imageBody: {
				type: Array,
				default: []
			},
			textHead: {
				type: Array,
				default: []
			}

		},
		mounted() {
			// 兼容微信小程序
			let tempTimeOut = setTimeout(() => {
				this.init();
				clearTimeout(tempTimeOut)
			}, 1000)
		},
		updated() {
			// 兼容H5及APP
			let tempTimeOut = setTimeout(() => {
				this.init();
				clearTimeout(tempTimeOut)
			}, 1000)
		},
		methods: {
			init() {
				var that = this;
				that.context = uni.createCanvasContext('firstCanvas', that);
				that.context.drawImage(that.imageBg, 0, 0, 312, 520)
				// that.context.drawImage(that.imageHead, 50, 20, 40, 40)
				that.context.drawImage(that.imageHead[0], that.imageHead[1], that.imageHead[2], that.imageHead[
						3], that
					.imageHead[4])
				that.context.drawImage(that.imageBody[0], that.imageBody[1], that.imageBody[2], that.imageBody[
						3], that
					.imageBody[4])
				that.context.setFontSize(that.textHead[4])
				that.context.setTextBaseline('middle')
				that.context.setFillStyle(that.textHead[3])
				that.context.fillText(that.textHead[0], that.textHead[1], that.textHead[2])
				that.context.draw()
			},
			changeIfShow() {
				//触发一个更新事件
				this.$emit('update:ifShow', false)
				console.log('隐藏canvas')
			},
			canvasGet() {
				console.log('下载canvas')
				var that = this;
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success: function(res) {
						// 在H5平台下，tempFilePath 为 base64
						console.log(res.tempFilePath);
						that.canvasPath = res.tempFilePath;
						uni.showModal({
							title: '温馨提示',
							content: '确定将图片保存到本地？',
							// showCancel: false,
							cancelText: '取消',
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									console.log('用户点击确定');
									// H5不支持uni.saveImageToPhotosAlbum
									uni.saveImageToPhotosAlbum({
										filePath: that.canvasPath,
										success: function() {
											console.log('save success');
											that.changeIfShow();
											uni.showToast({
												title: '保存成功',
												duration: 2000
											});
										}
									});
								} else if (res.cancel) {
									console.log('用户点击取消');
								}

							},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: () => {
						console.log('下载失败')
					},
				}, that)

			}

		}
	}
</script>

<style>
	.content {
		position: fixed;
		top: 0;
		display: flex;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.2);
		width: 100vw;
		height: 100vh;
		z-index: 2;
		/* 设置显示层级 */
	}

	.canvas-img {
		background-color: rgba(245, 55, 80, 0.1);
		/* 检测canvas区域，项目中可删除 */
		position: fixed;
		top: 112rpx;
		height: 1000rpx;
		width: 600rpx;
		/* 设置显示层级 */
		z-index: 3;
	}
</style>
