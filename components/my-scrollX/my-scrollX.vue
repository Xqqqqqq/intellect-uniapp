<template>
	<scroll-view scroll-x="true" class="my-scroll">
		<view @tap="clickTab(item, index)"
		class="my-scroll-li"
		:class="{'my-scroll-li-active':currentTab == index}"
		:style="{color: currentTab == index ? afterColor : beforeColor, 'border-bottom': currentTab == index ? `5rpx solid ${afterColor}` : ''}"
		v-for="(item, index) in scrollList" :key="index">{{item.name}}</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			// 滚动数组
			scrollList: {
				type: Array,
				default: []
			},
			currentTab: {
				type: Number,
				default: 0
			},
			beforeColor:{
				type: String,
				default: ""
			},
			afterColor:{
				type: String,
				default: ""
			},
		},
		data() {
			return {
			};
		},
		methods:{
			clickTab(item, index){
				this.$emit('tabChange', item,index)
			}
		}
	}
</script>

<style lang="scss">
.my-scroll{
	width: 100%;
	white-space: nowrap;
	.my-scroll-li{
		display: inline-block;
		color: #FFFFFF;
		font-size: 30rpx;
		margin-right: 45rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
		// border-bottom: 5rpx solid #FFFFFF;
	}
	.my-scroll-li-active{
		font-weight: bold;
		font-size: 32rpx;
	}
}
</style>
