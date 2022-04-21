<template>
  <div class="vc-img" :style="sizeable" @click="$emit('click', $event)">
    <image
      v-bind="$attrs"
      class="vc-img__image"
      :style="naturalSize"
      :src="innerSrc"
      lazy-load
      @load="onLoaded"
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

  data: () => ({
    naturalWidth: 0,
    naturalHeight: 0,
  }),

  computed: {
    sizeable() {
      return {
        width: convertToUnit(this.width) || convertToUnit(this.size),
        height: convertToUnit(this.height) || convertToUnit(this.size),
      }
    },
    naturalSize() {
      return {
        width: convertToUnit(this.naturalWidth),
        height: convertToUnit(this.naturalHeight),
      }
    },
    innerSrc() {
      if (process.env.NODE_ENV !== 'production' && /^lorem/.test(this.src)) {
        return this.src.replace('lorem', `https://picsum.photos/seed/${Math.random()}/`)
      }

      return this.src
    },
  },

  methods: {
    onLoaded(e) {
      this.naturalWidth = e.detail.width
      this.naturalHeight = e.detail.height
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
  max-width: 100%;
  max-height: 100%;
}
</style>
