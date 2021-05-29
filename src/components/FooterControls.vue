<template>
  <el-row>
    <template v-if="isFullPayment">
      <el-button type="success" @click="sendReport">
        Отправить отчёт
      </el-button>
    </template>

    <template v-else>
      <template v-if="hasSchedule">
        <el-button type="success" @click="send">
          Начать отправку
        </el-button>
        <el-button type="info" @click="cancel">
          Отменить
        </el-button>
      </template>
      <el-button v-else type="success" @click="generateSchedule">
        Сформировать график
      </el-button>
    </template>

    <el-button type="primary" @click="updateData">
      Обновить данные
    </el-button>
  </el-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FooterControls",

  computed: {
    ...mapState("payment", {
      isFullPayment: (state) => state.model.paymentType === "full",
      hasSchedule: (state) => state.model.schedule != null
    })
  },

  methods: {
    sendReport() {
      this.$emit("send-report");
    },

    generateSchedule() {
      this.$emit("generate-schedule");
    },

    cancel() {
      this.$emit("cancel");
    },

    updateData() {
      this.$emit("update-data");
    },

    send() {
      this.$emit("send");
    },
  },
};
</script>

<style>
</style>