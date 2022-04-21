<template>
  <div class="vc-container" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import { createNamespace } from '../../utils'

const [name] = createNamespace('Container')

export const props = {
  top: {
    type: Boolean,
    default: true,
  },
  bottom: {
    type: Boolean,
    default: true,
  },
  max: Boolean,
  overflowAuto: Boolean,
}

export default {
  name,

  props,

  computed: {
    styles() {
      const options = {
        ' - var(--window-top)': this.top,
        ' - var(--window-bottom)': this.bottom,
      }
      const calc = Object
        .entries(options)
        .reduce((prev, [item, enable]) => {
          prev += enable ? item : ''
          return prev
        }, '')
      const styles = {
        minHeight: `calc(100vh${calc})`,
        overflow: this.overflowAuto ? 'auto' : '',
      }
      if (this.max) styles.height = styles.minHeight
      return styles
    },
  },
}
</script>

<style scoped>
.vc-container {
  overflow: hidden;
}
</style>
