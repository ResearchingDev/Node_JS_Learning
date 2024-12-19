console.log('Hello EveryOne');
// console.log(global)
const os = require('os')
const path = require('path');
// const math = require('./math');
const {add,sub,mul,div} = require('./math');
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

console.log(__dirname)
console.log(__filename)
console.log('=======================')
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));


console.log('=========================');
console.log(path.parse(__filename));
console.log(path.parse(__dirname));

console.log('----------------------Math Functions ------------------------------');
// console.log(math.add(4,2));
// console.log(math.sub(4,2));
// console.log(math.mul(4,2));
// console.log(math.div(4,3));

console.log(add(4,2));
console.log(sub(4,2));
console.log(mul(4,2));
console.log(div(4,3));