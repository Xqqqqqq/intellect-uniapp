<script>
import fun from 'common/fun.js'
export default {
	data(){
		return{
			platformName:'',
		}
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		this.platformName = fun.getPlatform()
		switch(this.platformName) {
		     case "MP-WEIXIN":
				uni.switchTab({
					url:'/pages/myData/myData'
				})
		        break;
		     default:
		        uni.switchTab({
		        	url:'/pages/myData/loadPage'
		        })
		} 
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods:{

	}
};
</script>

<style>
/*每个页面公共css */
@import 'colorui/main.css';
@import 'colorui/icon.css';
/* @import 'uni.scss'; */
@import 'static/css/animate.css';
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
