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
