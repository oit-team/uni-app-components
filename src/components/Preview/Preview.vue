<template>
  <vc-transition class="vc-preview-wrap" :show="show" mode="zoom-in">
    <div class="vc-preview">
      <vc-img
        class="vc-preview__close"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNTIgNTEyIj4gPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTI0Mi43MiAyNTZsMTAwLjA3LTEwMC4wN2MxMi4yOC0xMi4yOCAxMi4yOC0zMi4xOSAwLTQ0LjQ4bC0yMi4yNC0yMi4yNGMtMTIuMjgtMTIuMjgtMzIuMTktMTIuMjgtNDQuNDggMEwxNzYgMTg5LjI4IDc1LjkzIDg5LjIxYy0xMi4yOC0xMi4yOC0zMi4xOS0xMi4yOC00NC40OCAwTDkuMjEgMTExLjQ1Yy0xMi4yOCAxMi4yOC0xMi4yOCAzMi4xOSAwIDQ0LjQ4TDEwOS4yOCAyNTYgOS4yMSAzNTYuMDdjLTEyLjI4IDEyLjI4LTEyLjI4IDMyLjE5IDAgNDQuNDhsMjIuMjQgMjIuMjRjMTIuMjggMTIuMjggMzIuMiAxMi4yOCA0NC40OCAwTDE3NiAzMjIuNzJsMTAwLjA3IDEwMC4wN2MxMi4yOCAxMi4yOCAzMi4yIDEyLjI4IDQ0LjQ4IDBsMjIuMjQtMjIuMjRjMTIuMjgtMTIuMjggMTIuMjgtMzIuMTkgMC00NC40OEwyNDIuNzIgMjU2eiI+PC9wYXRoPiA8L3N2Zz4="
        size="28"
        @click="close()"
      />
      <swiper class="vc-preview-swiper" @change="innerIndex = $event.detail.current" :current="swiperCurrent">
        <swiper-item
          v-for="(item, itemIndex) of config.list"
          :key="(typeof item === 'object' && keyValue in item) ? item[keyValue] : itemIndex"
          class="vc-preview-swiper-item"
        >
          <preview-item :item="item" :active="innerIndex === itemIndex" @click="close()" />
        </swiper-item>
      </swiper>
      <slot name="overlay"></slot>
    </div>
  </vc-transition>
</template>

<script>
import Transition from '../Transition'
import Icon from '../Icon'
import Img from '../Img'
import PreviewItem from './PreviewItem'
import { createNamespace } from '../../utils'

const [name] = createNamespace('Preview')

export const props = {
  index: Number,
  list: Array,
  keyValue: [String, Number],
}

export default {
  name,

  components: {
    [Transition.name]: Transition,
    [Icon.name]: Icon,
    [Img.name]: Img,
    PreviewItem,
  },

  model: {
    prop: 'index',
  },

  props,

  data: () => ({
    show: false,
    params: {},
    innerIndex: 0,
    swiperCurrent: 0,
  }),

  computed: {
    config() {
      return {
        list: this.list ?? this.params.list,
        index: this.index ?? this.params.index,
      }
    },
  },

  methods: {
    open(params) {
      this.params = params
      this.show = true
      this.swiperCurrent = this.config.index
      this.innerIndex = this.config.index
    },
    close() {
      this.show = false
    },
  },
}
</script>

<style lang="scss">
.vc-preview-wrap {
  position: fixed;
  z-index: 90;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.vc-preview {
  position: absolute;
  z-index: 80;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
}

.vc-preview-swiper {
  width: inherit;
  height: inherit;
}

.vc-preview-swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vc-preview__close {
  position: absolute;
  top: 25px;
  right: 25px;
  padding: 5px;
  border-radius: 50%;
  background-color: rgba(150, 150, 150, 0.5);
  z-index: 50;
}
</style>
