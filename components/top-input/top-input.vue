<template>
	<view class="top-input">
		<view class="top-input-box">
			<icon type="search" size="16" class="iconsousuo"/>
			<input class="top-box-input" :placeholder="placeholderText" type="text"
			placeholder-class="input-box-placeholder" v-model="changeValue" 
			confirm-type="search" @confirm="confirmInput" @blur="confirmInput"/>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholderText: {
				type: String,
				default: ''
			},
			changeValue: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			};
		},
		methods:{
			confirmInput(e){
				this.$emit('changeInput', e.detail.value)
			}
		}
	}
</script>

<style lang="scss">
.top-input{
	width: 100%;
	background-color: #FFFFFF;
	border-radius:25rpx;
	overflow: hidden;
	.top-input-box{
		width: 100%;
		background:rgba(247,247,247,1);
		height: 70rpx;
		position: relative;
		padding-left: 78rpx;
		box-sizing: border-box;
		.iconsousuo{
			color: #CACACA;
			font-size: 36rpx;
			margin-right: 15rpx;
			position: absolute;
			left: 27rpx;
			top: 50%;
			transform: translateY(-50%);
		}
		.input-box-placeholder{
			font-size: 28rpx;
			color: #AAAAAA;
		}
		.top-box-input {
			height: 100%;
			line-height: 1;
			width: 74%;
			font-size: 28rpx;
			border: none;
		}
	}
}
</style>
