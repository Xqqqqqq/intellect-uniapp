<template>
	<view class="discover">
		<view class="wrap-select">
		  <input @input="bindNameInput" v-model="goodsName" 
		  type="text" placeholder="请输入搜索内容" placeholder-class="input-placeholder" class="input-length"/>
		  <view class="search-icon" @click="clickSearch">
		    <image src="../../static/img/icons/search.png"></image>
		  </view>
		</view>
		<swiper class="swiper-content" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in imgList" :key="index">
				<view class="swiper-item">
					<image :src="item"></image>
					<view class="swiper-item-text">这里是标题</view>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="discover-ul">
			<view class="discover-ul-li">
				<view class="ul-li-left">
					<image src="../../static/img/tabs/faxian-blue.png"></image>
					<view class="ul-li-left-pos">记忆</view>
				</view>
				<view class="ul-li-right">
					<view class="li-right-title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
					<view class="li-right-bottom">
						<view class="right-bottom-left">纸飞机</view>
						<view class="right-bottom-watch">
							<image src='../../static/img/icons/watch.png'></image>111
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsName:'',
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				imgList:[
					'../../static/img/icons/search.png',
					'../../static/img/icons/search.png',
					'../../static/img/icons/search.png',
				]
			}
		},
		methods:{
			bindNameInput(e){
				this.goodsName = e.target.value
				console.log(e.target.value)
			},
			clickSearch(){
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.discover{
	width: 100%;
	padding:40rpx 25rpx;
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
	.swiper-content{
		width: 100%;
		height: 320rpx;
		overflow: hidden;
		border-radius: 20rpx;
		background-color: $uni-color-primary;
		.swiper-item{
			width: 100%;
			height: 100%;
			position: relative;
			image{
				width: 100%;
				height: 100%;
			}
			.swiper-item-text{
				background-color: rgba(0, 0, 0, 0.3);
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
				text-align: center;
				color: #FFFFFF;
				font-size: 26rpx;
				font-weight: bold;
				height: 70rpx;
				line-height: 70rpx;
				z-index: 999;
				overflow: hidden;
				text-overflow:ellipsis; 
				white-space: nowrap;
			}
		}
	}
	.discover-ul{
		width: 100%;
		margin-top: 30rpx;
		.discover-ul-li{
			box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
			width: 100%;
			background: #FFFFFF;
			border-radius: 15rpx;
			padding: 33rpx 25rpx;
			box-sizing: border-box;
			display: flex;
			margin-bottom: 20rpx;
			.ul-li-left{
				width: 210rpx;
				height: 210rpx;
				border-radius: 10rpx;
				overflow: hidden;
				position: relative;
				margin-right: 30rpx;
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
					background-color: $uni-color-primary;
					color: #FFFFFF;
					font-size: 16rpx;
					text-align: center;
					height: 45rpx;
					line-height: 45rpx;
					padding: 0 15rpx;
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
				}
				.li-right-bottom{
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color: #666666;
					.right-bottom-watch{
						color: #999999;
						display: flex;
						line-height: 40rpx;
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
</style>
