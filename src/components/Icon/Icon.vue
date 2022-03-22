<template>
  <component :is="tag" v-bind="attrs" @click="$emit('click', $event)" />
</template>

<script>
import { createNamespace, convertToUnit } from '../../utils'

const [name] = createNamespace('Icon')

const UNI_ICONS = 'uni'

export const props = {
  name: String,
  size: [String, Number],
  color: String,
  prefix: String,
  source: String,
}

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
      const prefix = this.prefix ? `${this.prefix}-` : ''
      if (new RegExp(`^${prefix}`).test(this.name)) return this.name
      return `${prefix}${this.name}`
    },
    iconSize() {
      return convertToUnit(this.size)
    },
  },

  created() {
    if (this.source === UNI_ICONS) this.tag = 'uni-icons'
  },
}
</script>

<style lang="scss">
.vc-icon {}
</style>
