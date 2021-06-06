<template>
  <div class="payment-schedule">
    <h4>График платежей</h4>
    <ol class="payment-schedule__list">
      <li class="payment-schedule__item" :key="i" v-for="(_, i) in schedule">
        <PyamentDay
          :date.sync="schedule[i].date"
          :payment.sync="schedule[i].payment"
          :last-payment="lastPayment"
          :total-payment="paymentAmount"
          @update:date="updateDate($event, i)"
          @update:payment="updatePayment($event, i)" />
      </li>
      <li class="payment-schedule__item">
        <PyamentDay
          :date.sync="lastPaymentDate"
          :payment="lastPayment"
          disabled-payment />
      </li>
    </ol>
  </div>
</template>

<script>
import PyamentDay from "./PyamentDay.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { mapFields } from "@vasiliyrusin/vue-mapfields";
import { UPDATE_PAYMENT_MODEL, UPDATE_PAYMENT_SCHEDULE_DAY } from '@/constants/mutations';

export default {
  name: "PaymentSchedule",

  components: { PyamentDay },

  computed: {
    ...mapFields("payment", {
      fields: ["lastPaymentDate"],
      base: "model",
      action: UPDATE_PAYMENT_MODEL
    }),

    ...mapState("payment", {
      schedule: (state) => state.model.schedule
    }),

    ...mapState("user", {
      paymentAmount: (state) => state.data.paymentAmount
    }),

    ...mapGetters("payment", ["lastPayment"])
  },

  methods: {
    ...mapActions("payment", [UPDATE_PAYMENT_SCHEDULE_DAY]),

    updateDate(date, index) {
      this.UPDATE_PAYMENT_SCHEDULE_DAY({ index, day: { date } })
    },

    updatePayment(payment, index) {
      this.UPDATE_PAYMENT_SCHEDULE_DAY({ index, day: { payment } })
    },

    isPaymentDisabled(index) {
      return index === this.schedule.length - 1;
    }
  }
};
</script>

<style scoped lang="scss">
.payment-schedule {
  &__list {
    margin: 0;
    padding: 0;

    counter-reset: num;
    list-style-type: none;
  }
  
  &__item {
    display: flex;
    align-items: center;

    &::before {
      margin-right: 12px;
      counter-increment: num;
      content: counter(num);
    }

    & + & {
      margin-top: 12px;
    }

    > * {
      flex-grow: 1;
    }
  }
}
</style>
