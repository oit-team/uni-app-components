const fs = require('fs')

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
    `/* eslint-disable */\n` +
    `import ${component} from '../src/components/${component}/${component}.vue'\n` +
    `export default ${component}`
  writeFileRecursive(`./lib/Vc${component}.js`, content, (err) => {
    if (err) console.error(err)
  })
})
