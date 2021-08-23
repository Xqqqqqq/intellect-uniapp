
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/myData/loadPage","pages/myData/sharePainter","pages/myData/myData","pages/discover/discover","pages/discover/discoverDetail","pages/mine/mine","pages/myData/calendar","pages/myData/train","pages/myData/longestSeries","pages/loginAll/login","pages/loginAll/useragreement","pages/train/imageMemory/numImgCard","pages/mine/superMember","pages/mine/energy","pages/mine/cardVoucher","pages/myData/share","pages/myData/groupManage","pages/mine/editUserInfo","pages/mine/editNickname","pages/mine/historyRecharge","pages/mine/historyDetail","pages/mine/collect","pages/discover/groupManage","pages/mine/aboutUs","pages/mine/accountRelation","pages/mine/activityExchange","pages/mine/feedback","pages/train/trainCenter","pages/train/imageMemory/numImgTest","pages/train/imageMemory/numImgTestOver","pages/train/imageMemory/numEleEntry","pages/train/imageMemory/historyTest","pages/loginAll/changePhone","pages/train/imageMemory/numImgAll","pages/train/imageMemory/numImgAllRead"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"武装大脑","navigationBarBackgroundColor":"#2E3B67","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#8F9091","selectedColor":"#2E3B67","borderStyle":"black","backgroundColor":"#ffffff","fontSize":"10px","iconWidth":"18px","list":[{"pagePath":"pages/myData/myData","iconPath":"static/img/tabs/data-gray.png","selectedIconPath":"static/img/tabs/data-blue.png","text":"数据"},{"pagePath":"pages/train/trainCenter","iconPath":"static/img/tabs/xunlian-gray.png","selectedIconPath":"static/img/tabs/xunlian-blue.png","text":"训练"},{"pagePath":"pages/discover/discover","iconPath":"static/img/tabs/faxian-gray.png","selectedIconPath":"static/img/tabs/faxian-blue.png","text":"发现"},{"pagePath":"pages/mine/mine","iconPath":"static/img/tabs/wode-gray.png","selectedIconPath":"static/img/tabs/wode-blue.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"武装大脑","compilerVersion":"2.7.5","entryPagePath":"pages/myData/loadPage","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/myData/loadPage","meta":{"isQuit":true},"window":{"navigationBarTitleText":""}},{"path":"/pages/myData/sharePainter","meta":{},"window":{"navigationBarTitleText":"测试分享","enablePullDownRefresh":false}},{"path":"/pages/myData/myData","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"武装大脑","enablePullDownRefresh":true,"backgroundColorTop":"#2E3B67"}},{"path":"/pages/discover/discover","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"发现更多","enablePullDownRefresh":true,"backgroundColorTop":"#2E3B67"}},{"path":"/pages/discover/discoverDetail","meta":{},"window":{"navigationBarTitleText":"文章详情"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarBackgroundColor":"#2E3B67","navigationBarTextStyle":"white","navigationStyle":"custom","enablePullDownRefresh":true,"backgroundColorTop":"#2E3B67","titleNView":false}},{"path":"/pages/myData/calendar","meta":{},"window":{"navigationBarTitleText":"本月签到"}},{"path":"/pages/myData/train","meta":{},"window":{"navigationBarTitleText":"本月训练","enablePullDownRefresh":true,"backgroundColorTop":"#2E3B67"}},{"path":"/pages/myData/longestSeries","meta":{},"window":{"navigationBarTitleText":"本月连续","enablePullDownRefresh":true,"backgroundColorTop":"#2E3B67"}},{"path":"/pages/loginAll/login","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/loginAll/useragreement","meta":{},"window":{"navigationBarTitleText":"武装大脑用户协议"}},{"path":"/pages/train/imageMemory/numImgCard","meta":{},"window":{"navigationBarTitleText":"数字图像关联训练"}},{"path":"/pages/mine/superMember","meta":{},"window":{"navigationBarTitleText":"兰盾超级会员"}},{"path":"/pages/mine/energy","meta":{},"window":{"navigationBarTitleText":"能量"}},{"path":"/pages/mine/cardVoucher","meta":{},"window":{"navigationBarTitleText":"卡券"}},{"path":"/pages/myData/share","meta":{},"window":{"navigationBarTitleText":"分享"}},{"path":"/pages/myData/groupManage","meta":{},"window":{"navigationBarTitleText":"分组管理"}},{"path":"/pages/mine/editUserInfo","meta":{},"window":{"navigationBarTitleText":"编辑信息"}},{"path":"/pages/mine/editNickname","meta":{},"window":{"navigationBarTitleText":"昵称修改"}},{"path":"/pages/mine/historyRecharge","meta":{},"window":{"navigationBarTitleText":"历史充值"}},{"path":"/pages/mine/historyDetail","meta":{},"window":{"navigationBarTitleText":"充值详情"}},{"path":"/pages/mine/collect","meta":{},"window":{"navigationBarTitleText":"收藏"}},{"path":"/pages/discover/groupManage","meta":{},"window":{"navigationBarTitleText":"分类管理"}},{"path":"/pages/mine/aboutUs","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/mine/accountRelation","meta":{},"window":{"navigationBarTitleText":"账号管理"}},{"path":"/pages/mine/activityExchange","meta":{},"window":{"navigationBarTitleText":"奖励兑换"}},{"path":"/pages/mine/feedback","meta":{},"window":{"navigationBarTitleText":"意见建议"}},{"path":"/pages/train/trainCenter","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"训练中心","enablePullDownRefresh":true,"backgroundColorTop":"#2E3B67"}},{"path":"/pages/train/imageMemory/numImgTest","meta":{},"window":{"navigationBarTitleText":"数字元素测试","navigationStyle":"custom","titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/train/imageMemory/numImgTestOver","meta":{},"window":{"navigationBarTitleText":"考试结束","titleNView":{"autoBackButton":false}}},{"path":"/pages/train/imageMemory/numEleEntry","meta":{},"window":{"navigationBarTitleText":"数字元素训练"}},{"path":"/pages/train/imageMemory/historyTest","meta":{},"window":{"navigationBarTitleText":"历史测试","enablePullDownRefresh":true,"backgroundColorTop":"#2E3B67"}},{"path":"/pages/loginAll/changePhone","meta":{},"window":{"navigationBarTitleText":"更换手机号码"}},{"path":"/pages/train/imageMemory/numImgAll","meta":{},"window":{"navigationBarTitleText":"数字元素测试"}},{"path":"/pages/train/imageMemory/numImgAllRead","meta":{},"window":{"navigationBarTitleText":"测试结果回看"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
