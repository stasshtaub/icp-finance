<template>
  <div>
    <el-row>
      <el-table :data="payments">
        <el-table-column align="center" type="index" label="№" width="50" />
        <el-table-column
          align="center"
          prop="payment"
          label="Сумма"
          #default="{ row }"
        >
          {{ formatCurrency(row.payment) }}
        </el-table-column>
        <el-table-column
          align="center"
          prop="invoiceDate"
          label="Дата счёта"
          #default="{ row }"
        >
          {{ formatDate(row.invoiceDate) }}
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="Статус"
          #default="{ row }"
        >
          {{ translations.status[row.status] }}
        </el-table-column>
        <el-table-column
          align="center"
          prop="paymentDate"
          label="Дата оплаты"
          #default="{ row }"
        >
          {{ formatDate(row.paymentDate) }}
        </el-table-column>
        <el-table-column align="center" label="Действия" #default="{ row }">
          <el-button
            type="text"
            v-if="hasAction(row.status)"
            @click="actionByRow(row)"
          >
            {{ getActionText(row.status) }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row>
      <el-button type="primary" @click="updateData">
        Обновить данные
      </el-button>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { UpdateData } from "@/mixins/updateData";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

export default {
  name: "PaymentsControl",

  mixins: [UpdateData],

  data() {
    return {
      translations: {
        status: {
          paid: "Оплачен",
          sent: "Оптравлен",
        },
      },
    };
  },

  computed: {
    ...mapState("paymentsControl", {
      payments: ({ data }) => data.items,
    })
  },

  methods: {
    resend(row) {
      console.warn("Implement 'resend' method");
    },

    sendNow(row) {
      console.warn("Implement 'sendNow' method");
    },

    hasAction(status) {
      return status !== "paid";
    },

    getActionText(status) {
      switch (status) {
        case "sent":
          return "отправить повторно";
        default:
          return "отправить сейчас";
      }
    },

    actionByRow(row) {
      switch (row.status) {
        case "sent":
          this.resend(row);
          break;
        default:
          this.sendNow(row);
      }
    },

    formatCurrency,
    formatDate
  },
};
</script>

<style>
</style>