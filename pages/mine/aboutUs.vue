<template>
	<view class="about">
		<view class="about-title">武装大脑</view>
		<rich-text :nodes="info" class="about-content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:'',
			};
		},
		onLoad(){
			this.aboutUs()
		},
		methods:{
			aboutUs(){
				this.$Request.get(`/appSystemController.do?aboutUs`)
				.then(res => {
					if(res.code == 0 || res.code == 150){
						this.info = res.data.aboutUs.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
.about{
	width: 100%;
	text-align: center;
	padding: 150rpx 70rpx;
	box-sizing: border-box;
	.about-title{
		font-weight: bold;
		color: #333333;
		font-size: 36rpx;
		margin-bottom: 30rpx;
	}
	.about-content{
		color: #666;
		font-size: 28rpx;
		line-height: 50rpx;
	}
}
</style>
