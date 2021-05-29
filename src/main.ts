import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Wait from "@vasiliyrusin/v-wait";
import ElementUI from 'element-ui';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Wait, { store });
Vue.use(ElementUI, { locale });

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
