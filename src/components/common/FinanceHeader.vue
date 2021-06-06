<template>
  <header class="finance-header">
    <el-row>
      <el-col :span="4">
        <UserInfo />
      </el-col>
      <el-col :span="4">
        <BalanceCard
          :balance="paid"
          type="paid"
          align="center">
          Оплачено
        </BalanceCard>
      </el-col>
      <el-col :span="4">
        <BalanceCard
          :balance="debt"
          type="debt"
          align="center">
          Оставшийся долг
        </BalanceCard>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import BalanceCard from "./BalanceCard.vue";
import UserInfo from "./UserInfo.vue";

export default {
  name: "FinanceHeader",

  components: { BalanceCard, UserInfo },

  computed: {
    ...mapGetters("paymentsControl", ["paid", "debt"])
  }
};
</script>

<style lang="scss">
</style>