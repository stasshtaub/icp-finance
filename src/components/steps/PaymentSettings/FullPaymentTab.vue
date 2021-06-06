<template>
  <el-row>
    <el-button type="success" @click="sendReport">
			Отправить отчёт
		</el-button>
    <el-button type="primary" @click="updateData">
			Обновить данные
		</el-button>
  </el-row>
</template>

<script>
import { UpdateData } from "@/mixins/updateData";

export default {
  name: "FullPaymentTab",

  mixins: [UpdateData],

  methods: {
    sendReport() {
      console.log("Implement sendReport");
    },
  },
};
</script>

<style>
</style>