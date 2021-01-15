<template>
	<view class="img-card">
		<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @onSelected='onSelected'></ren-dropdown-filter>
		<view class="img-card-swiper">
			<!-- <swiper class="swiper" :circular="circular" :style="{height: swiperHeight+'rpx'}" v-if="showCard"
		   :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
			 <view class="swiper-item">
			  <view class="swiper-item-num">{{item.num}}</view>
			  <image :src="item.imgSrc" class="swiper-item-img"></image>
			  <view class="swiper-item-text">{{item.title}}</view>
			 </view>
			</swiper-item>
		   </swiper> -->
			<uni-swiper-dot :info="swiperList" :dotsStyles="dotsStyles" v-if="showCard" :current="current" field="title" mode="nav">
				<swiper class="swiper" @change="change" :style="{height: swiperHeight+'rpx'}">
					<swiper-item v-for="(item ,index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="swiper-item-num">{{item.num}}</view>
							<image :src="item.imgSrc" mode='widthFix' class="swiper-item-img"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>

			<!-- 列表 -->
			<view class="img-card-ul" :style="{height: swiperHeight+'rpx'}" v-if="!showCard">
				<view class="card-ul-li" v-for="(item ,index) in swiperList" :key="index">
					<view class="card-ul-li-left">
						<image :src="item.imgSrc"></image>
					</view>
					<view class="card-ul-li-right">
						<view class="ul-li-right-title">{{item.num}}</view>
						<view class="ul-li-right-detail">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="img-card-btn">
			<view class="card-btn-li card-btn-li-orange" @click="changeType">切换列表形式</view>
			<view class="card-btn-li card-btn-li-blue" @click="gotoUrl">前往测试</view>
		</view>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		components: {
			RenDropdownFilter,
			uniSwiperDot,
		},
		data() {
			return {
				filterData: [
					[{
						text: '1/10',
						value: 1
					}, {
						text: '2/10',
						value: 2
					}, {
						text: '3/10',
						value: 3
					}, {
						text: '4/10',
						value: 4
					}, {
						text: '5/10',
						value: 5
					}, {
						text: '6/10',
						value: 6
					}, {
						text: '7/10',
						value: 7
					}, {
						text: '8/10',
						value: 8
					}, {
						text: '9/10',
						value: 9
					}, {
						text: '10/10',
						value: 10
					}],
					[{
						text: '顺序',
						value: 1
					}, {
						text: '乱序',
						value: 2
					}, {
						text: '倒叙',
						value: 3
					}]
				],
				defaultIndex: [0, 0],
				indicatorDots: true,
				autoplay: false,
				circular: true,
				interval: 2000,
				duration: 500,
				dotsStyles: {
					color: 'black',
				},
				swiperList: [{
						imgSrc: '../../../static/img/icons/zhongjiang.png',
						title: '一件衣服',
						num: 1
					},
					{
						imgSrc: '../../../static/img/icons/shandian.png',
						title: '两只袜子',
						num: 2
					},
					{
						imgSrc: '../../../static/img/icons/zhongjiang.png',
						title: '一件衣服',
						num: 1
					},
					{
						imgSrc: '../../../static/img/icons/shandian.png',
						title: '两只袜子',
						num: 2
					},
					{
						imgSrc: '../../../static/img/icons/zhongjiang.png',
						title: '一件衣服',
						num: 1
					},
					{
						imgSrc: '../../../static/img/icons/shandian.png',
						title: '两只袜子',
						num: 2
					},
				],
				current: 0,
				swiperHeight: '', // swpier的高度
				cloneHeight: '', //站位标签高度
				showCard: false, // 是否展示card格式
				isShowModal: false, //弹窗部分
				modalTitle: '提示',
				userRemark: '', //自定义备注
				btnType: 'remark', // 判断点击的是备注还是图片
				modalImg:'',
				avatarShow: false
			}
		},
		mounted() {
			let vm = this
			uni.getSystemInfo({
				success: function(res) {
					let obj = uni.createSelectorQuery().select('.img-card-btn')
					obj.boundingClientRect(function(data) {
						let objSelect = uni.createSelectorQuery().select('.select-box')
						objSelect.boundingClientRect(function(response) {
							// console.log('windowHeight',res.windowHeight) 
							// console.log('data.height',data.height) 
							// console.log('response.height',response.height) 
							vm.swiperHeight = (res.windowHeight - data.height - response.height - 20) * 2
							vm.cloneHeight = data.height * 2
						}).exec()
					}).exec()
				}
			});
		},
		methods: {
			onSelected(res) {
				console.log(res)
			},
			change(e) {
				this.current = e.detail.current;
			},
			changeType() {
				this.showCard = !this.showCard
			},
			gotoUrl() {
				uni.navigateTo({
					url: '/pages/train/imageMemory/numImgTest'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
	}

	.img-card {
		width: 100%;
		height: calc(100vh-var(--status-bar-height));
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		padding-bottom: 120rpx;
		box-sizing: border-box;

		.img-card-swiper {
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			height: 100%;

			.card-swiper-block {
				width: 100%;
				height: 160rpx;
			}

			.swiper {
				width: 100%;
				background-color: #FFFFFF;
				border-radius: 15rpx;
				overflow: hidden;

				.swiper-item {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.swiper-item-num {
						background-color: #DDDDDD;
						height: 200rpx;
						line-height: 200rpx;
						text-align: center;
						font-size: 80rpx;
						font-weight: bold;
					}

					.swiper-item-img {
						width: 60%;
						margin: auto;
						display: block;
					}

					.swiper-item-text {
						color: #333333;
						font-weight: normal;
						text-align: center;
						font-size: 34rpx;
						background-color: #DDDDDD;
						height: 150rpx;
						line-height: 150rpx;
					}
				}
			}

			.img-card-ul {
				width: 100%;
				overflow: hidden;
				overflow-y: scroll;

				.card-ul-li {
					width: 100%;
					box-shadow: 1px 2px 6px 0px rgba(108, 143, 197, 0.3);
					border-radius: 15rpx;
					padding: 15rpx 30rpx;
					box-sizing: border-box;
					display: flex;
					background-color: #FFFFFF;
					margin-bottom: 20rpx;

					.card-ul-li-left {
						width: 200rpx;
						height: 200rpx;
						overflow: hidden;
						margin-right: 15%;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.card-ul-li-right {
						flex: 1;
						display: flex;
						height: 200rpx;
						justify-content: space-around;
						flex-direction: column;

						.ul-li-right-title {
							font-weight: bold;
							color: #333;
							font-size: 60rpx;
						}

						.ul-li-right-detail {
							color: #666;
							font-size: 30rpx;
						}
					}
				}
			}
		}

		.img-card-btn {
			width: 100%;
			display: flex;
			justify-content: space-between;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;
			height: 100rpx;
			line-height: 100rpx;

			.card-btn-li {
				width: 49.9%;
				text-align: center;
				color: #FFFFFF;
			}
			.card-btn-li-orange{
				background-color: $uni-color-warning;
			}
			.card-btn-li-blue{
				background-color: $uni-color-primary;
			}
		}
	}
</style>
