const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 1000;

const server = http.createServer((req,res) =>{
  res.writeHead(200, { 'Content-Type': 'text/html' });
   fs.readFile('./index.html','utf8',(err,data)=>{
      if(err){
        res.writeHead(404);
        res.write('No data Found');
      }else{
        res.write(data);
      }
      res.end();
   });

});

server.listen(PORT,(error) => {
   if(error){
    console.log(error)
   }else{
        console.log('Server Listening Spefic PORT  '+PORT);
    }
});
