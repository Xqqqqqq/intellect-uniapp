<template>
	<view v-if="isShowModal" @click="changeMask">
		<view class="masking" v-if="showMasking" :style="{'background-color': bgColor}"></view>
		<view class="model-wraper">
			<view class="modal-title" v-if="modalTitle !== ''">
				{{modalTitle}}
			</view>
			<view class="modal-body">
				<slot></slot>
			</view>
			<view>
				<view class="btn cancel" :style="{'color': cancelTextColor}" @click="handleCancel">{{cancelText}}</view>
				<view class="btn confirm" :style="{'color': confirmTextColor}" @click="handleConfirm">{{confirmText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 是否显示弹窗
			isShowModal: {
				type: Boolean,
				default: false
			},
			// 是否显示蒙层
			showMasking: {
				type: Boolean,
				default: true
			},
			// 蒙层背景色
			bgColor: {
				type: String,
				default: 'rgba(0,0,0,.6)'
			},
			// 模态框标题
			modalTitle: {
				type: String,
				default: ''
			},
			// 取消按钮文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确定按钮文字
			confirmText: {
				type: String,
				default: '确定'
			},
			// 取消按钮文字颜色
			cancelTextColor: {
				type: String,
				default: '#666'
			},
			// 确定按钮文字颜色
			confirmTextColor: {
				type: String,
				default: '#4b95e6'
			}
		},
		data() {
			return {
				// isShowModal: false
			}
		},
		methods: {
			changeMask(){
				this.$emit('onClickChange')
			},
			showModal() {
				this.isShowModal = true
			},
			handleCancel() {
				this.isShowModal = false
				this.$emit('onClickCancel', 'cancel')
			},
			handleConfirm() {
				this.isShowModal = false
				this.$emit('onClickConfirm', 'confirm')
			}
		}
	}
</script>

<style scoped>
	.masking {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999;
	}
	.model-wraper {
		width: 600rpx;
		background-color: #fff;
		border-radius: 16rpx;
		position: absolute;
		z-index: 10000;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: #dcdcdc 0px 0px 20rpx;
	}
	.modal-title {
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #666;
	}
	.modal-body {
		padding: 60rpx 30rpx 80rpx 30rpx;
	}
	.btn {
		width: 300rpx;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		font-size: 32rpx;
		float: left;
		border-top: 1rpx solid #ddd;
	}
	.btn.cancel {
		width: 299rpx;
		border-right: 1rpx solid #dcdcdc;
	}
</style>
