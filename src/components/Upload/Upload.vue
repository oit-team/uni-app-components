<template>
  <component :is="tag" @click="onUpload">
    <slot></slot>
  </component>
</template>

<script>
import { createNamespace } from '../../utils'

const [name] = createNamespace('Upload')

export const props = {
  tag: {
    type: String,
    default: 'div',
  },
}

export default {
  name,

  props,

  methods: {
    onUpload() {
      uni.chooseImage({
        count: 9,
        success: e => {
          this.$emit('choose', e)
          console.log(e)
        },
      })
    },
  },
}
</script>

<style scoped>

</style>
