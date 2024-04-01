const mysql = require('mysql');
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'epidemic',
//     password: 'CXENNE7SMNYfdnft',
//     database:"epidemic",
//     port:'3306'
// });
const pool = mysql.createPool({
  host: 'localhost',
  user: 'test',
  password: 'test123',
  database:"DaChuang",
  port:'3306'
});
let query = function( sql, values ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            // 结束会话
            connection.release()
          })
        }
      })
    })
  }
module.exports=query