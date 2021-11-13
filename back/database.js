var mysql = require("mysql")

var conexion = mysql.createConnection({
    host: 'bsvm7srfgdzmrt53rbai-mysql.services.clever-cloud.com',
    database: 'bsvm7srfgdzmrt53rbai',
    user: 'uqziwl7lsyewovmz',
    password:'73mZN20pzYbQ0cUIe7Ss', 
});

conexion.connect(function(error){
    if(error)
        throw error;
    else
        console.log("Se conecto correctamente a la DB");
});

module.exports = conexion;