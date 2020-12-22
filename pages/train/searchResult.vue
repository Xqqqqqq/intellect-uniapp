<template>
	<view class="wrap">
		<view class="wrap-check-top">
			<view class="wrap-check-top-tab">
				<view v-for="(item, index) in tabList" :key="index" @tap="clickTab(index)" 
				class="check-top-tab-li" :class="{'check-top-tab-active':currentTab == index}">{{item.title}}</view>
			</view>
			<top-input :placeholderText="placeholderText" @changeInput="changeInput"></top-input>
		</view>
		<view class="wrap-box">
			<view class="wrap-box-li" @click="gotoUrl">
				<view class="box-li-img">
					<image src="../../static/img/tabs/faxian-blue.png"></image>
				</view>
				<view class="box-li-text">数字图像关联训练</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TopInput from '@/components/top-input/top-input.vue'
	export default {
		components: {
			TopInput,
		},
		data() {
			return {
				tabList: [
					{
						id: 0,
						title: '全部专题',
						requestUrl: '/orderCenter/getAll'
					},
					{
						id: 1,
						title: '全部分类',
						requestUrl: '/orderCenter/getWaitConfirm'
					},
				],
				currentTab:0,
				placeholderText: '请输入搜索内容',
				changeValue: '',
			};
		},
		onLoad(options){
			console.log(options)
			this.changeValue = options.name
		},
		methods:{
			clickTab(index){
				if (this.currentTab == index) {
					return false
				} else {
					this.currentTab = index
				}
			},
			changeInput(value){
				this.changeValue = value
			},
			gotoUrl(){
				uni.navigateTo({
					url: '/pages/train/imageMemory/numImgCard'
				})
			}
		}
	}
</script>

<style lang="scss">
.wrap-check-top {
	width: 100%;
	padding-top: 35rpx;
	box-sizing: border-box;
	background-color: #ffffff;
	margin-bottom: 30rpx;
	box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
}
.wrap-check-top-tab {
	width: 100%;
	padding: 0 58rpx;
	padding-bottom: 23rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-around;
	/* margin-bottom: 5rpx; */
}
.check-top-tab-li {
	font-size: 28rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: rgba(42, 42, 42, 1);
	line-height: 1;
	position: relative;
}
.check-top-tab-li:after {
	position: absolute;
	content: '';
	width: 50rpx;
	left: 50%;
	transform: translateX(-50%);
	bottom: -23rpx;
	height: 8rpx;
	background-color: #FFFFFF;
	-webkit-transform-origin: center bottom;
	transform-origin: center bottom;
}
.check-top-tab-active {
}
.check-top-tab-active:after {
	position: absolute;
	content: '';
	width: 50rpx;
	left: 50%;
	transform: translateX(-50%);
	bottom: -23rpx;
	height: 8rpx;
	background-color: rgba(71, 124, 252, 1);
	-webkit-transform-origin: center bottom;
	transform-origin: center bottom;
}
.wrap-box{
	display: flex;
	width: 100%;
	background-color: #FFFFFF;
	padding: 25rpx;
	box-sizing: border-box;
	box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
	flex-wrap: wrap;
	.wrap-box-li{
		text-align: center;
		margin-right: 7%;
		margin-bottom: 30rpx;
		max-width: 30%;
		.box-li-img{
			width: 100rpx;
			height: 100rpx;
			margin: auto;
			margin-bottom: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.box-li-text{
			font-weight: bold;
			font-size: 20rpx;
			color: #333333;
		}
	}
	.wrap-box-li:nth-child(3n){
		margin-right: 0;
	}
}
</style>
