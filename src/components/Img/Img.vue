<template>
  <div class="vc-img" :style="sizeable">
    <image
      v-bind="$attrs"
      class="vc-img__image"
      :style="styles"
      :src="innerSrc"
      lazy-load
    />
  </div>
</template>

<script>
import { convertToUnit, createNamespace } from '../../utils'

const [name] = createNamespace('Img')

export const props = {
  src: String,
  width: [String, Number],
  height: [String, Number],
  size: [String, Number],
}

export default {
  name,

  props,

  computed: {
    sizeable() {
      return {
        width: convertToUnit(this.width) || convertToUnit(this.size),
        height: convertToUnit(this.height) || convertToUnit(this.size),
      }
    },
    styles() {
      return {}
    },
    innerSrc() {
      if (process.env.NODE_ENV !== 'production' && /^lorem/.test(this.src)) {
        return this.src.replace('lorem', `https://picsum.photos/seed/${Math.random()}/`)
      }

      return this.src
    },
  },
}
</script>

<style scoped>
.vc-img {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.vc-img__image {
  width: 100%;
  height: 100%;
}
</style>
