<template>
  <div class="payment-settings">
    <el-radio-group v-model="paymentType" :disabled="isDisabled">
      <el-radio-button :key="type.value" v-for="type in paymentTypes" :label="type.value">
        {{ type.label }}
      </el-radio-button>
    </el-radio-group>

    <div class="payment-settings__content">
      <component :is="currentTab" @success-send="$emit('success-send')" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "@vasiliyrusin/vue-mapfields";
import { UPDATE_PAYMENT_MODEL } from "@/constants/mutations";
import { UpdateData } from "@/mixins/updateData";
import FullPaymentTab from "./PaymentSettings/FullPaymentTab.vue";
import InstalmentsTab from "./PaymentSettings/InstalmentsTab.vue";

export default {
  name: "PaymentSettings",

  mixins: [UpdateData],

  components: { FullPaymentTab, InstalmentsTab },

  data() {
    return {
      tabs: {
        instalments: "InstalmentsTab",
        full: "FullPaymentTab",
      }
    }
  },

  computed: {
    ...mapState("payment", {
      paymentTypes: (state) => state.options.paymentTypes,
      isDisabled: (state) => state.model.schedule != null
    }),

    ...mapFields("payment", {
      fields: ["paymentType"],
      base: "model",
      action: UPDATE_PAYMENT_MODEL,
    }),

    currentTab() {
      return this.tabs[this.paymentType]
    }
  }
};
</script>

<style lang="scss">
.payment-settings {
  &__content {
    margin-top: 20px;
  }
}
</style>
