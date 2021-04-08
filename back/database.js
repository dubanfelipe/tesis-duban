var ibmdb = require("ibm_db")
connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-11.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=kqm49262;PWD=hbj^5k46gxdlbsvf;";

try {
    var option = { connectTimeout: 60, systemNaming: true};
    var conn = ibmdb.openSync(connStr, option);
    console.log("Se conecto correctamente a la DB");

} catch (e) {
    console.log(e.message);
}

module.exports = conn;