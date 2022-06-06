<template>
  <div class="vc-load-more">
    <slot v-bind="{ status, retry: load }">
      <div class="vc-load-more__tips" @click="load">{{ STATUS_TIPS[status] }}</div>
    </slot>
  </div>
</template>

<script>
import { createNamespace } from '../../utils'

const [name] = createNamespace('LoadMore')

const STATUS = {
  NEXT: 0,
  LOADING: 1,
  DONE: 2,
  FAIL: 3,
}

const STATUS_TIPS = {
  [STATUS.NEXT]: '点击加载',
  [STATUS.LOADING]: '正在加载...',
  [STATUS.DONE]: '没有更多了',
  [STATUS.FAIL]: '加载失败，点击重试',
}

export const props = {
  promise: Function,
  // 是否开启分页模式
  pager: Boolean,
  // 分页索引初始值
  pageIndex: {
    type: [Number, String],
    default: 1,
  },
  pageSize: [Number, String],
  total: [Number, String],
  paramKey: {
    type: Object,
    default: () => ({
      index: 'pageNum',
      pageSize: 'pageSize',
    }),
  },
  // 首次创建时自动请求
  firstLoad: Boolean,
}

export default {
  name,

  inject: {
    pageView: {
      default: undefined,
    },
    scrollView: {
      default: undefined,
    },
  },

  props,

  data() {
    this.STATUS = STATUS
    this.STATUS_TIPS = STATUS_TIPS
    return {
      status: STATUS.NEXT,
      index: +this.pageIndex,
    }
  },

  created() {
    this.firstLoad && this.load()
    this.initListener()
  },

  methods: {
    initListener() {
      if (this.scrollView) {
        this.scrollView.onScrollBottom = this.load
      } else if (this.pageView) {
        this.pageView.$options.onReachBottom.push(this.load)
      }
    },
    load() {
      if ([STATUS.LOADING, STATUS.DONE].includes(this.status)) return

      this.setStatus(STATUS.LOADING)

      const options = {
        next: () => {
          if (this.pager) {
            this.index++
            this.$emit('update:pageIndex', this.index)
          }
          this.setStatus(STATUS.NEXT)
        },
        loading: () => this.setStatus(STATUS.LOADING),
        done: () => this.setStatus(STATUS.DONE),
        fail: () => this.setStatus(STATUS.FAIL),
      }

      if (this.pager) {
        options.params = {
          [this.paramKey.index]: this.index,
          [this.paramKey.pageSize]: +this.pageSize,
        }
      }

      if (typeof this.promise === 'function') {
        const promise = this.promise(options.params)
        if (promise instanceof Promise) {
          promise
            .then((total) => {
              total = typeof total === 'number' ? total : +this.total
              this.index * this.pageSize >= total ? options.done() : options.next()
            })
            .catch(options.fail)
          return promise
        }
      } else {
        this.$emit('load', options)
      }
    },
    setStatus(status) {
      this.status = status
    },
    reset() {
      this.setStatus(STATUS.NEXT)
      if (this.pager) this.index = this.pageIndex ?? 1
      return this
    },
  },
}
</script>

<style scoped>
.vc-load-more__tips {
  font-size: 14px;
  padding: 8px 0;
  text-align: center;
  color: #666666;
}
</style>
