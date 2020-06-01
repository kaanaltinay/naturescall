var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'NaturesCall'
});

var server = app.listen(4545, function(){
    var host = server.address().host;
    var port = server.address().port;
    console.log("start");
});

con.connect(function(error){
    if(error) console.log(error);
    else console.log("connected");
});

app.get('/Animals', function(req, res){
    con.query('select * from Animals', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    });
});