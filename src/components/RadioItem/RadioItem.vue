<template>
  <div class="vc-radio-item" :class="classes" @click="onClick">
    <slot :active="active"></slot>
  </div>
</template>

<script>
export const props = {
  value: {},
}

export default {
  name: 'RadioItem',

  inject: {
    radioGroup: {
      default: undefined,
    },
  },

  props,

  computed: {
    active() {
      return this.radioGroup?.innerValue === (this.value ?? this.index)
    },
    classes() {
      return {
        [this.radioGroup.activeClass]: this.active,
      }
    },
  },

  created() {
    this.index = this.radioGroup.getItemIndex()
  },

  methods: {
    onClick(e) {
      this.$emit('click', e)
      this.radioGroup?.selectItem(this.value ?? this.index)
    },
  },
}
</script>

<style scoped>

</style>
