<template>
	<view class="wrap">
		<view class="wrap-top">
			<view class="wrap-top-box">
				<view class="top-box-li" @click="gotoUrl('/pages/myData/calendar')">
					<view class="top-box-li-title">本月签到</view>
					<view class="top-box-li-num">0</view>
				</view>
				<view class="top-box-li" @click="gotoUrl('/pages/myData/train')">
					<view class="top-box-li-title">本月训练</view>
					<view class="top-box-li-num">0</view>
				</view>
				<view class="top-box-li" @click="gotoUrl('/pages/myData/longestSeries')">
					<view class="top-box-li-title">本月连续</view>
					<view class="top-box-li-num">0</view>
				</view>
			</view>
			<view class="wrap-top-tip animated">决胜于碎片化时间的利用</view>
		</view>
		
		<view class="wrap-bottom">
			<view class="wrap-bottom-title">
				<text>我的训练</text>
				<text @click="gotoUrl('/pages/myData/groupManage')">分组管理 ></text>
			</view>
			<top-input class="top-input" :changeValue="changeValue" :placeholderText="placeholderText" @changeInput="changeInput"></top-input>
			<my-scrollX 
			:scrollList="scrollTopList" :currentTab="currentTopTab"
			:beforeColor="beforeColor" :afterColor="afterColor" @tabChange="tabChange"></my-scrollX>
		</view>
		
		<view class="wrap-content">
			<my-list :myList="listdetial" @gotoUrl="gotoListDetail"></my-list>
			<no-data v-if="status == 'noMore' && !listdetial.length"></no-data>
			<uni-load-more class="no-data-more" v-else iconType="circle" :color="'#CCCCCC'" :contentText="contentText" :status="status" />
		</view>
	</view>
</template>

<script>
	import myScrollX from '@/components/my-scrollX/my-scrollX.vue'
	import TopInput from '@/components/top-input/top-input.vue'
	import MyList from '@/components/my-list/my-list.vue'
	export default {
		components: {
			myScrollX,
			TopInput,
			MyList,
		},
		data() {
			return {
				scrollTopList:[{
					id:0,
					name: '无分类',
				},{
					id:1,
					name: '英语',
				},{
					id:2,
					name: '记忆',
				},{
					id:3,
					name: '医疗',
				},{
					id:4,
					name: '法律',
				},{
					id:3,
					name: '少儿',
				},],
				currentTopTab: 0,
				beforeColor: '#666666',
				afterColor: '#2E3B67',
				placeholderText: '请输入搜索内容',
				changeValue: '',
				listdetial:[{
					src:'../../static/img/icons/common.jpg',
					title: '数字图像记忆',
					source: '官方',
					person: '100',
					detail: '简介：针对0~100的数字进行图像',
					date: '2020-10-10',
					num: 20
				},{
					src:'../../static/img/icons/common.jpg',
					title: '数字图像记忆',
					source: '官方',
					person: '100',
					detail: '简介：针对0~100的数字进行图像',
					date: '2020-10-10',
					num: 20
				}],
				page:1,
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '- 暂时没有新内容了呢 -'
				},
				status: 'loading',
			};
		},
		onPullDownRefresh() {
			this.page = 1;
			this.listdetial = [];
			// uni.showLoading({
			// 	title: '加载中'
			// });
			// uni.hideLoading();
		},
		methods:{
			tabChange(item, index){
				this.currentTopTab = index
				console.log(item, index)
			},
			changeInput(value){
				console.log(value)
				this.changeValue = value
			},
			gotoListDetail(item){
				console.log(item)
				uni.navigateTo({
					url: '/pages/train/imageMemory/numEleEntry'
				})
			},
			gotoUrl(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	background-color: $uni-color-bg;
}
.wrap{
	width: 100%;
	.wrap-top{
		width: 100%;
		background-color: $uni-color-primary;
		padding: 30rpx 0;
		box-sizing: border-box;
		margin-top: -10rpx;
		.wrap-top-box{
			padding: 40rpx 0;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-bottom: 10rpx;
			.top-box-li{
				text-align: center;
				color: #FFFFFF;
				.top-box-li-title{
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				.top-box-li-num{
					font-size: 28rpx;
				}
			}
		}
		.wrap-top-tip{
			text-align: center;
			color: #FFFFFF;
			animation: flash 3s infinite;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.wrap-content{
		width: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
	}
	.wrap-bottom{
		background-color: #fff;
		padding: 30rpx 24rpx;
		padding-bottom: 0rpx;
		box-sizing: border-box;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
		.top-input{
			margin-bottom: 40rpx;
			border: 1px solid $uni-border-color;
		}
		.wrap-bottom-title{
			width: 100%;
			display: flex;
			justify-content: space-between;
			color: $uni-text-color;
			font-size: 28rpx;
			margin-bottom: 30rpx;
			font-weight: bold;
		}
	}
}
</style>
