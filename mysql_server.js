const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
        'host' : 'localhost',
        'user' : 'root',
        'password' : 'root@1234',
        'database' : 'sample_db',
        'port' : '3307'
    }
);
connection.connect((err) => {
    if(err){
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('DB Connected SuccessFully');
});

const createUser = (name,email,age) =>{
    const query = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
    connection.query(query,[name,email,age],(err,results) =>{
    if(err){
        console.error('ERROR WHILE UPDATE QUERY' +err);
        return;
    }
    // console.log(results);
    });
};
const updateUser = (name,email,age,id) =>{
  const query = "UPDATE users SET name=?,email= ? ,age = ? WHERE id = ?";
  connection.query(query,[name,email,age,id],(err,results) =>{
    if(err){
        console.log(err);
    }else{
        // console.log(results);
    }
  });
};
const getUser = () =>{
    const query = "SELECT * FROM users";
    connection.query(query,(err,results) =>{
      if(err){
          console.log(err);
      }else{
          console.log(results);
      }
    });
  };
  const deleteUser = (id) =>{
    const query = "DELETE FROM users WHERE id=?";
    connection.query(query,[id],(err,results) =>{
      if(err){
          console.log(err);
      }else{
          console.log(results);
      }
    });
  };
createUser('Prakash Palani1','prakashpalani1@email.com','25');
updateUser('Prakash Palani1','prakashpalani1@email.com','25','2');
getUser();
deleteUser(4);
// Close the connection
connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.message);
      return;
    }
    console.log('Database connection closed.');
  });