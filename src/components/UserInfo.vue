<template>
  <div class="user-info">
    <template v-if="user">
      <p>{{ user.paymentAmount }}</p>
      <p>{{ fullName }}</p>
      <p>{{ user.email }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserState } from "@/store/types/user";
import { mapState } from "vuex";

export default Vue.extend({
  name: 'UserInfo',

  computed: {
    ...mapState("user", {
      user: (state) => (state as UserState).data
    }),

    fullName() {
      const { user } = this;
      if (user) {
        return `${ user.firstName } ${ user.lastName }`
      }
      return undefined;
    }
  }
});
</script>

<style scoped lang="scss">
</style>
