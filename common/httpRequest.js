import configdata from './config'
import cache from './cache'
function checkToken(res){
	if (res.data && res.data.status == "FAIL" && res.data.code && res.data.code == 'MA1101' || res.data.msg && res.data.msg.indexOf('token') > 0) {
		uni.reLaunch({
			url: 'pages/loginAll/login'
		});
	}
}
module.exports = {
    config: function (name) {
        var info = null;
        if (name) {
            var name2 = name.split("."); //字符分割
            if (name2.length > 1) {
                info = configdata[name2[0]][name2[1]] || null;
            } else {
                info = configdata[name] || null;
            }
            if (info == null) {
                let web_config = cache.get("web_config");
                if (web_config) {
                    if (name2.length > 1) {
                        info = web_config[name2[0]][name2[1]] || null;
                    } else {
                        info = web_config[name] || null;
                    }
                }
            }
        }
        return info;
    },
	
    postT: function (url, data, header) {
        header = header || "application/x-www-form-urlencoded";
        url = this.config("APIHOST") + url;
        let token = uni.getStorageSync("token");
        if (token) {
            return new Promise((succ, error) => {
                uni.request({
                    url: url,
                    data: data,
                    method: "POST",
                    header: {
                        "content-type": header,
                        "token": token
                    },
                    success: function (result) {
						checkToken(result)
                        succ.call(self, result.data);
                    },
                    fail: function (e) {
                        error.call(self, e);
                    }
                })
            })
        } else {
            return new Promise((succ, error) => {
                uni.request({
                    url: url,
                    data: data,
                    method: "POST",
                    header: {
                        "content-type": header,
                    },
                    success: function (result) {
						checkToken(result)
                        succ.call(self, result.data);
                    },
                    fail: function (e) {
                        error.call(self, e);
                    }
                })
            })
        }
    },

    postJson: function (url, data, header) {
        header = header || "application/json";
        url = this.config("APIHOST") + url;
        let token = uni.getStorageSync("token");
        if (token) {
            return new Promise((succ, error) => {
                uni.request({
                    url: url,
                    data: data,
                    method: "POST",
                    header: {
                        "content-type": header,
                        "token": token
                    },
                    success: function (result) {
						checkToken(result)
                        succ.call(self, result.data);
                    },
                    fail: function (e) {
                        error.call(self, e);
                    }
                })
            })
        } else {
            return new Promise((succ, error) => {
                uni.request({
                    url: url,
                    data: data,
                    method: "POST",
                    header: {
                        "content-type": header,
                    },
                    success: function (result) {
						checkToken(result)
                        succ.call(self, result.data);
                    },
                    fail: function (e) {
                        error.call(self, e);
                    }
                })
            })
        }
    },
    getT: function (url, data, header) {
        header = header || "application/x-www-form-urlencoded";
        url = this.config("APIHOST") + url;
        let token = uni.getStorageSync("token");
        if (token) {
            return new Promise((succ, error) => {
                uni.request({
                    url: url,
                    data: data,
                    method: "GET",
                    header: {
                        "content-type": header,
                        "token": token
                    },
                    success: function (result) {
						checkToken(result)
                        succ.call(self, result.data);
                    },
                    fail: function (e) {
                        error.call(self, e);
                    }
                })
            })
        } else {
            return new Promise((succ, error) => {
                uni.request({
                    url: url,
                    data: data,
                    method: "GET",
                    header: {
                        "content-type": header
                    },
                    success: function (result) {
						checkToken(result)
                        succ.call(self, result.data);
                    },
                    fail: function (e) {
                        error.call(self, e);
                    }
                })
            })
        }

    },
	getJT: function (url, data, header) {
	    header = header || "application/json";
	    url = this.config("APIHOST") + url;
		let token = uni.getStorageSync("token");
	    return new Promise((succ, error) => {
	        uni.request({
	            url: url,
	            data: data,
	            method: "GET",
				header: {
				    "content-type": header,
				    "token": token
				},
	            success: function (result) {
					checkToken(result)
	                succ.call(self, result.data);
	            },
	            fail: function (e) {
	                error.call(self, e);
	            }
	        })
	    })
	},
    get: function (url, data, header) {
        header = header || "application/x-www-form-urlencoded";
        url = this.config("APIHOST") + url;
		let token = uni.getStorageSync("token");
        return new Promise((succ, error) => {
            uni.request({
                url: url,
                method: "GET",
                header: {
                    "content-type": header,
                    "token": token
                },
                success: function (result) {
					checkToken(result)
                    succ.call(self, result.data);
                },
                fail: function (e) {
                    error.call(self, e);
                }
            })
        })
    }
}
