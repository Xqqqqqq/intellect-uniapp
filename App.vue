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
		let vm = this
		// this.platformName = fun.getPlatform()
		// switch(this.platformName) {
		//      case "MP-WEIXIN":
		// 		uni.switchTab({
		// 			url:'/pages/myData/myData'
		// 		})
		//         break;
		//      default:
		//         uni.navigateTo({
		//         	url:'/pages/myData/loadPage'
		//         })
		// }
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				// console.log(loginRes.code) // code
				vm.$Request.get(`/wxController.do?getOpenid&code=${loginRes.code}`).then(res => {
					if(res.errmsg){
						uni.showToast({
							title: res.errmsg,
							icon: 'none'
						})
					}
					// console.log(res) //openid
					if(res){
						uni.setStorageSync('openid', res.openid)
						uni.setStorageSync('sessionKey', res.session_key)
					}
				})
			},
			fail(err) {
				uni.showToast({
					title: '授权失败！',
					icon: 'none'
				});
			}
		});
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
