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
		let vm = this
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				if (loginRes.authResult) {
					uni.setStorageSync('openid', loginRes.authResult.openid)
					uni.setStorageSync('sessionKey', loginRes.authResult.access_token)
				} else {
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
				}
			},
			fail(err) {
				console.log(err)
				uni.showToast({
					title: '授权失败！',
					icon: 'none'
				});
			}
		});
	},
	onShow: function() {
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
/* @import 'colorui/main.css'; */
@import 'colorui/icon.css';
/* @import 'uni.scss'; */
@import 'static/css/animate.css';
/* 解决头条小程序组件内引入字体不生效的问题 */
page{
	background-color: #f1f1f1;
}
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
