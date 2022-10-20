var mysql = require("mysql")

var conexion = mysql.createPool({
    host: 'bsvm7srfgdzmrt53rbai-mysql.services.clever-cloud.com',
    database: 'bsvm7srfgdzmrt53rbai',
    user: 'uqziwl7lsyewovmz',
    password:'73mZN20pzYbQ0cUIe7Ss', 
});

conexion.query('select 1 + 1', (err, rows) => { 
    if(err)
        throw err;
    else
    console.log("Se conecto correctamente a la DB"); 
});

module.exports = conexion;