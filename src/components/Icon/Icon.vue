<template>
  <text v-bind="attrs" @click="$emit('click', $event)">
    {{ iconCode }}
  </text>
</template>

<script>
import { keyBy } from 'lodash'
import { createNamespace, convertToUnit } from '../../utils'
import options from '../../config/options'

const [name] = createNamespace('Icon')

export const props = {
  name: String,
  code: String,
  size: [String, Number],
  color: String,
  prefix: String,
  fontFamily: {
    type: String,
    default: 'iconfont',
  },
  fontClass: {
    type: String,
    default: 'iconfont',
  },
  source: String,
  ...uni.$vc?.props?.Icon,
}

let glyphsMap

export default {
  name,

  props,

  computed: {
    attrs() {
      return {
        class: ['vc-icon', this.fontClass, this.iconName],
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
      if (!this.name) return ''
      const prefix = this.prefix ? `${this.prefix}-` : ''
      if (new RegExp(`^${prefix}`).test(this.name)) return this.name
      return `${prefix}${this.name}`
    },
    iconSize() {
      return convertToUnit(this.size)
    },
    iconCode() {
      let code = ''
      if (this.code) {
        code = this.code.substring(3, 7)
      } else if (this.name && options.icons) {
        const iconName = this.name.replace(options.icons?.css_prefix_text, '')
        code = glyphsMap[iconName].unicode
      }
      return code ? JSON.parse(`"\\u${code}"`) : ''
    },
  },

  beforeCreate() {
    if (!glyphsMap) {
      glyphsMap = keyBy(options.icons.glyphs, 'font_class')
    }
  },

  created() {
    /* #ifdef APP-NVUE */
    if (this.source) {
      const domModule = weex.requireModule('dom')
      domModule.addRule('fontFace', {
        fontFamily: this.fontFamily,
        src: `url('${this.source}')`,
      })
    }
    /* #endif */
  },
}
</script>

<style lang="scss">
.vc-icon {
  font-family: iconfont;
  line-height: initial;
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
}
</style>
