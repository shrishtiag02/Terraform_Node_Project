console.log("Hi")

var express = require("express");
const cors = require('cors');
var app = express();
app.use(cors());

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "mydb.cpgctjrjwvda.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "password123",
  port     : 3306
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

app.get('/', function(req, res){
    fetchdata(res);
    console.log("fetchdata done");
})

function executequery(sql,cb){
    connection.query(sql, function(error, result, fields){
        if(error) {throw error;}
        cb(result);
    })
}

function fetchdata(res) {
    executequery("SELECT * FROM mydb.NAMES", function(result){
        let i = 0;
        const names = [];
        while (i < result.length) {
            console.log(result[i]["first_name"]);
            names.push(result[i]["first_name"]);
            i++;
        }
        let randomValue = names[Math.floor(Math.random() * names.length)];
        res.send(randomValue)
    })
}

app.listen(8080, function(){
    console.log("Backend");
})