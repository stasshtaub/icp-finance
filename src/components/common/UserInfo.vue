<template>
  <div class="user-info">
    <template v-if="user">
      <BalanceCard :balance="user.paymentAmount">
        <p class="user-info__name">{{ fullName }}</p>
        <a class="user-info__email" :href="`mailto:${ user.email }`">{{ user.email }}</a>
      </BalanceCard>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BalanceCard from './BalanceCard.vue';

export default {
  name: 'UserInfo',

  components: { BalanceCard },

  computed: {
    ...mapState("user", {
      user: (state) => state.data
    }),

    fullName() {
      const { user } = this;
      if (user) {
        return `${ user.firstName } ${ user.lastName }`
      }
      return undefined;
    }
  }
};
</script>

<style lang="scss">
.user-info {
  &__email {
    display: block;
    margin-top: 0.3em;
  }
}
</style>
