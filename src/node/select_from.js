const mysql = require("mysql");

const alpha = mysql.createConnection({
    host:'localhost',
    user: "root",
    password:"49#alisnhoJ",
    database : 'Polygon'
    })

alpha.connect( err => {
    if (err) throw err.sqlMessage;
    const sqlQuery = "SELECT * FROM retroclassics";
    alpha.query(sqlQuery, (err, result) => {
        if( err ) throw err.sqlMessage;
        console.log(result);
    })
})