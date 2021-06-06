import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { PaymentState } from "../types/payment";
import { RootState } from "../types/root-state";
import { UPDATE_PAYMENT_MODEL, SET_PAYMENT_SCHEDULE, UPDATE_PAYMENT_SCHEDULE_DAY, EMPTY_PAYMENT_SCHEDULE } from "@/constants/mutations";
import { GENERATE_SCHEDULE, CALC_PAYMENT_COUNT, CALC_PAYMENT_PER_PAYMENT, SEND_PAYMENTS } from "@/constants/actions";
import { PaymentDay } from "@/logic/payment";
import { PaymentService } from "@/services/PaymentService";
import Vue from "vue";

const initialState = (): PaymentState => ({
  model: {
    paymentType: "full",
    paymentCount: null,
    perPayment: null,
    firstPayment: null,
    schedule: null,
    lastPaymentDate: null
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
    maxPayments: 12
  }
});

const state: () => PaymentState = initialState

const getters: GetterTree<PaymentState, RootState> = {
  paymentCounts: (state) => [...Array(state.options.maxPayments + 1).keys()].slice(2),

  lastPayment: (state, _, rootState) => {
    const { model: { schedule } } = state;
    const { user: { data: { paymentAmount } } } = rootState;

    if (schedule) {
      const sumWithoutLast = schedule
        .filter((day) => day.payment)
        .reduce((acc, day) => acc + day.payment, 0);

      return paymentAmount - sumWithoutLast;
    }

    return paymentAmount;
  }
};

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
  [CALC_PAYMENT_COUNT]({ commit, state, rootState }) {
    const { model: { paymentCount, perPayment }, options: { maxPayments } } = state;

    if (paymentCount == null && perPayment != null) {
      const { user: { data: { paymentAmount } } } = rootState
      const float = paymentAmount / perPayment
      const paymentCount = Math.ceil(float)

      if (paymentCount <= maxPayments) {
        commit(UPDATE_PAYMENT_MODEL, { paymentCount })
      }
    }
  },

  [CALC_PAYMENT_PER_PAYMENT]({ commit, state, rootState }) {
    const { model: { paymentCount, perPayment } } = state;

    if (perPayment == null && paymentCount != null) {
      const { user: { data: { paymentAmount } } } = rootState
      const float = paymentAmount / paymentCount
      const perPayment = Math.floor(float)

      commit(UPDATE_PAYMENT_MODEL, { perPayment })
    }
  },

  [GENERATE_SCHEDULE]({ commit, state }) {
    const { paymentCount, perPayment, firstPayment } = state.model

    if (paymentCount) {
      const currentDate = new Date();

      const schedule = [...Array(paymentCount - 1)].map((_, i) => {
        const payment = i === 0 && firstPayment != null
          ? firstPayment
          : perPayment as number

        const month = currentDate.getMonth() + i
        const date = new Date(currentDate)
        date.setMonth(month)

        return new PaymentDay(payment, date)
      })

      const { date } = schedule[schedule.length - 1]
      const lastPaymentDate = new Date()
      lastPaymentDate.setMonth(date.getMonth() + 1)

      commit(SET_PAYMENT_SCHEDULE, schedule);
      commit(UPDATE_PAYMENT_MODEL, { lastPaymentDate })
    }
  },

  async [SEND_PAYMENTS]({ state, getters }) {
    const { schedule, lastPaymentDate } = state.model
    const { lastPayment } = getters
    const lastPaymentDay = new PaymentDay(lastPayment, lastPaymentDate as Date)
    const payments = [ ...schedule as PaymentDay[], lastPaymentDay ]

    await PaymentService.sendPayments(payments)
  },

  [UPDATE_PAYMENT_MODEL]({ commit }, model: PaymentState["model"]) {
    commit(UPDATE_PAYMENT_MODEL, model)
  },

  [UPDATE_PAYMENT_SCHEDULE_DAY]({ commit }, { index, day }) {
    commit(UPDATE_PAYMENT_SCHEDULE_DAY, { index, day })
  }
}

export const payment: Module<PaymentState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}