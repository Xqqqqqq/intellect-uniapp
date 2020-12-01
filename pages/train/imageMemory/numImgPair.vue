<template>
	<view class="img-pair">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="img-pair-top">
			<view class="pair-top-blue">数图配对：</view>
			<view class="pair-top-red">{{resendTime}}s</view>
			<view class="pair-top-blue">第1组 / 共8组</view>
		</view>
		<view class="img-pair-box">
			<view class="pair-box-left">
				<view class="box-left-li" :class="{'box-left-li-click':clickedLeftList.includes(item.id)}"
				v-for="(item,index) in leftList" :key="index" @click="clickLeft(item, index)">{{item.num}}</view>
			</view>
			<view class="pair-box-right">
				<view class="box-right-li"
				v-for="(item,index) in rightList" :key="index"
				@click="clickRight(item, index)">
					<image :src="item.img"></image>
					<view class="box-right-li-num" v-if="item.leftnum">{{item.leftnum}}</view>
				</view>
			</view>
		</view>
		<view class="img-pair-btn">下一组</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resendTime: 60,// 倒计时秒数
				leftList:[{
					id:1,
					num:1
				},{
					id:2,
					num:2
				},{
					id:4,
					num:4
				},{
					id:7,
					num:7
				}],
				rightList:[{
					id:1,
					img:'../../../static/img/tabs/data-blue.png'
				},{
					id:2,
					img:'../../../static/img/tabs/faxian-blue.png'
				},{
					id:3,
					img:'../../../static/img/icons/delete.png'
				},{
					id:4,
					img:'../../../static/img/icons/zhongjiang.png'
				},{
					id:5,
					img:'../../../static/img/tabs/wode-blue.png'
				},{
					id:6,
					img:'../../../static/img/tabs/xunlian-blue.png'
				},{
					id:7,
					img:'../../../static/img/icons/shandian.png'
				},{
					id:7,
					img:'../../../static/img/icons/watch.png'
				},],
				leftInfo:{
					leftid: '',
					leftnum: '',
				}, // 左侧选中数据
				clickedLeftList: []
			};
		},
		onShow(){
			// 计时器
			const timer = setInterval(() => {
				this.resendTime = this.resendTime - 1;
				if (this.resendTime === 0) {
					clearInterval(timer);
				}
			}, 1000);
		},
		methods:{
			clickLeft(item, index){
				if(this.leftInfo.leftid == ''){
					//流程：先点击左侧数字，然后选择右侧对应图片，再选择数字，再选择右侧对应图片
					// 不可以先全部选择完左侧数字再去选择右侧图片，即数字必须一一对应图片
					this.leftInfo = {
						leftid: item.id,
						leftnum: item.num
					}
					const newIndex = this.clickedLeftList.indexOf(item.id)
					this.clickedLeftList.includes(item.id) ? this.clickedLeftList.splice(newIndex, 1) : this.clickedLeftList.push(item.id)
				}else{
					console.log(this.leftInfo)
					console.log('请选择右侧对应图片！')
				}
			},
			clickRight(item, index){
				// console.log(this.leftInfo, item)
				this.rightList[index] = {...this.leftInfo, ...item}
				this.leftInfo = {
					leftid: '',
					leftnum: ''
				}
				// console.log(this.rightList)
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	// height: 100%;
}
.img-pair{
	width: 100%;
	// height: 100%;
	padding: 80rpx 0 100rpx 0;
	box-sizing: border-box;
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
	.img-pair-top{
		position: fixed;
		left: 0;
		top: 88rpx;
		z-index: 99;
		box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
		display: flex;
		justify-content: space-between;
		padding: 0 24rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		.pair-top-blue{
			font-size: 28rpx;
			color: $uni-color-primary;
		}
		.pair-top-red{
			font-size: 28rpx;
			font-weight: bold;
			color: $uni-color-error;
		}
	}
	.img-pair-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		width: 100%;
		text-align: center;
		background-color: $uni-color-primary;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rpx;
		font-weight: bold;
	}
	.img-pair-box{
		width: 100%;
		display: flex;
		margin-top: 30rpx;
		// height: 100%;
		.pair-box-left{
			width: 40%;
			.box-left-li{
				width: 200rpx;
				height: 200rpx;
				box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
				margin: auto;
				margin-bottom: 30rpx;
				background-color: #FFFFFF;
				border-radius: 15rpx;
				text-align: center;
				line-height: 200rpx;
				color: #333333;
				font-weight: bold;
				font-size: 70rpx;
			}
			.box-left-li-click{
				background-color: rgba(0,0,0,.3);
			}
		}
		.pair-box-right{
			width: 60%;
			overflow: hidden;
			.box-right-li{
				width: 200rpx;
				height: 200rpx;
				border: 1px solid #D3D3D3;
				background-color: #FFFFFF;
				float: left;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.box-right-li-num{
					position: absolute;
					left: 0;
					top: 0;
					font-weight: 60rpx;
					background-color: rgba(75, 149, 230, .5);
					font-weight: bold;
					width: 100%;
					height: 100%;
					color: #FFFFFF;
					text-align: center;
					line-height: 200rpx;
					font-size: 80rpx;
				}
			}
		}
	}
}
</style>
