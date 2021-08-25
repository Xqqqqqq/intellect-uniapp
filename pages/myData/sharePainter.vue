<template>
	<view>
		<button class="btn" type="default" @click="canvasShow">点击显示</button>
		<!-- .sync修饰符:当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。 -->
		<yz-canvas-poster :ifShow.sync="ifShow" :imageBg="imageBg" :imageHead="imageHead" :imageBody="imageBody"
			:textHead="textHead">
		</yz-canvas-poster>
	</view>
</template>

<script>
	import yzCanvasPoster from '@/components/yz-canvas-poster/yz-canvas-poster.vue'
	export default {
		components: {
			yzCanvasPoster
		},
		data() {
			return {
				ifShow: false,
				imageBg: '../../static/img/icons/bg.jpg',
				imageHead: ['../../static/img/icons/zhongjiang.png', 50, 20, 40, 40],
				imageBody: ['../../static/img/icons/zhongjiang.png', 98, 240, 120, 120],
				textHead:  ['myCanvas', 100, 40, '#ffffff', '20']
			}
		},
		methods: {
			canvasShow() {
				this.ifShow = true;
			}
		}
	}
</script>

<style>
	.btn {
		margin: 24rpx;
	}
</style>