const mysql = require("mysql");

const alpha = mysql.createConnection({
    host:'localhost',
    user: "root",
    password:"49#alisnhoJ",
    database : 'Polygon'
    })

alpha.connect( err => {
    if (err) throw err.sqlMessage;
    const sqlQuery = "CREATE TABLE retroclassics (id INT AUTO_INCREMENT PRIMARY KEY, Email VARCHAR(255), FullName VARCHAR(255), Password VARCHAR(255), Country VARCHAR(255), MobileNumber VARCHAR(255), BasketQuantity VARCHAR(255), BasketItems VARCHAR(255))";
    alpha.query(sqlQuery, (err, result) => {
        if( err ) throw err.sqlMessage;
        console.log("Table created.");
    })
})