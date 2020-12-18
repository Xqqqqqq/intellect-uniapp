<template>
	<uni-popup :show="showPop" :maskClick="false" ref="popup" type="center" @change="changed">
		<view class="pop-confirm-container">
			<view class="pop-confirm-title">
				{{title}}
				<text @tap="closePop" class="iconfont iconguanbi"></text>
			</view>
			<view class="tip-content">
				<slot></slot>
			</view>
			<view class="button-group">
				<view class="cancel-btn" @tap="closePop">
					取消
				</view>
				<view class="confirm-btn" @tap="confirmCb">
					确认
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default{
	data(){
		return{
			showPop:false
		}
	},
	watch: {
		show(newValue) {
			if (newValue) {
				this.showPop = true;
			} else {
				this.showPop = false;
			}
		}
	},
	props:{
		show:{
			type: Boolean,
			default: false
		},
		title:{  //标题
			type:String,
			default:'操作提示'
		}
	},
	methods:{
		changed(e) {
			if (!e.show) {
				this.showPop = false;
			}
		},
		closePop(){
			this.showPop = false;
			this.$emit('change', {
				show: false
			})
		},
		confirmCb(){  //确认回调函数
			this.closePop();
			this.$emit('confirm')
		}
	}
}
</script>

<style lang="scss">
.pop-confirm-container{
	width:560rpx;
	// min-height:395rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	padding: 0 40rpx 50rpx 40rpx;
	box-sizing: border-box;
	.pop-confirm-title{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 2rpx dashed #E3E3E3;
		text-align: center;
		box-sizing: border-box;
		position: relative;
		font-size:28rpx;
		color:rgba(0,0,36,1);
		.iconguanbi{
			font-size: 48rpx;
			position: absolute;
			top: -14rpx;
			right: -24rpx;
		}
	}
	.tip-content{
		width: 100%;
		padding: 40rpx 0;
		box-sizing: border-box;
		font-size:28rpx;
		color:rgba(85,85,85,1);
		line-height: 1.5;
	}
	.button-group{
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		.cancel-btn{
			width:220rpx;
			height:70rpx;
			line-height: 70rpx;
			text-align: center;
			background:rgba(187,187,187,1);
			border-radius:10rpx;
			font-size:28rpx;
			color:rgba(255,255,255,1);
		}
		.confirm-btn{
			width:220rpx;
			height:70rpx;
			line-height: 70rpx;
			text-align: center;
			background:#477CFC;
			border-radius:10rpx;
			font-size:28rpx;
			color:rgba(255,255,255,1);
		}
	}
}
</style>
