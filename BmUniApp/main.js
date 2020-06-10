import Vue from 'vue'
import App from './App'
import httpUtil from './plugins/httpUtil.js'
import config from './plugins/config.js'
const md5 = require('js-md5')
Vue.config.productionTip = false
Vue.prototype.http = httpUtil
Vue.prototype.md5 = md5
Vue.prototype.config = config
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
