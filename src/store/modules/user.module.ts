import { GET_USER } from "@/constants/actions";
import { SET_USER } from "@/constants/mutations";
import { UserService } from "@/services/UserService";
import { ActionTree, Module, MutationTree } from "vuex";
import { RootState } from "../types/root-state";
import { UserState } from "../types/user";

const state = (): UserState => {
  return {
    data: null
  };
};

const mutations: MutationTree<UserState> = {
  [SET_USER](state, user) {
    state.data = user;
  }
}

const actions: ActionTree<UserState, RootState> = {
  async [GET_USER]({ commit }) {
    const { data } = await UserService.getUser();
    commit(SET_USER, data);
  }
}

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
}
