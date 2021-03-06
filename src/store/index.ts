import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from "./modules/auth.module";
import { user } from "./modules/user.module";
import { payment } from "./modules/payment.module";
import { paymentsControl } from "./modules/paymentsControl.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    payment,
    paymentsControl
  }
})
