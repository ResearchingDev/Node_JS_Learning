const fs = require('fs');
const path = require('path');
const rs = fs.createReadStream(path.join(__dirname,'Files','large_file.txt'),{encoding: "utf8"});
const ws = fs.createWriteStream(path.join(__dirname,'Files','new_file.txt'));
// rs.on('data',(dataChunk) => {
//    console.log(dataChunk.length);
//   ws.write(dataChunk);
// });
rs.pipe(ws);
process.on('uncaughtException',err => {
    console.error(`There are uncaught error : ${err}`);
    process.exit(1)
});