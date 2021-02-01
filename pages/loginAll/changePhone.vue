<template>
	<view class="change">
		<form @submit="formSubmit">
			<view class="change-form">
				<view class="change-form-li" v-if="showCurrent">
					<view class="form-li-title">手机号：</view>
					<input class="form-li-input" name="currentphone" v-model="submitForm.currentphone" placeholder="请输入当前手机号" />
				</view>
				<view class="change-form-li" v-if="showCurrent">
					<view class="form-li-title">验证码：</view>
					<input class="form-li-input" name="currentcode" v-model="submitForm.currentcode" placeholder="请输入手机号验证码" />
					<view class="form-li-code" @click="clickCurrentCode">{{currentCodeName}}</view>
				</view>
				<view class="change-form-li" v-if="!showCurrent">
					<view class="form-li-title">手机号：</view>
					<input class="form-li-input" name="nowphone" v-model="submitForm.nowphone" placeholder="请输入更换的手机号" />
				</view>
				<view class="change-form-li" v-if="!showCurrent">
					<view class="form-li-title">验证码：</view>
					<input class="form-li-input" name="nowcode" v-model="submitForm.nowcode" placeholder="请输入手机号验证码" />
					<view class="form-li-code" @click="clickNowCode">{{nowCodeName}}</view>
				</view>
			</view>
			<button form-type="submit" class="feed-btn">{{btnName}}</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnName: '下一步',
				showCurrent: true,
				currentCodeName: '发送验证码',
				currentCodeTime: 60,
				currentCodeDisable: false,
				nowCodeName: '发送验证码',
				nowCodeTime: 60,
				nowCodeDisable: false,
				submitForm:{
					currentphone: '',
					currentcode: '',
					nowphone: '',
					nowcode: ''
				}
			};
		},
		onReady(){
			uni.setNavigationBarTitle({
			　　title:'当前手机号码'
			})
		},
		methods:{
			clickCurrentCode(){
				if(this.currentCodeDisable == false){
					let timer = setInterval(() => {
						this.currentCodeTime -= 1
						this.currentCodeDisable = true
						this.currentCodeName = this.currentCodeTime + 's'
						if(this.currentCodeTime <= 0) {
							clearInterval(timer)
							this.currentCodeName = '发送验证码'
							this.currentCodeDisable = false
							this.currentCodeTime = 60
						}
					},1000)
				}
			},
			clickNowCode(){
				if(this.nowCodeDisable == false){
					let timer = setInterval(() => {
						this.nowCodeTime -= 1
						this.nowCodeDisable = true
						this.nowCodeName = this.nowCodeTime + 's'
						if(this.nowCodeTime <= 0) {
							clearInterval(timer)
							this.nowCodeName = '发送验证码'
							this.nowCodeDisable = false
							this.nowCodeTime = 60
						}
					},1000)
				}
			},
			formSubmit(e){
				if(this.btnName == '下一步'){
					if(e.detail.value.currentphone == '' || e.detail.value.currentcode == ''){
						uni.showToast({
							icon:'none',
							title:'请检查输入项！'
						})
					}else{
						this.btnName = '完成更换'
						this.showCurrent = false
						this.currentCodeName = '发送验证码'
						this.currentCodeTime = 60
						this.currentCodeDisable = false
						this.nowCodeName = '发送验证码'
						this.nowCodeTime = 60
						this.nowCodeDisable = false
						this.submitForm={}
						uni.setNavigationBarTitle({
						　　title:'更换手机号码'
						})
					}
				}else{
					if(e.detail.value.nowphone == '' || e.detail.value.nowcode == ''){
						uni.showToast({
							icon:'none',
							title:'请检查输入项！'
						})
					}else{
						this.btnName = '下一步'
						this.showCurrent = true
						this.currentCodeName = '发送验证码'
						this.currentCodeTime = 60
						this.currentCodeDisable = false
						this.nowCodeName = '发送验证码'
						this.nowCodeTime = 60
						this.nowCodeDisable = false
						this.submitForm={}
						uni.setNavigationBarTitle({
						　　title:'当前手机号码'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
.change{
	width: 100%;
	.change-form{
		width: 100%;
		background-color: #FFFFFF;
		.change-form-li{
			padding-left: 24rpx;
			padding-right: 24rpx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			line-height: 100rpx;
			height: 100rpx;
			border-bottom: 1px solid #d3d3d3;
			position: relative;
			.form-li-title{
				color: #333333;
				line-height: 100rpx;
				height: 100rpx;
				text-align: right;
				font-size: 30rpx;
				font-weight: bold;
			}
			.form-li-input{
				flex: 1;
				line-height: 100rpx;
				height: 100rpx;
				padding: 0 24rpx;
				box-sizing: border-box;
				font-size: 30rpx;
			}
			.form-li-code{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 24rpx;
				text-align: center;
				width: 150rpx;
				font-size: 28rpx;
			}
		}
	}
	.feed-btn{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30rpx;
		font-weight: bold;
		background-color: $uni-color-primary;
		position: fixed;
		left: 0;
		bottom: 0;
	}
}
</style>
