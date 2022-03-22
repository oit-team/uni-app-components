<template>
  <div class="vc-anchor">
    <slot></slot>
  </div>
</template>

<script>
export const props = {
  root: [Object, String],
}

export default {
  name: 'Anchor',

  provide() {
    return {
      anchor: this,
    }
  },

  props,

  data: () => ({
    index: undefined,
  }),

  watch: {
    index() {
      this.$emit('change', this.index)
    },
  },

  created() {
    this.observer = null
    this.observeMap = new Map()
  },

  mounted() {
    this.initObserver()
  },

  destroyed() {
    this.observeMap.clear()
    this.observer?.disconnect()
  },

  methods: {
    initObserver() {
      let root = this.root || this.$el
      root = typeof root === 'string' ? document.querySelector(root) : root

      const options = {
        root,
        rootMargin: '-1px 0px 0px 0px',
        threshold: Array.from({ length: 99 }).map((n, i) => (i + 1) / 100),
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(item => {
          if (item.isIntersecting) {
            const {
              boundingClientRect,
              rootBounds,
            } = item
            if (boundingClientRect.top < rootBounds.top + boundingClientRect.height) {
              const top = item.rootBounds.top <= item.target.getBoundingClientRect().top
              const activeComponent = item.target.__vue__
              const componentList = [...this.observeMap.values()]
              const keyIndex = componentList.indexOf(activeComponent)
              if (top) {
                const prevComponent = componentList[Math.max(keyIndex - 1, 0)]
                this.index = prevComponent.index
              } else {
                this.index = activeComponent.index
              }
            }
          }
        })
      }, options)
    },
    register(item) {
      if (this._isMounted && this.observeMap.size !== 0) console.error('检测到动态添加的 AnchorIndex，可能无法确保顺序')
      this.$nextTick(() => {
        this.observeMap.set(item.index, item)
        this.observer.observe(item.$el)
      })
    },
    unregister(item) {
      this.observeMap.delete(item.index)
      this.observer.unobserve(item.$el)
    },
    setIndex(index) {
      const component = this.observeMap.get(index)
      component?.$el.scrollIntoView()
    },
  },
}
</script>

<style scoped>

</style>
