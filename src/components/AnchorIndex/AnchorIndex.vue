<template>
  <div class="vc-anchor-index">
    <slot :active="active"></slot>
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

  computed: {
    active() {
      return this.anchor?.index === this.index
    },
  },

  mounted() {
    this.anchor.register(this)
  },

  destroyed() {
    this.anchor.unregister(this)
  },
}
</script>

<style scoped>
.vc-anchor-index::after {
  content: '';
  position: absolute;
  display: inline-block;
  height: 10px;
  width: 10px;
  top: -10px;
  background: red;
}
</style>
