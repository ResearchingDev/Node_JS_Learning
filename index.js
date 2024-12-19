const {format } =  require("date-fns");
const { v4: uuidv4 } = require('uuid');
console.log(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
console.log(uuidv4())