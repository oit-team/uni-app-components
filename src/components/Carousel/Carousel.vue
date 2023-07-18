<template>
  <swiper @transition="transition">
    <swiper-item>
      <div class="w-full h-full">
        <!--        <cover-view :style="{ transform: 'translate3d(' + moveX + 'px, 0, 0)'}">-->
        <!--        </cover-view>-->
<!--          class="w-[200px] h-[200px]"-->
        <video
          style="pointer-events: none;"
          class="w-full h-full"
          src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4"
          :enable-progress-gesture="false"
          controls
          objectFit="contain"
          x5-video-player-type="h5"
          x-webkit-airplay="allow"
          webkit-playsinline="true"
        >
        </video>
      </div>
    </swiper-item>
    <swiper-item>
      {{ moveX }}
      <!--      <image-->
      <!--        class="w-full h-full"-->
      <!--        src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"-->
      <!--      ></image>-->
    </swiper-item>
  </swiper>
</template>

<script>
import { createNamespace } from '../../utils'

const [name] = createNamespace('Carousel')

export const props = {}

export default {
  name,

  props,

  data: () => ({
    moveX: 0,
  }),

  methods: {
    transition(e) {
      this.moveX = e.detail.dx
    },
  },
}
</script>

<style scoped>
.video {
  position: absolute;
  width: 50%;
  height: 100%;
}
</style>
