import { GET_AUTH } from "@/constants/actions";
import { SET_AUTH } from "@/constants/mutations";
import { AuthService } from "@/services/AuthService";
import { ActionTree, Module, MutationTree } from "vuex";
import { RootState } from "../types/root-state";
import { AuthState } from "../types/auth";

const state = (): AuthState => {
  return {
    data: null
  };
};

const mutations: MutationTree<AuthState> = {
  [SET_AUTH](state, auth) {
    state.data = auth;
  }
}

const actions: ActionTree<AuthState, RootState> = {
  async [GET_AUTH]({ commit }) {
    const resp = await AuthService.auth();
    commit(SET_AUTH, resp);
  }
}

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
}
