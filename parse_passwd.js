const util = require("util");
const fs = require("fs");
const config = require('./config.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.parsePasswd = async function() {

let v;
  try {
    v = await readFile(config.passwdPath, "utf-8")
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
    uid: fields[2],
    gid: fields[3],
    comment: fields[4],
    home: fields[5],
    shell: fields[6]
  };
}
