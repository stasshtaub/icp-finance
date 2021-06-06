<template>
  <div class="custom-placeholder">
    <slot />
    <span
      class="custom-placeholder__label"
      :class="{ 'custom-placeholder__label--active': isActive }">
      {{ placeholder }}
    </span>
  </div>
</template>

<script>
export default {
  name: "CustomPlaceholder",

  props: {
    placeholder: {
      type: String,
      default: null,
    },

    value: {
      default: null,
    },
  },

  computed: {
    isActive() {
      return this.value != null && this.value !== "";
    },
  },
};
</script>

<style lang="scss">
.custom-placeholder {
  &__label {
    display: block;
    position: absolute;
    top: 0;
    line-height: 1;
    margin: 0 0.5em;
    transform: translateY(-50%);
    background-color: white;
    padding: 0 0.5em;
    color: #c0c4cc;
    font-size: 0.85em;
    opacity: 0;
    transition: opacity 0.3s ease;

    &--active {
      opacity: 1;
    }
  }
}
</style>