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
  return text
    .replace(/1/g, 'ONE')
    .replace(/2/g, 'TWO')
    .replace(/3/g, 'THREE')
    .replace(/4/g, 'FOUR')
    .replace(/5/g, 'FIVE')
    .replace(/6/g, 'SIX')
    .replace(/7/g, 'SEVEN')
    .replace(/8/g, 'EIGHT')
    .replace(/9/g, 'NINE')
    .toUpperCase()
    .replace(/ /g, '_')
    .replace(/-/g, '_')
}
function makeSlug(text) {
  return text.toLowerCase()
    .replace(/ /g, '-') 
    .replace(/[^\w-]+/g, '')
}

function processLine(line) {
  const obj = JSON.parse(line.replace(/,\s*$/, ''))
  const nameCapitalized = makeCONST(obj.name)
  const id = parseInt(obj.value)
  
  const newLine = `public const ${nameCapitalized} = [
  'id' => ${id},
  'name' => '${obj.name}',
];\n`
  logger.write(newLine)
}
