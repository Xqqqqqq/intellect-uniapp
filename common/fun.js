export default {
	getPlatform: function() {
		let platform = undefined
		//#ifdef APP-PLUS
		platform = "APP";
		//#endif
		//#ifdef APP-PLUS-NVUE
		platform = "APP";
		//#endif
		//#ifdef H5
		platform = "H5";
		//#endif
		//#ifdef MP-WEIXIN
		platform = "MP-WEIXIN";
		//#endif
		//#ifdef MP-ALIPAY
		platform = "MP-ALIPAY";
		//#endif
		//#ifdef MP-BAIDU
		platform = "MP-BAIDU";
		//#endif
		//#ifdef MP-TOUTIAO
		platform = "MP-TOUTIAO";
		//#endif
		//#ifdef MP-QQ
		platform = "MP-QQ";
		//#endif
		//#ifdef MP-360
		platform = "MP-360";
		//#endif
		return platform
	}
}