import { readFile } from 'node:fs';

readFile('./Files/sample.txt','utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
process.on('uncaughtException',err => {
    console.error(`There are uncaught error : ${err}`);
    process.exit(1)
});