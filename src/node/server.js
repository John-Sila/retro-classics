const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Port = 8080;

// initiate express and enable static file display.
const beta = express();
beta.use( express.static( __dirname ) );

// access the database.
const alpha = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "49#alisnhoJ",
    database: "Polygon"
})

beta.use(cors()); // for cross origin requests__ from front-end to database through server.
beta.use(bodyParser.urlencoded( { extended : true } )); // get the data from that form.
beta.use(bodyParser.json()); // make it json() so we can do a dot-formation access.

beta.post("/signup/submission", ( req, res ) => {
    const { name, username, password, country, email, mobilenumber } = req.body;
    const BasketQuantity = 0;
    const BasketItems = "";
    const sqlQuery = "INSERT INTO retroclassics (CustomerName, UserName, Password, Country, Email, MobileNumber, BasketQuantity, BasketItems) VALUES?";
    const Values = [ [name, username, password, country, email, mobilenumber, BasketQuantity, BasketItems] ];
    alpha.query(sqlQuery, [Values], ( err, result ) => {
        if( err ) throw err.sqlMessage;
        console.log("Data has been successfully saved to database 'Polygon' into table 'retroclassics'.");
        res.redirect("http://localhost:3000/");
    })
})

let email, password;
let loggedIn = false;
beta.post("/login/submission", ( req, res ) => {
    // Let's know if this person has an account
    email = req.body.email;
    password = req.body.password;
    const sqlQuery = `SELECT * FROM retroclassics WHERE Email = '${email}' AND Password = '${password}'`;
    alpha.query( sqlQuery, ( err, result ) => {
        if( err ) {
            console.log( err );
            return res.end();
        } else {
            // we have a result
            if( result.length > 0 ) {
                // we are good so let's get a username
                const sqlQuery2 = `SELECT CustomerName FROM retroclassics WHERE Email = '${email}' AND Password = '${password}'`;
                alpha.query( sqlQuery2, ( err, result ) => {
                    if( err ) throw err.sqlMessage;
                    const Username = result.map(User => User.CustomerName);
                    console.log(Username, " has been logged in.");
                    loggedIn = !loggedIn;
                    return res.redirect("http://localhost:3000/mypage")
                })

            } else {
                // no error occured but result is null
                console.log("This account does not exist.");
                res.redirect("http://localhost:3000/login");
            }
        }
    })
})

// log out
beta.post("/user/logout", ( req, res ) => {
    console.log("User logged out.")
})

// THIS FUNCTION IS PURE CHAOS
beta.post("/email/availability", ( req, res ) => {
    const input = req.body.email;
    const sqlQuery = `SELECT * FROM retroclassics WHERE Email='${input}'`;
    if (sqlQuery.length < 1) {
        res.json("absent");
        return;
    }
    res.json("present");
})




beta.listen(Port, () => {
    console.log("AgentBeta is listening at Port ", Port);
})