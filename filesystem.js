// const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const fileOps =  async ()=> {
   try {
        const data = await fsPromises.readFile(path.join(__dirname,'Files','new_file.txt'),'utf8');
        console.log(data);
        fsPromises.writeFile(path.join(__dirname,'Files','new_node.txt'),'Hi We are Create New File Using NodeJs');
        console.log('SuccessFully Write');
        fsPromises.appendFile(path.join(__dirname,'Files','new_node.txt'),'\n\n SuccessFUlly Append... NEW DATA');
        console.log('SuccessFully Appended....');
        fsPromises.rename(path.join(__dirname,'Files','new_node.txt'),path.join(__dirname,'Files','re_node.txt'));
        console.log('Renamed....');
        await fsPromises.unlink(path.join(__dirname,'Files','sample.txt'));
        console.log('File Removed....');
   }catch(err) {
     console.error(`There are uncaught error : ${err}`);
   }
};
fileOps();
process.on('uncaughtException',err => {
    console.error(`There are uncaught error : ${err}`);
    process.exit(1)
});