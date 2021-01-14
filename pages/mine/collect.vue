<template>
	<view class="discover">
		<view class="discover-top">
			<view class="discover-top-group">
				<text>我的文章</text>
				<text>分类管理 ></text>
			</view>
			<view class="wrap-select">
			  <input @input="bindNameInput" v-model="goodsName" 
			  type="text" placeholder="请输入搜索内容" placeholder-class="input-placeholder" class="input-length"/>
			  <view class="search-icon" @click="clickSearch">
			    <image src="../../static/img/icons/search.png"></image>
			  </view>
			</view>
			<my-scrollX
			:scrollList="scrollTopList" :currentTab="currentTopTab"
			:beforeColor="beforeColor" :afterColor="afterColor" @tabChange="tabChange"></my-scrollX>
		</view>
		
		<view class="discover-ul">
			<view class="discover-ul-li" @click="gotoUrl">
				<view class="ul-li-left">
					<image src='../../static/img/icons/bj.jpg'></image>
					<view class="ul-li-left-pos">记忆</view>
				</view>
				<view class="ul-li-right">
					<view class="li-right-title">标题标题标题标</view>
					<view class="li-right-author">作者：分手就分手</view>
					<view class="li-right-bottom">
						<view class="right-bottom-display">
							<view class="right-bottom-watch">
								<image src='../../static/img/icons/watch.png'></image>111
							</view>
							<view class="right-bottom-watch">
								<image src='../../static/img/icons/star1.png'></image>111
							</view>
							<view class="right-bottom-watch">
								<image src='../../static/img/icons/book.png'></image>111
							</view>
						</view>
						<view>2020-09-09</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myScrollX from '@/components/my-scrollX/my-scrollX.vue'
	export default {
		components: {
			myScrollX
		},
		data() {
			return {
				goodsName:'',
				scrollTopList:[{
					id:0,
					name: '推荐',
				},{
					id:1,
					name: '平台',
				},{
					id:2,
					name: '方法',
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
				beforeColor: '#666',
				afterColor: '#2E3B67',
			}
		},
		methods:{
			bindNameInput(e){
				this.goodsName = e.target.value
				console.log(e.target.value)
			},
			clickSearch(){
			},
			tabChange(item, index){
				this.currentTopTab = index
				console.log(item, index)
			},
			gotoUrl(){
				uni.navigateTo({
					url: '/pages/discover/discoverDetail'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: $uni-color-bg;
}
.discover{
	width: 100%;
	margin-top: -5rpx;
	.discover-top{
		width: 100%;
		background-color: #FFFFFF;
		padding: 30rpx 24rpx;
		padding-bottom: 24rpx;
		box-sizing: border-box;
		.discover-top-group{
			width: 100%;
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			color: $uni-color-primary;
			margin-bottom: 20rpx;
		}
		.wrap-select{
		  width: 100%;
		  height:70rpx;
		  line-height: 70rpx;
		  background:rgba(245,245,245,1);
		  border-radius:34rpx;
		  position: relative;
		  padding: 0 37rpx;
		  box-sizing: border-box;
		  margin-bottom: 30rpx;
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
	}
	.discover-ul{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		.discover-ul-li{
			box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
			width: 100%;
			background: #FFFFFF;
			border-radius: 15rpx;
			padding: 25rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			.ul-li-left{
				width: 100%;
				height: 240rpx;
				border-radius: 10rpx;
				overflow: hidden;
				position: relative;
				margin-bottom: 20rpx;
				border: 1px solid #f4f4f4;
				image{
					width: 100%;
					height: 100%;
				}
				.ul-li-left-pos{
					position: absolute;
					border-radius: 0rpx 0 0 30rpx;
					top: 0;
					right: 0;
					background-color: $uni-color-warning;
					color: #FFFFFF;
					font-size: 16rpx;
					text-align: center;
					height: 45rpx;
					line-height: 45rpx;
					padding: 0 25rpx;
					box-sizing: border-box;
				}
			}
			.ul-li-right{
				flex: 1;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				.li-right-title{
					font-weight: bold;
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}
				.li-right-author{
					font-size: 26rpx;
					color: #666;
					margin-bottom: 25rpx;
				}
				.li-right-bottom{
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color: #999;
					.right-bottom-display{
						display: flex;
						.right-bottom-watch{
							color: #999999;
							display: flex;
							line-height: 40rpx;
							margin-right: 30rpx;
							image{
								width: 40rpx;
								height: 40rpx;
								margin-right: 10rpx;
							}
						}
					}
				}
			}
		}
	}
}
</style>
