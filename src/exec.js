const R = require('ramda');
/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
 const exec = require('child_process').exec;
 return new Promise((resolve, reject) => {
  exec(cmd, (error, stdout, stderr) => {
   if (error) {
    console.warn(error);
   }
   resolve(stdout? stdout : stderr);
  });
 });
}

const indexer = (item, index) => (item[Object.keys(item)].id = (''+(101+index)).substring(1), item);

const byType = R.groupBy(function(obj) {
  return Object.keys(obj)[0].includes('house')?"houses":obj[Object.keys(obj)].type == "planet"?'planets':"other"
});

async function main(command = `swetest.exe -b05.08.1986  -fPljS -head -g; -house41.18,56.22,P -utc19.30:00`) {

  let stdout = await execShellCommand(command);



    let res = `${stdout}`.replace(/ /g,'').split("\n").map(item => item.split(';')).map(item => Object.defineProperty({},item.shift(),
  {  value:
    item.length==3?
    {
      'longitude': parseFloat(item[0]),
      "house": 'house'+(13-parseInt(item[1])),
      "type": "planet",
      "sign":  (''+(101+Math.floor(parseFloat(item[0])/30))).substring(1),
      "retrograde": item[2][0]=='-'?true:false
    }
    :
    {
      'longitude': parseFloat(item[0]),
      "type": "point"

    }
  ,
  writable: false,
  enumerable: true,
  configurable: true
}));

    res.pop();

    let obj = byType(res);
    //indexing
    Object.entries(obj).forEach( item =>  item[1] = item[1].map(indexer));




    return obj
}

module.exports = main;
