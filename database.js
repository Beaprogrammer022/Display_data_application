const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    database : 'Airtel_sector57',
    user: 'root',
    password: "T#9758@qlph",
})

connection.connect(function(error){
    if(error)
    {
        console.log("error occured", error);
        return;
    }
    else
    {
        console.log("connection done successfully");
    }

});
module.exports = connection;