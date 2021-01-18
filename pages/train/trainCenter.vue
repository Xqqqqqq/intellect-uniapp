<template>
	<view class="center">
		<view class="discover-top">
			<view class="wrap-select">
			  <input @input="bindNameInput" v-model="goodsName" 
			  type="text" placeholder="请输入训练名称" placeholder-class="input-placeholder" class="input-length"/>
			  <view class="search-icon" @click="clickSearch">
			    <image src="../../static/img/icons/search.png"></image>
			  </view>
			</view>
			<my-scrollX
			:scrollList="scrollTopList" :currentTab="currentTopTab"
			:beforeColor="beforeColor" :afterColor="afterColor" @tabChange="tabChange"></my-scrollX>
		</view>
		<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @onSelected='onSelected'></ren-dropdown-filter>
		<view class="wrap-content">
			<my-list :myList="listdetial" @gotoUrl="gotoListDetail"></my-list>
		</view>
	</view>
</template>

<script>
	import myScrollX from '@/components/my-scrollX/my-scrollX.vue'
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import MyList from '@/components/my-list/my-list.vue'
	export default {
		components: {
			myScrollX,
			RenDropdownFilter,
			MyList,
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
				beforeColor: '#999999',
				afterColor: '#ffffff',
				filterData: [
					[{
						text: '推荐训练',
						value: 1
					}, {
						text: '收藏升序',
						value: 2
					}, {
						text: '收藏降序',
						value: 3
					}, {
						text: '全部训练',
						value: 4
					}],
					[{
						text: '全部特权',
						value: 1
					}, {
						text: '专属VIP',
						value: 2
					}, {
						text: '免费使用',
						value: 3
					}, {
						text: '消耗能量',
						value: 4
					}],
					[{
						text: '全部收藏',
						value: 1
					}, {
						text: '已收藏',
						value: 2
					}, {
						text: '未收藏',
						value: 3
					}]
				],
				defaultIndex: [0, 0, 0],
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
			};
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
			onSelected(res) {
				console.log(res)
			},
			gotoListDetail(){
				uni.navigateTo({
					url:'/pages/train/imageMemory/numEleEntry'
				})
			}
		}
	}
</script>

<style lang="scss">
.center{
	width: 100%;
	.discover-top{
		width: 100%;
		background-color: $uni-color-primary;
		padding: 40rpx 24rpx;
		padding-bottom: 24rpx;
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
	}
	.wrap-content{
		padding: 24rpx;
		box-sizing: border-box;
	}
}
</style>
