<template>
  <div class="payment-count">
    <el-form inline>
      <el-row>
        <el-radio-group v-model="paymentType" :disabled="isDisabled">
          <el-radio-button :key="type.value" v-for="type in paymentTypes" :label="type.value">
            {{ type.label }}
          </el-radio-button>
        </el-radio-group>
      </el-row>
      <template v-if="isInstalments">
        <el-row>
          <el-col :span="14">
            <el-form-item label="Количество платежей">
              <el-select
                v-model="paymentCount"
                placeholder="Выберите"
                :disabled="isDisabled">
                <el-option
                  v-for="n in paymentCounts"
                  :key="n"
                  :label="n"
                  :value="n">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="по">
              <el-input
                placeholder="Введите сумму"
                v-model.number="perPayment"
                :disabled="isDisabled">
                <span slot="suffix">Р</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="14">
            <el-checkbox
              v-model="withFirstPayment"
              :disabled="isDisabled">
              Первый платёж
            </el-checkbox>
          </el-col>
          <el-col :span="10">
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
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mapFields } from "@vasiliyrusin/vue-mapfields";
import { UPDATE_PAYMENT_MODEL } from "@/constants/mutations";
import { PaymentState, PaymentType } from "@/store/types/payment";

export default Vue.extend({
  name: "PaymentCount",

  computed: {
    ...mapState("payment", {
      paymentTypes: (state) => (state as PaymentState).options.paymentTypes,
      paymentCounts: (state) => (state as PaymentState).options.paymentCounts,
      isDisabled: (state) => (state as PaymentState).model.schedule != null
    }),

    ...mapFields("payment", {
      fields: [
        "paymentType",
        "paymentCount",
        "perPayment",
        "firstPayment"
      ],
      base: "model",
      action: UPDATE_PAYMENT_MODEL
    }) as {
      paymentType: () => PaymentType,
      paymentCount: () => number,
      perPayment: () => number,
      firstPayment: () => number | null
    },

    isInstalments() {
      return this.paymentType === "instalments"
    },

    withFirstPayment: {
      get() {
        return this.firstPayment != null
      },

      set(value) {
        this.firstPayment = value ? 0 : null;
      }
    }
  }
});
</script>

<style scoped lang="scss">
.payment-count {
  max-width: 640px;
}

.el {
  &-col {
    text-align: right;
  }
}
</style>
