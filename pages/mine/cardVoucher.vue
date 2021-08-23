<template>
	<view class="card">
		<view class="card-tab" :style="{top: showH5 ? '88rpx' : '0rpx'}">
			<view class="card-tab-li" @click="clickTab(index)"
			:class="{'card-tab-li-click': currentTab == index}"
			v-for="(item, index) in tabList" :key="index">{{item.name}}</view>
		</view>
		
		<view class="card-ul" v-if="currentTab == 0">
			<view class="card-ul-li" v-for="(item, index) in cardList" :key="index">
				<view class="card-ul-li-left">
					{{item.cardValue}}
					<text v-if="item.cardType == 2">点能量</text>
					<text v-if="item.cardType == 1">元</text>
				</view>
				<view class="card-ul-li-content">
					<image src='../../static/img/icons/red.png'></image>
				</view>
				<view class="card-ul-li-right">
					<view class="ul-li-right-title">
						<image :src="item.cardPic"></image>
						{{item.cardName}}
					</view>
					<view class="ul-li-right-status">到期时间：{{item.expiresDate}}</view>
				</view>
				<view class="card-ul-li-btn" v-if="item.cardType == 2" @click="chooseCard(item)">立即兑换</view>
				<view class="card-ul-li-btn" v-if="item.cardType == 1" @click="chooseMoney(item)">立即使用</view>
			</view>
			<no-data v-if="!cardList.length"></no-data>
		</view>
		<view class="card-ul" v-if="currentTab == 1">
			<view class="card-ul-li" v-for="(item, index) in wasteCardList" :key="index">
				<view class="card-ul-li-left">
					{{item.cardValue}}
					<text v-if="item.cardType == 2">点能量</text>
					<text v-if="item.cardType == 1">元</text>
				</view>
				<view class="card-ul-li-content">
					<image src='../../static/img/icons/red.png'></image>
				</view>
				<view class="card-ul-li-right">
					<view class="ul-li-right-title">
						<image :src="item.cardPic"></image>
						{{item.cardName}}
					</view>
					<view class="ul-li-right-status">使用时间：{{item.useDate || '暂无'}}</view>
				</view>
				<view class="card-ul-li-btn card-ul-li-btn-other">已兑换</view>
			</view>
			<no-data v-if="!wasteCardList.length"></no-data>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[{
					id:1,
					name:'我的卡券'
				},{
					id:2,
					name:'历史卡券'
				}],
				currentTab:0,
				showH5: true,
				cardList:[],//可用卡券
				wasteCardList: [], //历史卡券
				memberId: '',
			};
		},
		onShow(){
			if(navigator){
				this.showH5 = true
			}else{
				this.showH5 = false
			}
			this.memberId = JSON.parse(uni.getStorageSync('userInfo')).id
			this.getCardList()
		},
		methods:{
			// 获取当前页面的信息
			getCardList(){
				this.$Request.get(`/appCardController.do?getCardList&memberId=${this.memberId}`)
				.then(res => {
					if(res.code == 0){
						this.cardList =res.data.cardList.map(item => {
							return {
								...item,
								expiresDate: item.expiresDate && item.expiresDate.substring(0,10)
							}
						})
						this.wasteCardList = res.data.wasteCardList.map(item => {
							return {
								...item,
								useDate: item.useDate && item.useDate.substring(0,10)
							}
						})
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			clickTab(index){
				this.currentTab = index
			},
			// 立即领取
			chooseCard(item){
				let vm = this
				uni.showModal({
				    title: '立即兑换',
				    content: `立即获得${item.cardValue}点能量`,
					cancelText: '暂不兑换',
					confirmText: '立即兑换',
				    success: function (res) {
				        if (res.confirm) {
							vm.$Request.get(`/appCardController.do?useEnergyCard&memberId=${vm.memberId}&cardId=${item.id}`)
							.then(res => {
								if(res.code == 0){
									vm.getCardList()
								}else{
									uni.showToast({
										title: res.info,
										icon: 'none'
									})
								}
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			// 立即使用
			chooseMoney(item){
				uni.navigateTo({
					url:`/pages/mine/superMember?price=${item.cardValue}`
				})
			}
		}
	}
</script>

<style lang="scss">
.card{
	width: 100%;
	padding: 24rpx;
	box-sizing: border-box;
	padding-top: 100rpx;
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: $uni-color-primary;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		.top_view {
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			background-color: $uni-color-primary;
			top: 0;
			z-index: 999;
		}
	}
	.card-tab{
		position: fixed;
		left: 0;
		top: 88rpx;
		z-index: 999;
		display: flex;
		background-color: #FFFFFF;
		justify-content: space-around;
		width: 100%;
		line-height: 100rpx;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
		.card-tab-li{
			color: #666666;
			font-size: 32rpx;
		}
		.card-tab-li-click{
			font-size: 34rpx;
			color: $uni-color-primary;
			font-weight: bold;
		}
	}
	.card-ul{
		margin-top: 30rpx;
		width: 100%;
		.card-ul-li{
			width: 100%;
			margin-bottom: 20rpx;
			display: flex;
			border: 2rpx solid $uni-color-error;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			height: 180rpx;
			position: relative;
			box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
			.card-ul-li-left{
				width: 180rpx;
				height: 100%;
				background-color: $uni-color-error;
				text-align: center;
				line-height: 180rpx;
				color: #FFFFFF;
				font-size: 70rpx;
				text{
					font-size: 26rpx;
					font-weight: normal;
				}
			}
			.card-ul-li-content{
				width: 5rpx;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.card-ul-li-right{
				flex: 1;
				padding: 15rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				.ul-li-right-title{
					color: #333333;
					font-size: 32rpx;
					font-weight: bold;
					display: flex;
					image{
						width: 45rpx;
						height: 45rpx;
						margin-right: 10rpx;
					}
				}
				.ul-li-right-status{
					font-size: 26rpx;
					color: #666;
				}
			}
			.card-ul-li-btn{
				width: 140rpx;
				height: 60rpx;
				background: $uni-color-error;
				border-radius: 10rpx;
				line-height: 60rpx;
				color: #FFFFFF;
				text-align: center;
				position: absolute;
				right: 24rpx;
				top: 50%;
				transform: translateY(-50%);
				font-size: 26rpx;
			}
			.card-ul-li-btn-other{
				background: $uni-text-color-disable;
			}
		}
	}
}
</style>
