<template>
  <el-row class="payment-day" :gutter="12">
    <el-col :span="8">
      <el-form-item>
        <el-input
          v-model.number="_payment"
          placeholder="Введите сумму"
          :min="0"
          :disabled="disabledPayment">
          <span slot="suffix">Р</span>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item>
        <el-date-picker
          v-model="_date"
          type="date"
          placeholder="Выберите дату">
        </el-date-picker>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "PyamentDay",

  props: {
    date: {
      type: Date,
      default: null
    },

    payment: {
      type: Number,
      default: null
    },

    disabledPayment: {
      type: Boolean,
      default: false
    },

    lastPayment: {
      type: Number,
      default: null
    },

    totalPayment: {
      type: Number,
      default: null
    }
  },

  computed: {
    _date: {
      get()  {
        return this.date
      },

      set(value) {
        this.$emit("update:date", value)
      } 
    },

    _payment: {
      get()  {
        return this.payment
      },

      set(value) {        
        this.$emit("update:payment", value)
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
