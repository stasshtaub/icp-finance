import { ActionTree, GetterTree, MutationTree } from "vuex";
import { PaymentsControlState } from "../types/paymentsControl";
import { RootState } from "../types/root-state";
import { GET_PAYMENTS } from "@/constants/actions";
import { SET_PAYMENTS } from "@/constants/mutations";
import { PaymentsControlService } from "@/services/PaymentsControlService";

const initialState = (): PaymentsControlState => ({
	data: {
		items: [],
		count: 0
	}
})

const state: () => PaymentsControlState = initialState;

const getters: GetterTree<PaymentsControlState, RootState> = {
	paid: (state) => state.data.items
		.filter(({ status }) => status === "paid")
		.reduce((summ, { payment }) => summ + payment, 0),

	debt: (_, getters, rootState) => {
		const paymentAmount = rootState.user?.data?.paymentAmount
		
		if (paymentAmount != null) {
			const { paid } = getters;
			return paymentAmount - paid;
		}
	}
}

const mutations: MutationTree<PaymentsControlState> = {
	[SET_PAYMENTS](state, payments) {
		state.data = payments;
	}
}

const actions: ActionTree<PaymentsControlState, RootState> = {
	async [GET_PAYMENTS]({ commit }) {
		const { data } = await PaymentsControlService.getPayments();

		commit(SET_PAYMENTS, data)
	}
}

export const paymentsControl = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
