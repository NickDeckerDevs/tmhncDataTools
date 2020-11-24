const inputFile = '/Users/inbound/Downloads/enumdata.txt'
const outputLocation = '/Users/inbound/Downloads/'

/* set these before running */
const readline = require('readline')
const fs = require('fs')
const outputData = []
let currentObject = {}
const currentFileName = setFilenameForOutput()
const logger = fs.createWriteStream(`${outputLocation}${currentFileName}`, {
  flags: 'a'
})

function setFilenameForOutput() {
  const now = new Date()
  const date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ]
  const time = [ now.getHours(), now.getMinutes(), now.getSeconds() ]
  return date.join('-') + '_' + time.join('-') + '_jsonexport.txt'
}

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
  console: false
});

function getValueFromLine(line) {
  return line.split('=> ')[1].replace(',', '').trim()
  // let match = line.match(matchCase)
  // console.log('match:', match)

  // return line.replace("'id' => '", '').replace(/ ).trim(' ')
}
function getNameFromLine(line) {
  return line.split("=> '")[1].replace("',", '').trim()
  // let matchCase = /.*?'name' => '(.*?)'/
  // let match = line.match(matchCase)
  // console.log('match:', match)
}

readInterface.on('line', function(line) {
  
  if(line.indexOf('public') > -1) {
    processObject(currentObject)
    currentObject = {}
  }
  if(line.indexOf('id') > -1) {
    currentObject.value = getValueFromLine(line)
  }
  if(line.indexOf('name') > -1) {
    currentObject.name = getNameFromLine(line)
  }
});
readInterface.on('close', function() {
  logger.end()
})



function processObject(item) {
  if(item.hasOwnProperty('name')) {
    logger.write(`{ "name": "${item.name}", "value": "${item.value}" },\n`)
  }
  


//   const obj = JSON.parse(line.replace(/,\s*$/, ''))
//   console.log(obj.name)
//   const nameCapitalized = makeCONST(obj.name)
//   const id = parseInt(obj.value)
//   const slug = makeSlug(obj.name)
//   const newLine = `public const ${nameCapitalized} = [
//   'id' => ${id},
//   'name' => '${obj.name}',
//   'slug' => '${slug}',
// ];\n`
}
