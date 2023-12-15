const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const random_name = require('node-random-name');

app.get('/', (req,res) => {
    var connection = mysql.createConnection(config)
    var sql = 'INSERT INTO people(name) values ("' + random_name() + '")';
    
    connection.query(sql)

    var sqlQuery = 'SELECT name FROM people'
    
    connection.query(sqlQuery, function (err, result) { 
        var list = " "
        
        for( const chave in result) {
            list = list + result[chave].name + '<br>';
        } 
        
        res.send('<h1>Full Cycle Rocks!</h1>' + list);
    });
    
    connection.end()
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})