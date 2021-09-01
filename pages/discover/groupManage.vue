<template>
	<view class="group">
		<view class="group-top">
			<view class="group-top-left">我的分类（{{classifyList.length}}）</view>
			<view class="group-top-right" @click="clickOperation('add')">+</view>
		</view>
		<view class="group-content">
			<view class="group-content-li" v-for="(item, index) in classifyList" :key="index">
				<view class="content-li-left">
					<image :src="currentTab == item.id ? '../../static/img/icons/zhiding-blue.png' : '../../static/img/icons/zhiding-gray.png'" 
					@click="clickTop(item)"></image>
					{{item.organizeName}}
				</view>
				<view class="content-li-right">
					<view class="li-right-line"></view>
					<view class="li-right-img">
						<image src='../../static/img/icons/edit.png' @click="clickOperation('edit', item)"></image>
					</view>
					<view class="li-right-img" v-if="item.organizeType != 1 || item.organizeType != 2">
						<image src='../../static/img/icons/shanchu.png' @click="clickOperation('delete', item)"></image>
					</view>
				</view>
			</view>
		</view>
		<no-data v-if="!classifyList.length"></no-data>
		<l-modal :isShowModal="isShowModal" :modalTitle="modalTitle" @onClickCancel="cancel" @onClickConfirm="confirm">
			<view class="modal-input" v-if="type == 'add'">
				<input placeholder="请输入分类名称" v-model="operatName"/>
			</view>
			<view class="modal-input" v-if="type == 'edit'">
				<input placeholder="请修改分类名称" v-model="operatName"/>
			</view>
			<view class="modal-text" v-if="type == 'delete'">
				是否确定删除分组？
			</view>
		</l-modal>
	</view>
</template>

<script>
	import lModal from '@/components/l-modal/l-modal.vue'
	export default {
		components: {
			lModal,
		},
		data() {
			return {
				classifyList:[],
				currentTab:0,
				isShowModal: false, // 是否展示弹框
				type: '', // 弹框类型
				modalTitle: '',// 标题
				chooseItem: {}, // 所选内容
				operatName: ""
			};
		},
		mounted(){
			this.getAttentionOrganize()
		},
		methods:{
			getAttentionOrganize(){
				if(uni.getStorageSync('userInfo')){
					let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
					this.$Request.get(`/appAttentionController.do?getAttentionOrganize&type=2&memberId=${memberId}`)
					.then(res => {
						if(res.code == 0){
							this.classifyList = res.data.organizeList
							this.currentTab = this.classifyList[0].id
						}else{
							uni.showToast({
								title: res.info,
								icon: 'none'
							})
						}
					})
				}else{
					uni.showModal({
					    title: '提示',
					    content: '您尚未登录，是否去登录？',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url:'/pages/loginAll/login'
					            })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			clickTop(item){
				let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
				this.currentTab = item.id
				let middleValue = item;
				this.classifyList.splice(this.classifyList.indexOf(item), 1);
				this.classifyList.unshift(middleValue)
				this.$Request.get(`/appAttentionController.do?topAttentionOrganize&type=2&organizeId=${item.id}&memberId=${memberId}`)
				.then(res => {
					if(res.code == 0){
						this.getAttentionOrganize()
					}
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				})
			},
			clickOperation(type, item){
				this.isShowModal = true
				this.type = type
				this.modalTitle = ''
				this.chooseItem = {}
				this.operatName = ''
				switch(this.type) {
					case 'add':
						this.modalTitle = '新增分类'
						break
					case 'edit':
						this.modalTitle = '编辑分类'
						break
					case 'delete':
						this.modalTitle = '提示'
						break
				}
				if(item) {
					this.chooseItem = item
					this.operatName = item.organizeName
				}
			},
			addAttentionOrganize(){
				let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
				this.$Request.get(`/appAttentionController.do?addAttentionOrganize&type=2&memberId=${memberId}&name=${this.operatName}`)
				.then(res => {
					if(res.code == 0){
						this.getAttentionOrganize()
					}
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				})
			},
			updateAttentionOrganize(){
				let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
				this.$Request.get(`/appAttentionController.do?updateAttentionOrganize&organizeId=${this.chooseItem.id}&memberId=${memberId}&name=${this.operatName}`)
				.then(res => {
					if(res.code == 0){
						this.getAttentionOrganize()
					}
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				})
			},
			delAttentionOrganize(){
				let memberId = JSON.parse(uni.getStorageSync('userInfo')).id
				this.$Request.get(`/appAttentionController.do?delAttentionOrganize&organizeId=${this.chooseItem.id}&memberId=${memberId}`)
				.then(res => {
					if(res.code == 0){
						this.getAttentionOrganize()
					}
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				})
			},
			cancel(){
				this.isShowModal = false
				this.modalTitle = ''
				this.chooseItem = {}
				this.operatName = ''
			},
			confirm() {
				this.isShowModal = false
				switch(this.type) {
					case 'add':
						this.addAttentionOrganize()
						break
					case 'edit':
						this.updateAttentionOrganize()
						break
					case 'delete':
						this.delAttentionOrganize()
						break
				}
			},
		}
	}
</script>

<style lang="scss">
	.flip-list-move {
	  transition: transform .5s;
	}
.group{
	width: 100%;
	.group-top{
		padding: 0 24rpx;
		box-sizing: border-box;
		width: 100%;
		background-color: #FFFFFF;
		box-shadow:0px 2px 10px 0px rgba(108,143,197,0.14);
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		.group-top-left{
			font-size: 32rpx;
			font-weight: bold;
			color: $uni-color-primary;
		}
		.group-top-right{
			font-weight: bold;
			font-size: 65rpx;
			color: $uni-color-primary;
		}
	}
	.group-content{
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		.group-content-li{
			padding: 24rpx;
			box-sizing: border-box;
			border-radius: 15rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.content-li-left{
				font-size: 32rpx;
				font-weight: bold;
				display: flex;
				image{
					display: inline-block;
					width: 70rpx;
					height: 35rpx;
					margin-right: 20rpx;
					margin-top: 3%;
				}
			}
			.content-li-right{
				display: flex;
				.li-right-line{
					width: 1rpx;
					height: 100%;
					border-left: 1rpx dashed $uni-color-primary;
					margin-right: 10rpx;
					opacity: 0.5;
				}
				.li-right-img{
					width: 50rpx;
					height: 50rpx;
					margin-left: 40rpx;
					image{
						width: 100%;
						height: 100%;
						display: inline-block;
					}
				}
			}
		}
	}
	.modal-input{
		border: 1rpx solid #D3D3D3;
		width: 100%;
		height: 80rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		input{
			width: 100%;
			height: 100%;
			line-height: 80rpx;
			padding-left: 15rpx;
			box-sizing: border-box;
		}
	}
	.modal-text{
		width: 100%;
		font-weight: bold;
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		font-size: 32rpx;
	}
}
</style>
