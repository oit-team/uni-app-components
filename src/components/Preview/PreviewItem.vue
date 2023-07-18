<template>
  <div class="vc-preview-item">
    <template v-if="checkType(item, 'image')">
      <vc-img
        class="vc-preview-item__image"
        :src="getItemValue(item, 'src') || item"
        size="100%"
        mode="aspectFit"
        @click="$emit('click', $event)"
      />
    </template>
    <template v-else-if="checkType(item, 'video')">
      <video
        ref="video"
        class="vc-preview-item__video"
        :src="getItemValue(item, 'src') || item"
        :enable-progress-gesture="false"
      ></video>
    </template>
  </div>
</template>

<script>
import { createNamespace } from '../../utils'

const IMAGE_TYPES = ['png', 'jpg', 'jpeg']
const VIDEO_TYPES = ['mp4']

const [name] = createNamespace('PreviewItem')

export default {
  name,

  props: {
    item: [Object, String],
    active: Boolean,
  },

  watch: {
    active() {
      this.togglePlay()
    },
    item() {
      this.active && this.togglePlay()
    },
  },

  mounted() {
    this.active && this.togglePlay()
  },

  methods: {
    checkType(item, target) {
      if (typeof item === 'string') {
        let reg
        if (target === 'image') {
          reg = new RegExp(`(${IMAGE_TYPES.join('|')})$`)
        } else if (target === 'video') {
          reg = new RegExp(`(${VIDEO_TYPES.join('|')})$`)
        }
        return reg.test(item.toLowerCase())
      }

      return this.getItemValue(item, 'type') === target
    },
    getItemValue(item, key) {
      if (typeof item === 'object') return item[key]
    },
    togglePlay() {
      this.$nextTick(() => {
        const { video } = this.$refs
        console.log(video)
        // if (video) {
        //   this.active ? video.play() : video.pause()
        // }
      })
    },
  },
}
</script>

<style>
.vc-preview-item,
.vc-preview-item__image {
  width: 100%;
  height: 100%;
}

.vc-preview-item__video {
  background-color: red;
}
</style>
