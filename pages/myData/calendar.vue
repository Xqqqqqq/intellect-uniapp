<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		<view class="all-bg"></view>
		<view class="all-calendar">
			<view class="all-calendar-box">
				<ss-calendar
				  :checks="checks"
				  @current-month-day="onSignIn"
				  @prev-month-day="onPrev"
				  @next-month-day="onNext"
				/>
			</view>
			<view class="all-calendar-btn">
				<view class="calendar-btn-li btn-li-red">累计{{trainInfo.energyNum}}格能量</view>
				<view class="calendar-btn-li btn-li-olive" v-if="trainInfo.ifSign == 0" @click="onSignInBtn">今日签到</view>
				<view class="calendar-btn-li btn-li-grey" v-if="trainInfo.ifSign == 1" @click="onSignInBtn">已签到</view>
			</view>
			<view class="calendar-btn-other">
				<view class="btn-other-left">1天会员体验</view>
				<view class="btn-other-right">领取（<image src='../../static/img/icons/shandian.png'></image> X1）</view>
			</view>
			<view class="calcendar-rule">
				<view class="train-title">
					<view class="train-title-box">签到规则</view>
				</view>
				<view class="calcendar-rule-text">1.就腐蚀雕刻路径飞升渡劫飞升渡劫副教授副教授的假分数带分数考虑到金粉世家风尚大奖</view>
				<view class="calcendar-rule-text">1.就腐蚀雕刻路径飞升渡劫飞升渡劫副教授副教授的假分数带分数考虑到金粉世家风尚大奖</view>
				<view class="calcendar-rule-text">1.就腐蚀雕刻路径飞升渡劫飞升渡劫副教授副教授的假分数带分数考虑到金粉世家风尚大奖</view>
			</view>
			<view class="calcendar-pos animated" @click="gotoUrl('/pages/myData/share')">
				<image src="../../static/img/icons/zhongjiang.png"></image>
				<view>分享获能量</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ssCalendar from '@/components/ss-calendar/ss-calendar.vue'
	export default {
		components: {
		  ssCalendar
		},
		data() {
			return {
				checks: [],
				today: '',
				memberId: '',
				trainInfo:{}
			};
		},
		mounted(){
			this.memberId = JSON.parse(uni.getStorageSync('userInfo')).id
			this.getMemberSignRecord()
		},
		methods: {
			// 获取签到记录
			getMemberSignRecord(){
				this.$Request.postT('/appSignController.do?getMemberSignRecord',{
					memberId: this.memberId
				}).then(res => {
					if(res.code == 0){
						this.trainInfo = res.data
						this.checks = res.data.signList
					}else{
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			gotoUrl(url){
				uni.navigateTo({
					url: url
				})
			},
			onSignInBtn(){ // 用户签到
				this.$Request.postT('/appSignController.do?memberTodaySign',{
					memberId: this.memberId
				}).then(res => {
					if(res.code == 0){
						this.getMemberSignRecord()
					}
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				})
			},
			onSignIn(payload) {
			  const { checked, year, month, day, isToday } = payload
			  // !checked && this.checks.push(`${year}-${month}-${day}`)
			  if(isToday == true && !checked){
				  this.$Request.postT('/appSignController.do?memberTodaySign',{
				  	memberId: this.memberId
				  }).then(res => {
				  	if(res.code == 0){
						this.getMemberSignRecord()
				  	}
				  	uni.showToast({
				  		title: res.info,
				  		icon: 'none'
				  	})
				  })
			  }else if(isToday == true && checked){
				  uni.showToast({
				  	title: '今天已经签过到了，不能重复签到',
				  	icon: 'none'
				  })
			  }else{
				  uni.showToast({
				  	title: '只可签到当日日期！',
				  	icon: 'none'
				  })
			  }
			  console.log('onSignIn', payload)
			},
			onPrev(payload) {
			  console.log('onPrev', payload)
			},
			onNext(payload) {
			  console.log('onNext', payload)
			},
		}
	}
</script>

<style lang="scss">
	.all {
		.all-bg{
			width: 100%;
			height: 500rpx;
			background-color: $uni-color-primary;
			position: fixed;
			left: 0;
			top:0;
			z-index: 1;
		}
		.all-calendar{
			width: 90%;
			margin: auto;
			position: relative;
			z-index: 10;
			margin-top: 5%;
			.all-calendar-box{
				width: 100%;
				border-radius: 20rpx;
				box-shadow:0px 2px 10px 0px rgba(108,143,197,0.4);
				overflow: hidden;
			}
			.all-calendar-btn{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
				.calendar-btn-li{
					width: 45%;
					text-align: center;
					line-height: 70rpx;
					color: #FFFFFF;
					border-radius: 10rpx;
					font-size: 26rpx;
					font-weight: bold;
				}
				.btn-li-red{
					color: #0081ff;
					background-color: #cce6ff;
				}
				.btn-li-olive{
					color: #8dc63f;
					background-color: #e8f4d9;
				}
				.btn-li-grey{
					background-color: #8799a3;
					color: #ffffff;
				}
			}
			.calendar-btn-other{
				width: 100%;
				border-radius: 20rpx;
				margin-top: 30rpx;
				background-image: linear-gradient(45deg, #ff9700, #ed1c24);
				color: #ffffff;
				position: relative;
				padding: 0 30rpx;
				line-height: 150rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				.btn-other-right{
					position: absolute;
					right: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					background-color: #fff;
					width: 230rpx;
					line-height: 60rpx;
					border-radius: 20rpx;
					color: $uni-color-error;
					text-align: center;
					image{
						width: 35rpx;
						height: 35rpx;
					}
				}
			}
		}
		.calcendar-pos{
			position: fixed;
			right: 24rpx;
			bottom: 10%;
			text-align: center;
			color: $uni-color-error;
			font-size: 26rpx;
			font-weight: bold;
			animation: bounce 1s infinite;
			image{
				display: inline-block;
				width: 80rpx;
				height: 80rpx;
			}
		}
		.calcendar-rule{
			width: 100%;
			padding-bottom: 80rpx;
			box-sizing: border-box;
			.train-title{
				width: 100%;
				padding: 30rpx 20rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				font-weight: bold;
				color: $uni-text-color;
				.train-title-box{
					padding-left: 15rpx;
					box-sizing: border-box;
					border-left: 6rpx solid $uni-color-primary;
				}
			}
			.calcendar-rule-text{
				line-height: 40rpx;
				color: #666666;
				font-size: 24rpx;
				width: 100%;
				padding: 0rpx 20rpx;
			}
		}
	}
</style>
