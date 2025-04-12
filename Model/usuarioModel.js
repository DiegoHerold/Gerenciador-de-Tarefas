class Usuario{
    static async autenticar (email, senha){
        const db = require('./database');
        const md5 = require('md5');
        const sql =`SELECT * FROM usuario WHERE email = '${email}' AND senha= '${md5(senha)}'`;
        console.log(sql);
        return await db.query(sql);
      }
    
}
module.exports={Usuario};