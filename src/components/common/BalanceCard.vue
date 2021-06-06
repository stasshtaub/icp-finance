<template>
  <div
    class="balance-card"
    :class="{ [`balance-card--align--${align}`]: align }">
    <h2
      class="balance-card__value"
      :class="{ [`balance-card__value--type--${type}`]: type }"
    >
      {{ formatCurrency(balance) }}
    </h2>
    <div class="balance-card__body">
      <slot />
    </div>
  </div>
</template>

<script>
import { formatCurrency } from "@/utils/formatCurrency";

export default {
  name: "BalanceCard",

  props: {
    balance: {
      type: Number,
      default: null,
    },

    type: {
      type: String,
      default: null,
    },

    align: {
      type: String,
      default: null
    }
  },

  methods: {
    formatCurrency,
  },
};
</script>

<style lang="scss">
.balance-card {
  &--align {
    &--center {
      text-align: center;
    }
  }

  &__value {
    &--type {
      &--paid {
        color: green;
      }

      &--debt {
        color: orange;
      }
    }
  }

  &__body {
    margin-top: 10px;
  }
}
</style>