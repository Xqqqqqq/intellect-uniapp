<template>
	<view class="history">
		<picker mode='date' fields="month" @change="changeDate">
			<view class="history-picker">
				<view class="history-picker-left">日期选择</view>
				<view class="history-picker-right" v-if="chooseDate">{{chooseDate}} ></view>
				<view class="history-picker-right" v-else>请选择 ></view>
			</view>
		</picker>
		
		<view class="history-li" v-for="(item, index) in historyList" :key="index" @click="gotoDetail(item)">
			<view class="history-li-top">
				<view class="li-top-left">{{item.billRemarks}}</view>
				<view class="li-top-right"><text>￥</text>{{item.truePrice}}</view>
			</view>
			<view class="history-li-bottom">购买时间：{{item.createDate}}</view>
		</view>
		<no-data v-if="!historyList.length"></no-data>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chooseDate:'',
				historyList:[],
			};
		},
		mounted(){
			let date = new Date();
			let nowYear = date.getFullYear()
			// 获取当前月份
			let nowMonth = date.getMonth() + 1;
			// 对月份进行处理，1-9月在前面添加一个“0”
			if (nowMonth >= 1 && nowMonth <= 9) {
			   nowMonth = "0" + nowMonth;
			}
			this.chooseDate = `${nowYear}-${nowMonth}`
			this.getBuyVipList()
		},
		methods:{
			// 获取当前页面的信息
			getBuyVipList(){
				this.openid = uni.getStorageSync('openid') ? uni.getStorageSync('openid') : ''
				this.$Request.get(`/appVipController.do?getBuyVipList&openid=${this.openid}&dateString=${this.chooseDate}`)
				.then(res => {
					if(res.code == 0){
						this.historyList = res.data.billList
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			changeDate(e){
				this.chooseDate = e.detail.value
				this.getBuyVipList()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:`/pages/mine/historyDetail?billId=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
.history{
	width: 100%;
	.history-picker{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 24rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
		margin-bottom: 20rpx;
		.history-picker-left{
			font-size: 28rpx;
			color: $uni-color-primary;
			font-weight: bold;
		}
		.history-picker-right{
			font-size: 28rpx;
			color: #666666;
			font-weight: bold;
		}
	}
	.history-li{
		width: 100%;
		background-color: #FFFFFF;
		border-bottom: 1px solid #D3D3D3;
		padding: 24rpx;
		box-sizing: border-box;
		.history-li-top{
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.li-top-left{
				font-size: 32rpx;
				font-weight: bold;
			}
			.li-top-right{
				font-size: 40rpx;
				font-weight: bold;
				color: $uni-color-error;
				text{
					font-size: 28rpx;
				}
			}
		}
		.history-li-bottom{
			color: #666666;
			font-size: 26rpx;
		}
	}
}
</style>
