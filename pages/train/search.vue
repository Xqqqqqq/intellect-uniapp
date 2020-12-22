<template>
	<view class="wrap">
	  <view class="wrap-select">
	    <input @input="bindNameInput" v-model="goodsName" 
	    type="text" placeholder="请输入搜索内容" placeholder-class="input-placeholder" class="input-length"/>
	    <view class="search-icon" @click="clickSearch">
	      <image src="../../static/img/icons/search.png"></image>
	    </view>
	  </view>
	  <!-- 常用搜索 -->
	  <view class="wrap-name" v-if="commonList.length >0">
	    常用搜索
	  </view>
	  <view class="history" v-if="commonList.length >0">
	    <!-- <view v-for="(item, index) in commonList" :key="index" @click="clickCommonTab(index)"
		class="tab-li"
	    :class="{'tab-li-ture':currentCommonTab == index}">{{item}}</view> -->
		<view v-for="(item, index) in commonList" :key="index" @click="clickCommonTab(index,item)"
		class="tab-li">{{item}}</view>
	  </view>
	  <!-- 历史记录 -->
	  <view class="wrap-name" v-if="historyList.length >0">
	    历史搜索
	    <view class="wrap-name-icon" @click="clickDelete">
	      <image src="../../static/img/icons/delete.png"></image>
	    </view>
	  </view>
	  <view class="history" v-if="historyList.length >0">
	    <!-- <view v-for="(item, index) in historyList" :key="index" @click="clickHistoryTab(index)"
	    class="tab-li"
	    :class="{'tab-li-ture':currentHistoryTab == index}">{{item}}</view> -->
		<view v-for="(item, index) in historyList" :key="index" @click="clickHistoryTab(index,item)"
		class="tab-li">{{item}}</view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsName: '',
				commonList:[],
				// currentCommonTab:-1,
				historyList:[],
				// currentHistoryTab:-1,
			};
		},
		onShow(){
			// this.currentHistoryTab = -1
			// this.currentCommonTab = -1
			this.goodsName = ''
			this.historyList = uni.getStorageSync('historyList')
		},
		methods:{
			bindNameInput(e){
				this.goodsName = e.target.value
			},
			clickSearch(){
				if(this.goodsName){
					const newHistoryList = this.historyList || []
					newHistoryList.unshift(this.goodsName)
					// this.$set(this.$data,'historyList', newHistoryList)
					this.historyList = this.unique(newHistoryList).slice(0,8)
					uni.setStorageSync('historyList', this.historyList)
				}
				uni.navigateTo({
					url: `/pages/train/searchResult?name=${this.goodsName}`
				})
			},
			// 数组去重
			unique (arr) {
				return Array.from(new Set(arr))
			},
			clickDelete(){
				uni.clearStorageSync('historyList')
				this.historyList = []
				this.currentHistoryTab = -1
			},
			clickHistoryTab(index,item){
				// this.currentHistoryTab = index
				this.goodsName = item
				uni.navigateTo({
					url: `/pages/train/searchResult?name=${this.goodsName}`
				})
			},
			clickCommonTab(index,item){
				// this.currentCommonTab = index
				this.goodsName = item
				uni.navigateTo({
					url: `/pages/train/searchResult?name=${this.goodsName}`
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.wrap{
  width: 100%;
  padding:50rpx 25rpx;
  box-sizing: border-box;
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
  margin-bottom: 80rpx;
}
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
.wrap-name{
  position: relative;
  font-size: 30rpx;
  color: #010101;
  margin-bottom: 50rpx;
  font-weight: bold;
}
.wrap-name-icon{
  width: 35rpx;
  height: 35rpx;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.wrap-name-icon image{
  width: 100%;
  height: 100%;
}
.history{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 60rpx;
}
.tab-li{
  min-width: 120rpx;
  height:57rpx;
  line-height: 57rpx;
  background:#ffffff;
  border:1px solid #CCCCCC;
  border-radius:30rpx;
  text-align: center;
  padding: 0 15rpx;
  box-sizing: border-box;
  margin-right: 30rpx;
  font-size: 24rpx;
  color: #333333;
  margin-bottom: 30rpx;
}
.tab-li-ture{
  min-width: 120rpx;
  height:57rpx;
  line-height: 57rpx;
  background:#ffffff;
  border:1px solid #DA1824;
  border-radius:30rpx;
  text-align: center;
  padding: 0 15rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  color: #DA1824;
  margin-bottom: 30rpx;
}
</style>
