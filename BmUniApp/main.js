import Vue from 'vue'
import App from './App'
import httpUtil from './plugins/httpUtil.js'
import config from './plugins/config.js'
import strogeUtil  from './plugins/stroageUtil.js'
const md5 = require('js-md5')
Vue.config.productionTip = false
Vue.prototype.http = httpUtil
Vue.prototype.md5 = md5
Vue.prototype.config = config
Vue.prototype.strogeUtil = strogeUtil
App.mpType = 'app'

import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
	
const app = new Vue({
    ...App
})
app.$mount()
