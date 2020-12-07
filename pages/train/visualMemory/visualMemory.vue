<template>
	<view class="memory">
		<view class="memory-top">
			<view class="wrap-select">
			  <input @input="bindNameInput" v-model="goodsName" 
			  type="text" placeholder="请输入搜索内容" placeholder-class="input-placeholder" class="input-length"/>
			  <view class="search-icon" @click="clickSearch">
			    <image src="../../../static/img/icons/search.png"></image>
			  </view>
			</view>
			<scroll-view scroll-x="true" class="memory-scroll">
				<view class="memory-scroll-li"  @tap="clickTopTab(index)"
				 :class="{'memory-scroll-li-active':currentTopTab == index}"
				v-for="(item, index) in scrollTopList" :key="index">{{item.name}}</view>
			</scroll-view>
		</view>
		<scroll-view scroll-x="true" class="memory-scroll-tab">
			<view class="memory-scroll-li"  @tap="clickBottomTab(index)"
			 :class="{'memory-scroll-li-active':currentBottomTab == index}"
			v-for="(item, index) in scrollBottomList" :key="index">{{item.name}}</view>
		</scroll-view>
		<view class="memory-ul">
			<view class="memory-ul-li">
				<image class="memory-ul-li-img" src='../../../static/img/icons/zhongjiang.png'></image>
				<view class="memory-ul-li-text">数字图像视觉训练</view>
			</view>
			<view class="memory-ul-li">
				<image class="memory-ul-li-img" src='../../../static/img/icons/zhongjiang.png'></image>
				<view class="memory-ul-li-text">数字图像</view>
			</view>
			<view class="memory-ul-li">
				<image class="memory-ul-li-img" src='../../../static/img/icons/zhongjiang.png'></image>
				<view class="memory-ul-li-text">数字图像视觉训练</view>
			</view>
			<view class="memory-ul-li">
				<image class="memory-ul-li-img" src='../../../static/img/icons/zhongjiang.png'></image>
				<view class="memory-ul-li-text">数字图像视觉训练</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsName:'',
				scrollTopList:[{
					id:0,
					name: '常用专题',
				},{
					id:1,
					name: '基础元素',
				},{
					id:2,
					name: '少儿启蒙',
				},{
					id:3,
					name: '语言记忆',
				},],
				currentTopTab: 0,
				scrollBottomList:[{
					id:0,
					name: '数字',
				},{
					id:1,
					name: '英文',
				},{
					id:2,
					name: '周易',
				},{
					id:3,
					name: '历史',
				},],
				currentBottomTab: 0,
			};
		},
		methods:{
			bindNameInput(e){
				this.goodsName = e.target.value
				console.log(e.target.value)
			},
			clickSearch(){
			},
			// 导航切换
			clickTopTab(index) {
				if (this.currentTopTab == index) {
					return false
				} else {
					this.currentTopTab = index
				}
				this.currentBottomTab = 0
			},
			clickBottomTab(index) {
				if (this.currentBottomTab == index) {
					return false
				} else {
					this.currentBottomTab = index
				}
			},
		}
	}
</script>

<style lang="scss">
.memory{
	width: 100%;
	.memory-top{
		width: 100%;
		background-color: $uni-color-primary;
		padding: 24rpx;
		box-sizing: border-box;
		.wrap-select{
		  width: 100%;
		  height:70rpx;
		  line-height: 70rpx;
		  background:rgba(245,245,245,1);
		  border-radius:34rpx;
		  position: relative;
		  padding: 0 37rpx;
		  box-sizing: border-box;
		  margin-bottom: 40rpx;
		  .input-length{
		    width: 90%;
		    height: 100%;
		    line-height: 70rpx;
		    font-size: 28rpx;
		  }
		  .input-placeholder{
		    font-size: 26rpx;
		    color: #A1A1A1;
		  }
		  .search-icon{
		    width: 35rpx;
		    height: 35rpx;
		    position: absolute;
		    top: 50%;
		    right: 34rpx;
		    transform: translateY(-50%);
		    text-align: center;
		    z-index: 999;
		  }
		  .search-icon image{
		    width: 90%;
		    height: 90%;
		    margin: auto;
		    display: inline;
		  }
		}
		.memory-scroll{
			width: 100%;
			white-space: nowrap;
			.memory-scroll-li{
				display: inline-block;
				color: #FFFFFF;
				font-size: 30rpx;
				margin-right: 30rpx;
			}
			.memory-scroll-li-active{
				font-weight: bold;
				font-size: 32rpx;
			}
		}
	}
	.memory-scroll-tab{
		width: 100%;
		white-space: nowrap;
		background-color: #fff;
		line-height: 80rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
		.memory-scroll-li{
			display: inline-block;
			color: #666666;
			font-size: 24rpx;
			margin-right: 30rpx;
		}
		.memory-scroll-li-active{
			font-weight: bold;
			font-size: 26rpx;
			color: #333333;
		}
	}
	.memory-ul{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 40rpx;
		padding-left: 2%;
		.memory-ul-li{
			text-align: center;
			width: 29%;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			box-shadow:0px 2px 10px 0px #b9c5e6;
			padding: 20rpx 10rpx;
			box-sizing: border-box;
			margin: 2%;
			.memory-ul-li-img{
				width: 150rpx;
				height: 150rpx;
				margin: auto;
				margin-bottom: 5rpx;
			}
			.memory-ul-li-text{
				font-size: 24rpx;
				font-weight: bold;
				color: #666666;
			}
		}
	}
}
</style>
