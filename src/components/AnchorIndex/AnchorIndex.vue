<template>
  <div class="vc-anchor-index">
    <slot v-bind="{ active, index: innerIndex }"></slot>
  </div>
</template>

<script>
export const props = {
  index: {},
}

export default {
  name: 'AnchorIndex',

  inject: {
    anchor: {
      default: undefined,
    },
  },

  props,

  data: () => ({
    innerIndex: null,
  }),

  computed: {
    active() {
      return this.anchor?.index === this.innerIndex
    },
  },

  mounted() {
    const index = this.anchor.register(this)
    this.innerIndex = this.index ?? index
  },

  destroyed() {
    this.anchor.unregister(this)
  },
}
</script>

<style scoped>
.vc-anchor-index::after {
  position: absolute;
  top: -10px;
  display: inline-block;
  width: 10px;
  height: 10px;
  content: '';
  background: red;
}
</style>
