import Vue from 'vue'
import App from './App'
import HttpRequest from './common/httpRequest';
import HttpCache from './common/cache';
import queue from './common/queue';
import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import noData from '@/components/no-data/no-data.vue';

Vue.config.productionTip = false
Vue.component('uni-load-more', UniLoadMore);
Vue.component('uni-popup', uniPopup);
Vue.component('no-data', noData);
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

// 接口：https://easydoc.net/p/53523179/wDktEPzN
// 原型：https://lanhuapp.com/web/#/item/project/product?pid=f8a2bd01-82d0-4718-85e7-dbab14c88b81&docId=36b18636-3e99-4ac5-9c0a-533b535e5e05&docType=axure&image_id=36b18636-3e99-4ac5-9c0a-533b535e5e05&parentId=ddd81d7ecaf44a0f8523a553424228c9&type=share_mark&tab=product&teamId=0108afc8-6c11-4098-a139-0958c42cd22c&param=none&versionId=aef41e53-5672-456a-bbc2-dfa5e64c656e&pageId=54510a5a7c5047a4bb4ab8e3f99e12cb