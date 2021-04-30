<template>
	<view style="height: 100vh;">
		<view class="img-card" v-if="code == '0'">
			<view class="card-filter">
				<picker @change="bindNumChange" :value="numIndex" :range="numList">
					<text class="card-filter-li">{{numList[numIndex]}}</text>
				</picker>
				<picker @change="bindOrderChange" :value="orderIndex" :range="orderList" range-key="title">
					<text class="card-filter-li">{{orderList[orderIndex].title}}</text>
				</picker>
			</view>
			<view class="img-card-swiper">
				<swiper class="swiper" :circular="circular" v-if="showCard" @change="change" :current="numIndex"
			   :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item">
						  <view class="swiper-item-num">
								{{item.sorts}}
								<text class="item-num-tip">元素</text>
						  </view>
						  <image :src="item.optionPic" class="swiper-item-img" mode="widthFix"></image>
						  <view class="swiper-item-text">
								{{item.optionContent}}
								<text class="item-num-tip">备注</text>
						  </view>
						 </view>
					</swiper-item>
			   </swiper>
		
				<!-- 列表 -->
				<view class="img-card-ul" v-if="!showCard">
					<view :class="{'card-ul-li-choose' : numIndex == index}" class="card-ul-li"
					v-for="(item ,index) in swiperList" :key="index" @click="clickLi(index)">
						<view class="card-ul-li-left">
							<image :src="item.optionPic"></image>
						</view>
						<view class="card-ul-li-right">
							<view class="ul-li-right-title">{{item.sorts}}</view>
							<view class="ul-li-right-detail">{{item.optionContent}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="img-card-btn">
				<view class="card-btn-li card-btn-li-orange" @click="changeType">切换列表形式</view>
				<view class="card-btn-li card-btn-li-blue" @click="gotoUrl">前往测试</view>
			</view>
		</view>
		<view style="padding-top: 200rpx;" v-if="code != '0'">
			<no-data></no-data>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: false,
				circular: true,
				interval: 2000,
				duration: 500,
				dotsStyles: {
					color: 'black',
				},
				swiperList: [],
				current: 0,
				showCard: true, // 是否展示card格式
				collectsId: '402aa38151aef50c0151aef50c2600cc',
				memberId: '',
				orderType: 1,
				optionId: '',
				numList:[],
				numIndex:0,
				orderList:[{
					id:1,
					title:"顺序"
				},{
					id:2,
					title:"倒序"
				},{
					id:3,
					title:"乱序"
				},],
				orderIndex:0,
				code: '',
			}
		},
		onLoad(options) {
			console.log(options)
			this.memberId = JSON.parse(uni.getStorageSync('userInfo')).id
			if(options.collectsId){
				this.collectsId = options.collectsId
			}
			this.startPractice()
		},
		methods: {
			startPractice(){
				this.$Request.get(`/appOptionController.do?startPractice&memberId=${this.memberId}&collectsId=${this.collectsId}`)
				.then(res => {
					this.code = res.code
					console.log('123434',this.code)
					if(res.code == 0){
						for(let i =0; i< res.data.listNum; i++){
							this.numList.push(`${i+1}/${res.data.listNum}`)
						}
						this.swiperList = res.data.optionList
						this.optionId = res.data.optionVo.id
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			getPracticeOptionList(){
				this.$Request.get(`/appOptionController.do?getPracticeOptionList`,{
					memberId: this.memberId,
					collectsId: this.collectsId,
					orderType: this.orderType,
					optionId: this.optionId,
				})
				.then(res => {
					if(res.code == 0){
						for(let i =0; i< res.data.listNum; i++){
							this.numList.push(`${i+1}/${res.data.listNum}`)
						}
						this.swiperList = res.data.optionList
						this.optionId = res.data.option.id
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			bindNumChange(e){
				this.numIndex = e.detail.value
			},
			bindOrderChange(e){
				this.orderIndex = e.detail.value
				this.orderType = this.orderList[e.detail.value].id
				this.getPracticeOptionList()
			},
			change(e) {
				this.numIndex = e.detail.current;
				this.optionId = this.swiperList[e.detail.current].id
			},
			clickLi(index){
				this.numIndex = index;
				this.optionId = this.swiperList[index].id
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
		height: 100%;
	}

	.img-card {
		width: 100%;
		height: calc(100vh - var(--status-bar-height));
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		box-sizing: border-box;
		
		.card-filter {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			width: 100%;
			display: flex;
			justify-content: space-around;
			background-color: #FFFFFF;
			line-height: 120rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: $uni-color-primary;
			box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, 0.3);
			.card-filter-li{
				border-bottom: 6rpx solid $uni-color-primary;
				padding-bottom: 10rpx;
				box-sizing: border-box;
			}
		}

		.img-card-swiper {
			width: 100%;
			padding: 140rpx 24rpx 100rpx 24rpx;
			box-sizing: border-box;
			height: calc(100vh - var(--status-bar-height));
			overflow-y: scroll;

			.swiper {
				width: 100%;
				background-color: #FFFFFF;
				border-radius: 15rpx;
				overflow: hidden;
				height: 100%;

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
						position: relative;
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
						height: 250rpx;
						line-height: 250rpx;
						position: relative;
					}
					.item-num-tip{
						position: absolute;
						left: 24rpx;
						top: 40rpx;
						font-size: 26rpx;
						font-weight: bold;
						color: #333333;
						line-height: 1;
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
							width: 100%;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
				}
				.card-ul-li-choose{
					border: 1rpx solid $uni-color-primary;
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
			z-index: 9;
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
