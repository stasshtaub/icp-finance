<template>
  <div id="app" class="layout" v-loading="isLoading">
    <FinanceHeader />
    <div class="layout__body">
      <component :is="currentStep" @success-send="openControl" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { GENERATE_SCHEDULE, GET_AUTH, GET_PAYMENTS, GET_USER } from "./constants/actions";
import { EMPTY_PAYMENT_SCHEDULE } from './constants/mutations';
import FinanceHeader from './components/common/FinanceHeader.vue';
import PaymentSettings from './components/steps/PaymentSettings.vue';
import PaymentsControl from './components/steps/PaymentsControl.vue';

export default {
  name: "App",

  components: {
    FinanceHeader,
    PaymentSettings,
    PaymentsControl
  },

  async created() {
    await this.GET_AUTH();
    this.GET_USER();

    await this.GET_PAYMENTS();

    // TODO: Расскомментировать после интеграции
    // if (this.hasTable) {
    //   this.openControl()
    // }
  },

  data() {
    return {
      currentStep: "PaymentSettings"
    }
  },

  computed: {    
    ...mapState("paymentsControl", {
      hasTable: (state) => state.data.items.length > 0
    }),

    isLoading() {
      return this.$wait(`auth/${GET_AUTH}`) || this.$wait(`user/${GET_USER}`);
    },
  },

  methods: {
    ...mapActions("auth", [GET_AUTH]),
    ...mapActions("user", [GET_USER]),
    ...mapActions("payment", [GENERATE_SCHEDULE]),
    ...mapActions("paymentsControl", [GET_PAYMENTS]),
    ...mapMutations("payment", [EMPTY_PAYMENT_SCHEDULE]),

    openControl() {
      this.currentStep = "PaymentsControl"
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
    padding: 20px;
}

body {
  margin: 0;
}

h2, p {
  margin: 0;
}

.el {
  &-row {
    & + & {
      margin-top: 12px;
    }
  }

  &-form-item {
    margin-right: 0 !important;
    margin-bottom: 0 !important;
  }
}

.layout {
  &__body {
    margin-top: 20px;
  }
}
</style>
