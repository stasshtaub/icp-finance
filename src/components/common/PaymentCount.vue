<template>
  <div class="payment-count">      
    <el-row type="flex" :gutter="8">
      <el-col :span="8">
        <el-form-item>
          <CustomPlaceholder :value="paymentCount" placeholder="Количество платежей">
            <el-select
              v-model="paymentCount"
              placeholder="Количество платежей"
              :disabled="isDisabled"
              @change="CALC_PAYMENT_PER_PAYMENT">
              <el-option
                v-for="n in paymentCounts"
                :key="n"
                :label="n"
                :value="n">
              </el-option>
            </el-select>
          </CustomPlaceholder>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <CustomPlaceholder :value="perPayment" placeholder="По">
            <el-input
              placeholder="По"
              v-model.number="perPayment"
              :disabled="isDisabled"
              @input="CALC_PAYMENT_COUNT">
              <span slot="suffix">Р</span>
            </el-input>
          </CustomPlaceholder>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" :gutter="8">
      <el-col :span="8">
        <el-checkbox
          v-model="withFirstPayment"
          :disabled="isDisabled">
          Первый платёж
        </el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <el-input
            placeholder="Введите сумму"
            v-model.number="firstPayment"
            :disabled="isDisabled || !withFirstPayment">
            <span slot="suffix">Р</span>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { mapFields } from "@vasiliyrusin/vue-mapfields";
import { UPDATE_PAYMENT_MODEL } from "@/constants/mutations";
import { CALC_PAYMENT_COUNT, CALC_PAYMENT_PER_PAYMENT } from "@/constants/actions";
import CustomPlaceholder from './CustomPlaceholder.vue';

export default {
  name: "PaymentCount",

  components: { CustomPlaceholder },

  computed: {
    ...mapState("payment", {
      isDisabled: (state) => state.model.schedule != null
    }),

    ...mapGetters("payment", ["paymentCounts"]),

    ...mapFields("payment", {
      fields: [
        "paymentCount",
        "perPayment",
        "firstPayment"
      ],
      base: "model",
      action: UPDATE_PAYMENT_MODEL
    }),

    withFirstPayment: {
      get() {
        return this.firstPayment != null
      },

      set(value) {
        this.firstPayment = value ? 0 : null;
      }
    }
  },

  methods: {
    ...mapActions("payment", [CALC_PAYMENT_COUNT, CALC_PAYMENT_PER_PAYMENT])
  }
};
</script>

<style scoped lang="scss">
.payment-count {
  max-width: 650px;
}
</style>
