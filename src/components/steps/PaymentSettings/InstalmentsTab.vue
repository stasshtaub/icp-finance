<template>
  <el-form>
    <el-row>
      <el-col :span="14">
        <PaymentCount />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        <PaymentSchedule v-if="hasSchedule" />
      </el-col>
    </el-row>

    <el-row>
      <template v-if="hasSchedule">
        <el-button type="success" :loading="isLoading" @click="startSend">
          Начать отправку
        </el-button>
        <el-button type="info" @click="EMPTY_PAYMENT_SCHEDULE">
          Отменить
        </el-button>
      </template>
      <el-button
        v-else
        type="success"
        :disabled="isScheduleDisabled"
        @click="GENERATE_SCHEDULE"
      >
        Сформировать график
      </el-button>

      <el-button type="primary" @click="updateData">
        Обновить данные
      </el-button>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { EMPTY_PAYMENT_SCHEDULE } from '@/constants/mutations';
import { CALC_PAYMENT_COUNT, GENERATE_SCHEDULE, SEND_PAYMENTS } from '@/constants/actions';
import { UpdateData } from "@/mixins/updateData";
import PaymentCount from "@/components/common/PaymentCount.vue";
import PaymentSchedule from "@/components/common/PaymentSchedule.vue";

export default {
  name: "InstalmentsTab",

  mixins: [UpdateData],
  
  components: { PaymentCount, PaymentSchedule },

  computed: {
    ...mapState("payment", {
      hasSchedule: (state) => state.model.schedule && state.model.paymentType === "instalments",
      isScheduleDisabled: (state) => state.model.paymentCount == null
    }),

    isLoading() {
      return this.$wait(`payment/${ SEND_PAYMENTS }`)
    }
  },

  methods: {
    ...mapActions("payment", [CALC_PAYMENT_COUNT, GENERATE_SCHEDULE, SEND_PAYMENTS]),
    ...mapMutations("payment", [EMPTY_PAYMENT_SCHEDULE]),

    async startSend() {
      await this.SEND_PAYMENTS()
      this.$emit("success-send")
    }
  },
};
</script>

<style>
</style>