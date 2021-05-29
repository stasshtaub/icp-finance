import { ActionTree, Module, MutationTree } from "vuex";
import { PaymentState } from "../types/payment";
import { RootState } from "../types/root-state";
import { UPDATE_PAYMENT_MODEL, SET_PAYMENT_SCHEDULE, UPDATE_PAYMENT_SCHEDULE_DAY, EMPTY_PAYMENT_SCHEDULE } from "@/constants/mutations";
import { GENERATE_SCHEDULE } from "@/constants/actions";
import { PaymentDay } from "@/logic/payment";
import Vue from "vue";

const initialState = (): PaymentState => ({
  model: {
    paymentType: "full",
    paymentCount: 3,
    perPayment: 0,
    firstPayment: null,
    schedule: null
  },

  options: {
    paymentTypes: [
      {
        value: "full",
        label: "Вся сумма"
      },
      {
        value: "instalments",
        label: "Рассрочка"
      }
    ],
    paymentCounts: [...Array(6).keys()].slice(1)
  }
});

const state: () => PaymentState = initialState

const mutations: MutationTree<PaymentState> = {
  [UPDATE_PAYMENT_MODEL](state, model) {
    state.model = { ...state.model, ...model }
  },

  [SET_PAYMENT_SCHEDULE](state, schedule) {
    state.model.schedule = schedule
  },

  [UPDATE_PAYMENT_SCHEDULE_DAY](state, { index, day }) {
    if (state.model.schedule?.[index]) {
      Vue.set(state.model.schedule, index, { ...state.model.schedule[index], ...day })
    }
  },

  [EMPTY_PAYMENT_SCHEDULE](state) {
    state.model.schedule = initialState().model.schedule;
  }
}

const actions: ActionTree<PaymentState, RootState> = {
  [UPDATE_PAYMENT_MODEL]({ commit }, model) {
    commit(UPDATE_PAYMENT_MODEL, model)
  },

  [GENERATE_SCHEDULE]({ commit, state }) {
    const { paymentCount } = state.model
    const currentDate = new Date();


    const schedule = [...Array(paymentCount)].map((_, i) => {
      const payment = 0;
      const month = currentDate.getMonth() + i
      
      const date = new Date(currentDate);
      date.setMonth(month);

      return new PaymentDay(payment, date)
    })

    commit(SET_PAYMENT_SCHEDULE, schedule);
  }
}

export const payment: Module<PaymentState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}