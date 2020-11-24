const inputFile = '/Users/inbound/Downloads/jsondata.txt'
const outputLocation = '/Users/inbound/Downloads/'

/* set these before running */
const readline = require('readline')
const fs = require('fs')

const currentFileName = setFilenameForOutput()
const logger = fs.createWriteStream(`${outputLocation}${currentFileName}`, {
  flags: 'a'
})

function setFilenameForOutput() {
  const now = new Date()
  const date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ]
  const time = [ now.getHours(), now.getMinutes(), now.getSeconds() ]
  return date.join('-') + '_' + time.join('-') + '_enumexport.txt'
}

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
  console: false
});

readInterface.on('line', function(line) {
  processLine(line);
});
readInterface.on('close', function() {
  logger.end()
})

function makeCONST(text) {
  return text.toUpperCase().replace(/ /g, '_').replace(/-/g, '_')
}
function makeSlug(text) {
  return text.toLowerCase()
    .replace(/ /g, '-') 
    .replace(/[^\w-]+/g, '')
}

function processLine(line) {
  const obj = JSON.parse(line.replace(/,\s*$/, ''))
  console.log(obj.name)
  const nameCapitalized = makeCONST(obj.name)
  const id = parseInt(obj.value)
  const slug = makeSlug(obj.name)
  const newLine = `public const ${nameCapitalized} = [
  'id' => ${id},
  'name' => '${obj.name}',
  'slug' => '${slug}',
];\n`
  logger.write(newLine)
}
