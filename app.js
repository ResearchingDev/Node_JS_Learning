require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const db = require('./db'); // Import the db connection

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.use('/',(req,res) => {
//    res.send('Welcome TO OUR REST API PORTAL');
// //    res.end();
// });
app.use('/auth',authRoutes);
app.use('/user', userRoutes(db));  // User routes
app.listen(PORT,() => console.log('Runnning Port No '+PORT));

// db.end((err) =>{
//     if(err)
//        throw err;
//      else 
//        console.log('DB CLOSED');
//  });
 process.on('uncaughtException',err => {
    console.error(`There are uncaught error : ${err}`);
    process.exit(1)
});