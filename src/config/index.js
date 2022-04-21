import { isArray, isPlainObject, merge } from 'lodash'
import * as props from './props'
import options from './options'

function setPropItemContent(propItem) {
  if (isPlainObject(propItem) || isArray(propItem)) return () => propItem
  return propItem
}

function getPropItemContent(propItem) {
  if (typeof propItem === 'function') return propItem()
  return propItem
}

/**
 * 配置组件props默认值
 * @param propsConfig
 */
function setPropsConfig(propsConfig) {
  Object.entries(propsConfig).forEach(([name, propsData]) => {
    const targetProps = props[name]

    if (!targetProps) {
      console.error(`${name} 组件不存在，请检查 setConfig 中的配置`)
      return
    }

    Object.entries(propsData).forEach(([propKey, propItem]) => {
      const targetPropItem = targetProps[propKey]

      if (targetPropItem === undefined) {
        console.error(`prop "${propKey}" 不存在，请检查 setConfig 中 ${name} 组件的配置`)
        return
      }

      // targetPropItem 是普通对象时的处理
      if (isPlainObject(targetPropItem)) {
        if ('type' in targetPropItem) {
          const targetPropType = isArray(targetPropItem.type) ? targetPropItem.type : [targetPropItem.type]
          const targetPropValue = targetPropItem.default

          // 处理对象或数组
          if (typeof targetPropItem.default === 'function') {
            if (targetPropType.includes(Object)) {
              // 合并对象
              targetPropItem.default = () => merge(targetPropValue(), getPropItemContent(propItem))
            } else if (targetPropType.includes(Array)) {
              // 合并数组
              targetPropItem.default = () => targetPropValue().concat(getPropItemContent(propItem))
            }
          }
        } else {
          targetPropItem.default = setPropItemContent(propItem)
        }
      } else {
        targetProps[propKey] = {
          type: targetPropItem,
          default: setPropItemContent(propItem),
        }
      }
    })
  })
}

export function setConfig(config) {
  if (!isPlainObject(config)) throw new TypeError('config 必须是一个普通对象')
  if (isPlainObject(config.props)) setPropsConfig(config.props)
  if (isPlainObject(config.options)) merge(options, config.options)
}

export default {
  setConfig,
  props,
  options,
}
