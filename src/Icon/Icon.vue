<template>
  <component :is="tag" v-bind="attrs" />
</template>

<script>
import config from './config'

const UNI_ICONS = 'uni'

export { config }

export default {
  name: 'VcIcon',

  components: {},

  props: {
    name: String,
    size: {
      type: [String, Number],
      default: '1em',
    },
    color: String,
    source: {
      type: String,
      default: 'iconfont',
    },
  },

  data: () => ({
    iconName: '',
    iconSize: '',
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
  },

  watch: {
    name: {
      immediate: true,
      handler() {
        this.iconName = `icon-${this.name}`
      },
    },
    size: {
      immediate: true,
      handler() {
        this.iconSize = config.sizes[this.size] || isNaN(Number(this.size)) ? this.size : `${this.size}rpx`
      },
    },
  },

  created() {
    if (this.source === UNI_ICONS) this.tag = 'uni-icons'
  },
}
</script>

<style lang="scss" scoped>

</style>
