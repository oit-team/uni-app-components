const fs = require('fs')
const { kebabCase } = require('lodash')

const writeFileRecursive = function(path, buffer, callback) {
  let lastPath = path.substring(0, path.lastIndexOf('/'))
  fs.mkdir(lastPath, { recursive: true }, (err) => {
    if (err) return callback(err)
    fs.writeFile(path, buffer, function(err) {
      if (err) return callback(err)
      return callback(null)
    })
  })
}

const dir = fs.readdirSync('src/components')
dir.forEach(component => {
  const content =
    `import ${component}, { props } from '../src/components/${component}'\n` +
    `export { props }\n` +
    `export default ${component}`
  const fileName = kebabCase(`Vc${component}`)
  writeFileRecursive(`./lib/${fileName}.js`, content, (err) => {
    if (err) console.error(err)
  })
})
