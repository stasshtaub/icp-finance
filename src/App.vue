<template>
  <div id="app" v-loading="isLoading">
    <el-row>
      <el-col :span="6">
        <UserInfo />
      </el-col>
      <el-col :span="16">
        <PaymentCount />
      </el-col>
    </el-row>
    <el-row v-if="hasSchedule">
      <PaymentSchedule />
    </el-row>
    <FooterControls
      @generate-schedule="GENERATE_SCHEDULE"
      @cancel="EMPTY_PAYMENT_SCHEDULE"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { GENERATE_SCHEDULE, GET_AUTH, GET_USER } from "./constants/actions";
import UserInfo from "./components/UserInfo.vue";
import PaymentCount from "./components/PaymentCount.vue";
import PaymentSchedule from "./components/PaymentSchedule.vue";
import FooterControls from './components/FooterControls.vue';
import { EMPTY_PAYMENT_SCHEDULE } from './constants/mutations';

export default {
  name: "App",

  components: {
    UserInfo,
    PaymentCount,
    PaymentSchedule,
    FooterControls,
  },

  async created() {
    await this.GET_AUTH();
    this.GET_USER();
  },

  computed: {
    ...mapState("payment", {
      hasSchedule: (state) => state.model.schedule && state.model.paymentType === "instalments"
    }),

    isLoading() {
      return this.$wait(`auth/${GET_AUTH}`) || this.$wait(`user/${GET_USER}`);
    }
  },

  methods: {
    ...mapActions("auth", [GET_AUTH]),
    ...mapActions("user", [GET_USER]),
    ...mapActions("payment", [GENERATE_SCHEDULE]),
    ...mapMutations("payment", [EMPTY_PAYMENT_SCHEDULE])
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  max-width: 1200px;
}

.el {
  &-row {
    & + & {
      margin-top: 22px;
    }
  }

  &-form-item {
    margin-right: 0 !important;
    margin-bottom: 0 !important;
  }
}
</style>
