import express from 'express';
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
import { createConnection } from 'mysql';
import random_name from 'node-random-name';

app.get('/', (req,res) => {
    var connection = createConnection(config)
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