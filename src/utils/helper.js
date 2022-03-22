import options from '../config/options'

export function convertToUnit(str) {
  if (str === null || str === undefined || str === '') return ''

  const {
    unit,
    viewportWidth = 375,
  } = options

  let size

  if (typeof unit === 'function') return unit(str)

  if (isNaN(+str)) {
    size = String(str)
  } else {
    size = `${Number(str)}${unit}`
  }

  if (/([0-9]+(\.?[0-9]+)?)px$/.test(size)) {
    const num = parseFloat(size)
    return `${num / viewportWidth * 100}vw`
  }

  return size
}
