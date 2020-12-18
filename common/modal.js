let $showModal = function(option) {
	let params = {
		title: "",
		content: "",
		cancelText: "取消", // 取消按钮的文字  
		confirmText: "确定", // 确认按钮文字  
		showCancel: true, // 是否显示取消按钮，默认为 true  

	}

	Object.assign(params, option)
	// #ifdef APP-PLUS  
	let list = []
	Object.keys(params).forEach(ele => {
		list.push(ele + "=" + params[ele])
	})
	let paramsStr = list.join('&')

	        uni.navigateTo({  
	    url: `/pages/modal/customModal?${paramsStr}`  
	});

	return new Promise((resolve, reject) => {
		uni.$once("AppModalCancel", () => {
			reject()
		})
		uni.$once("AppModalConfirm", (e) => {
			resolve(e)
		})
	});
	// #endif  

	// #ifndef APP-PLUS  
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: params.title,
			content: params.content,
			cancelText: params.cancelText,
			confirmText: params.confirmText,
			showCancel: params.showCancel,
			success: (res) => {
				if (res.confirm) {
					resolve()
				} else {
					reject()
				}
			}
		});
	})
	// #endif  

}

export default $showModal
