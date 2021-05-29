<template>
  <el-form class="payment-schedule">
    <ol class="payment-schedule__list">
      <li class="payment-schedule__item" :key="i" v-for="(_, i) in schedule">
        <PyamentDay
          :date.sync="schedule[i].date"
          :payment.sync="schedule[i].payment"
          @update:date="updateDate($event, i)"
          @update:payment="updatePayment($event, i)" />
      </li>
    </ol>
  </el-form>
</template>

<script>
import PyamentDay from "./PyamentDay.vue";
import { mapMutations, mapState } from "vuex";
import { UPDATE_PAYMENT_SCHEDULE_DAY } from '@/constants/mutations';

export default {
  name: "PaymentSchedule",

  components: { PyamentDay },

  computed: {
    ...mapState("payment", {
      schedule: (state) => state.model.schedule
    })
  },

  methods: {
    ...mapMutations("payment", [UPDATE_PAYMENT_SCHEDULE_DAY]),

    updateDate(date, index) {
      this.UPDATE_PAYMENT_SCHEDULE_DAY({ index, day: { date } })
    },

    updatePayment(payment, index) {
      this.UPDATE_PAYMENT_SCHEDULE_DAY({ index, day: { payment } })
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
