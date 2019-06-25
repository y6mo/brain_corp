const util = require("util");
const fs = require("fs");
const config = require('./config.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.parseGroup = async function() {
let fileContents;
  try {
    fileContents = await readFile(config.groupPath, 'utf-8')
  } catch(err) {
    if (err.code === 'ENOENT'){
      console.log('File not found. Check path of group file.');
    } else {
      console.log('Error message: ' + err.message);
    }
    throw err;
  }
  return processData(fileContents)
}

function processData(data){
  if (typeof data !== 'string') {
    throw new Error('Data not string error');
  }
  return data
  .split('\n')
  .map(parseUser)
  .filter(Boolean);
}

function parseUser(line) {
  if (!line || !line.length || line.charAt(0) === '#') {
    return null;
  }
  var fields = line.split(':');
  return {
    name: fields[0],
    gid: fields[2],
    members: fields[3],
  };
}
