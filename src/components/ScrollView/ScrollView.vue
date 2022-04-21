<template>
  <scroll-view
    v-bind="$attrs"
    class="vc-scroll-view"
    :scroll-y="scrollY"
    v-on="$listeners"
    @scrolltolower="handleScrollBottom"
  >
    <slot></slot>
  </scroll-view>
</template>

<script>
import { createNamespace } from '../../utils'

const [name] = createNamespace('ScrollView')

export const props = {
  scrollY: {
    type: Boolean,
    default: true,
  },
}

export default {
  name,

  provide() {
    return {
      scrollView: this,
    }
  },

  props,

  data: () => ({
    onScrollBottom: undefined,
  }),

  methods: {
    handleScrollBottom() {
      typeof this.onScrollBottom === 'function' && this.onScrollBottom()
    },
  },
}
</script>

<style scoped>
.vc-scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
