<template>
	<view>
		<l-painter :board="base" isRenderImage @success="path = $event"/>
		<view @click="saveImage" style="position: fixed;left: 0;bottom: 0;width: 100%;">点击</view>
		<img :src="path">
	</view>
</template>

<script>
	import lPainter from '@/components/lime-painter/'
	export default {
		components: {lPainter},
		data() {
			return {
				path: '',
				base: {
					width: '750rpx',
					height: '1114rpx',
					background: '#F6F7FB',
					views: [
						{
							type: 'view',
							css: {
								left: '40rpx',
								top: '144rpx',
								background: '#fff',
								radius: '16rpx',
								width: '670rpx',
								height: '930rpx',
								shadow: '0 20rpx 48rpx rgba(0,0,0,.05)'
							}
						},
						{
							type: 'image',
							src: '../../static/img/icons/add-img.png',
							mode: 'widthFix',
							css: {
								left: '40rpx',
								top: '40rpx',
								width: '84rpx',
								height: '84rpx',
								radius: '50%',
								color: '#999'
							}
						},
						{
							type: 'text',
							text: '隔壁老王',
							css: {
								color: '#333',
								left: '144rpx',
								top: '40rpx',
								fontSize: '32rpx',
								fontWeight: 'bold'
							}
						},
						{
							type: 'text',
							text: '为您挑选了一个好物',
							css: {
								color: '#666',
								left: '144rpx',
								top: '90rpx',
								fontSize: '24rpx'
							}
						},
						{
							type: 'image',
							src: '../../static/img/icons/bg.jpg',
							mode: 'widthFix',
							css: {
								left: '72rpx',
								top: '176rpx',
								width: '606rpx',
								height: '606rpx',
								radius: '12rpx'
							}
						},
						{
							type: 'text',
							text: '￥39.90',
							css: {
								color: '#FF0000',
								left: '66rpx',
								top: '812rpx',
								fontSize: '56rpx',
								fontWeight: 'bold'
							}
						},
						{
							type: 'text',
							text: '360儿童电话手表9X 智能语音问答定位支付手表 4G全网通20米游泳级防水视频通话拍照手表男女孩星空蓝',
							css: {
								maxLines: 2,
								width: '396rpx',
								color: '#333',
								left: '72rpx',
								top: '948rpx',
								fontSize: '36rpx',
								lineHeight: '50rpx'
							}
						},
						{
							type: 'image',
							src: '../../static/img/icons/add-img.png',
							mode: 'widthFix',
							css: {
								left: '500rpx',
								top: '864rpx',
								width: '178rpx',
								height: '178rpx'
							}
						}
					]
				}
			};
		},
		methods: {
		    saveImage() {
				console.log(this.path)
		        this.isShowPopup = false
				uni.saveImageToPhotosAlbum({
					filePath: this.path,
					complete: function () {
						uni.showToast({
							title: '3',
							icon: 'success',
							duration: 2000
						})
					},
				});
		        // uni.saveImageToPhotosAlbum({
		        //     filePath: this.path,
		        //     success(res) {
		        //         uni.showToast({
		        //             title: '已保存到相册',
		        //             icon: 'success',
		        //             duration: 2000
		        //         })
		        //     }
		        // })
		    },
		}
	}
</script>

<style lang="scss">

</style>
