<template>
  <component :is="tag" v-bind="attrs" />
</template>

<script>
import { createNamespace } from '../../utils'
import props from './props'

const [name] = createNamespace('Icon')

const UNI_ICONS = 'uni'

export default {
  name,

  props,

  data: () => ({
    tag: 'text',
  }),

  computed: {
    attrs() {
      if (this.source === UNI_ICONS) {
        return {}
      }
      return {
        class: ['vc-icon', this.source, this.iconName],
        style: this.styles,
      }
    },
    styles() {
      return {
        color: this.color,
        fontSize: this.iconSize,
      }
    },
    iconName() {
      return `icon-${this.name}`
    },
    iconSize() {
      const configSize = this.size
      return isNaN(Number(configSize)) ? configSize : `${configSize}rpx`
    },
  },

  created() {
    if (this.source === UNI_ICONS) this.tag = 'uni-icons'
  },
}
</script>

<style lang="scss">
$uni-color-primary: red !default;

.vc-icon {
  color: $uni-color-primary;
}
</style>
