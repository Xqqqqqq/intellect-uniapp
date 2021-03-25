<template>
	<view class="no-data-wrap">
		<template v-if="dataType == 1">
			<image class="img-icon" src="../../static/img/no-data/iconwujifen.png" mode=""></image>
			<text class="no-data-tip">无积分</text>
		</template>
		<template v-if="dataType == 2">
			<image class="img-icon"  src="../../static/img/no-data/iconwuwangluo.png" mode=""></image>
			<text class="no-data-tip">无网络</text>
		</template>
		<template v-if="dataType == 3">
			<image class="img-icon"  src="../../static/img/no-data/iconwuxinhao_.png" mode=""></image>
			<text class="no-data-tip">无信号</text>
		</template>
		<template v-if="dataType == 4">
			<image class="img-icon"  src="../../static/img/no-data/iconchawujieguo.png" mode=""></image>
			<text class="no-data-tip">查无结果</text>
		</template>
		<template v-if="dataType == 5">
			<image class="img-icon"  src="../../static/img/no-data/iconwuliaotian.png" mode=""></image>
			<text class="no-data-tip">无聊天</text>
		</template>
		<template v-if="dataType == 6">
			<image class="img-icon"  src="../../static/img/no-data/iconwuyouhuiquan.png" mode=""></image>
			<text class="no-data-tip">无优惠券</text>
		</template>
		<template v-if="dataType == 7">
			<image class="img-icon"  src="../../static/img/no-data/iconzanwushuju.png" mode=""></image>
			<text class="no-data-tip">暂无数据</text>
		</template>
		<template v-if="dataType == 8">
			<image class="img-icon"  src="../../static/img/no-data/iconkongbaiye-zanwudingdan.png" mode=""></image>
			<text class="no-data-tip">暂无订单</text>
		</template>
		<template v-if="dataType == 9">
			<image class="img-icon"  src="../../static/img/no-data/iconwuneirong1.png" mode=""></image>
			<text class="no-data-tip">无内容</text>
		</template>
		<template v-if="dataType == 10">
			<image class="img-icon"  src="../../static/img/no-data/iconwufabu.png" mode=""></image>
			<text class="no-data-tip">无发布</text>
		</template>
		<template v-if="dataType == 11">
			<image class="img-icon"  src="../../static/img/no-data/iconwuguanzhu.png" mode=""></image>
			<text class="no-data-tip">无关注</text>
		</template>
		<template v-if="dataType == 12">
			<image class="img-icon"  src="../../static/img/no-data/iconzanwupengyou.png" mode=""></image>
			<text class="no-data-tip">暂无朋友</text>
		</template>
	</view>
</template>

<script>
	export default{
		props:{
			dataType:{
				type:Number, //1 无积分 2 无网络 3 无信号 4 查无结果 5 无聊天 6 无优惠券  7 暂无数据 8 暂无订单  9 无内容  10 无发布  11 无关注  12 暂无朋友 
				default:7
			}
		}
	}
</script>

<style lang="scss">
	.no-data-wrap{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 100rpx;
		.img-icon {
			width: 360rpx;
			height: 200rpx;
		}
		.no-data-tip{
			margin-top: 20rpx;
			font-size:24rpx;
			color:rgba(153,153,153,1);
		}
	}
</style>
