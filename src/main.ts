import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Wait from "@vasiliyrusin/v-wait";
// import ElementUI from 'element-ui';
import { Button, Select, Row, Col, Loading, DatePicker, Input, Checkbox, RadioGroup, RadioButton, Form, FormItem, Option, Table, TableColumn } from 'element-ui';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import lang from 'element-ui/lib/locale/lang/ru-RU'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

locale.use(lang)

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Loading.directive)
Vue.use(DatePicker, { locale })
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Wait, { store });
// Vue.use(ElementUI, { locale });

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
