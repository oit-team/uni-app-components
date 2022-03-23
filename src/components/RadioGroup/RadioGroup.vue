<template>
  <div class="vc-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export const props = {
  value: {},
  activeClass: {
    type: String,
    default: 'vc-radio-item--active',
  },
}

export default {
  name: 'RadioGroup',

  provide() {
    return {
      radioGroup: this,
    }
  },

  props,

  data: () => ({
    innerValue: undefined,
    itemIndex: 0,
  }),

  watch: {
    value: {
      immediate: true,
      handler() {
        this.innerValue = this.value
      }
      ,
    },
    innerValue(value) {
      this.$emit('change', value)
    },
  },

  methods: {
    selectItem(value) {
      this.$emit('input', value)
      this.innerValue = value
    },
    getItemIndex() {
      return this.itemIndex++
    },
  },
}
</script>

<style scoped>

</style>
