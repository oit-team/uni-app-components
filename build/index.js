const fs = require('fs')
const rimraf = require('rimraf')
const { kebabCase } = require('lodash')

rimraf('lib', () => {})

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

// ===============导出每个组件===============

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

// ===============导出index.js文件===============

let indexImportContent = ''
let indexExportContent = `export * from '../src/config'\n\nexport {\n$exportComponents$}`
let exportComponents = ''

dir.forEach(component => {
  indexImportContent += `import ${component} from '../src/components/${component}'\n`
  exportComponents += `  ${component},\n`
})

indexExportContent = indexExportContent.replace('$exportComponents$', exportComponents)

const indexContent = `${indexImportContent}\n${indexExportContent}`

writeFileRecursive(`./lib/index.js`, indexContent, (err) => {
  if (err) console.error(err)
})
