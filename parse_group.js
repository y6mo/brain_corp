const util = require("util");
const fs = require("fs");
const config = require('./config.js');

console.log("config :" + config.groupPath);
console.log("config :" + '/etc/group');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.parseGroup = async function() {

let v;
  try {
    v = await readFile(config.groupPath, "utf-8")
  } catch(e) {
  }
  return processData(v)
  /*
  console.log("printing");
  const fileContent = await readFile('/etc/passwd', "utf-8")
  .then(response => processData(response))
  .catch(err =>
    console.log("error")
  );
  return fileContent
  */
}

//parsePasswd()
//.then(response => console.log(processData(response)))
//.catch(err => console.log("An error occurred", err));

//parsePasswd();
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
