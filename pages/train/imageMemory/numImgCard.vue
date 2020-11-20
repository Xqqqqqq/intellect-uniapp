<template>
	<view class="img-card">
		<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex'
		@onSelected='onSelected'></ren-dropdown-filter>
		<view class="img-card-swiper">
			<view class="card-swiper-block"></view>
			<!-- <swiper class="swiper" :circular="circular"
			:indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<view class="swiper-item">
						<view class="swiper-item-num">{{item.num}}</view>
						<image :src="item.imgSrc" class="swiper-item-img"></image>
						<view class="swiper-item-text">{{item.title}}</view>
					</view>
				</swiper-item>
			</swiper> -->
			<uni-swiper-dot :info="swiperList" :dotsStyles="dotsStyles" 
			:current="current" field="title" mode="nav">
			    <swiper class="swiper" @change="change">
			        <swiper-item v-for="(item ,index) in swiperList" :key="index">
			            <view class="swiper-item">
			            	<view class="swiper-item-num">{{item.num}}</view>
			            	<image :src="item.imgSrc" class="swiper-item-img"></image>
			            	<!-- <view class="swiper-item-text">{{item.title}}</view> -->
			            </view>
			        </swiper-item>
			    </swiper>
			</uni-swiper-dot>
		</view>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		components:{
			RenDropdownFilter,
			uniSwiperDot
		},
		data() {
			return {
				filterData:[
					[{ text: '1-10', value: 1 }, { text: '11-20', value: 2 }],
					[{ text: '系统图片', value: 1 }, { text: '用户上传图片', value: 2 }],
					[{ text: '系统备注', value: 1 }, { text: '用户上传备注', value: 2 }],
					[{ text: '顺序', value: 1 }, { text: '倒叙', value: 2 }]
				],
				defaultIndex:[0,0,0,0],
				indicatorDots: true,
				autoplay: false,
				circular: true,
				interval: 2000,
				duration: 500,
				dotsStyles:{
					
				},
				swiperList:[
					{
						imgSrc:'../../../static/img/icons/zhongjiang.png',
						title: '一件衣服',
						num: 1
					},
					{
						imgSrc:'../../../static/img/icons/shandian.png',
						title: '两只袜子',
						num: 2
					},
				],
				current: 0,
				mode: 'round',
			}
		},
		onLoad() {

		},
		methods: {
			onSelected(res){
				console.log(res)
			},
			change(e) {
				this.current = e.detail.current;
			}

		}
	}
</script>

<style lang="scss">
.img-card{
	width: 100%;
	.img-card-swiper{
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		.card-swiper-block{
			width: 100%;
			height: 160rpx;
		}
		.swiper{
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			height: 800rpx;
			overflow: hidden;
			.swiper-item{
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.swiper-item-num{
					background-color: #DDDDDD;
					height: 200rpx;
					line-height: 200rpx;
					text-align: center;
					font-size: 80rpx;
					font-weight: bold;
				}
				.swiper-item-img{
					width: 60%;
					margin: auto;
					display: block;
					// height: 200rpx;
				}
				.swiper-item-text{
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
	}
}
</style>
