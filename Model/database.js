const Senha = require("./usuarioModel")
async function connect(){
	if(global.connection && global.connection.state !== 'disconnected')
		return global.connection;
  
  
	const mysql = require("mysql2/promise");
   require('dotenv').config();
  
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
  		user: process.env.DB_USER,
  		database:  process.env.DB_DATABASE,   
		password:  process.env.DB_PASS
	});
  
	console.log("Conectou no MySQL!");
	global.connection = connection;
	 return connection;
  }
  
  
  async function query(sql){
	const conn = await connect();
	const [rows] = await conn.query(sql);
	return rows;
  }
  
  
  module.exports ={ query};
  
