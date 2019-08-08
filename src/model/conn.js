const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config.json')));

let con = mysql.createConnection({
  host:     config.database.host,
  user:     config.database.user,
  password: config.database.password,
  database: config.database.name
})

con.ping({}, (err) => {
  if(err){
    console.log("No se pudo conectar a la base de datos. ",err);
    process.exit();
  }
  else console.log("Base de datos conectada con exito");  
})
module.exports = con;
