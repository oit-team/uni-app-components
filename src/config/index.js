import { isArray, isPlainObject, merge } from 'lodash'
import * as props from './props'

function setPropItemContent(propItem) {
  if (isPlainObject(propItem) || isArray(propItem)) return () => propItem
  return propItem
}

function getPropItemContent(propItem) {
  if (typeof propItem === 'function') return propItem()
  return propItem
}

export function setConfig(config) {
  if (!isPlainObject(config)) throw new TypeError('config 必须是一个普通对象')

  Object.entries(config).forEach(([name, propsData]) => {
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

      // prop默认值是否已定义
      if (
        isPlainObject(targetPropItem)
        && targetPropItem.type
        && 'default' in targetPropItem
        && typeof targetPropItem.default === 'function'
      ) {
        const targetPropItemValue = targetPropItem.default
        const propType = isArray(targetPropItem.type) ? targetPropItem.type : [targetPropItem.type]

        // 处理对象或数组
        if (propType.includes(Object)) {
          // 合并对象
          targetPropItem.default = () => merge(targetPropItemValue(), getPropItemContent(propItem))
        } else if (propType.includes(Array)) {
          // 合并数组
          targetPropItem.default = () => targetPropItemValue().concat(getPropItemContent(propItem))
        }
      } else {
        targetProps[propKey] = {
          type: targetProps[propKey],
          default: setPropItemContent(propItem),
        }
      }
    })
  })
}

export default {
  setConfig,
}
