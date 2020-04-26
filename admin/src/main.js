import Vue from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store"
import "@/registerServiceWorker"

//引入element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//国际化
import i18n from './i18n/i18n'

//引入全局样式
import 'normalize.css/normalize.css'
import '@/assets/less/style.less'

//引入路由守卫配置
import '@/permission'

i18n.locale = 'cn'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
