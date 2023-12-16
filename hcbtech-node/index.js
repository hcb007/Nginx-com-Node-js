const express = require('express')
const mysql = require('mysql')
const random_name = require('node-random-name');

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const connection = mysql.createConnection(config)
const createTablePeople = 'CREATE TABLE IF NOT EXISTS people (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL);';

// Criação da tabela people se não existe
connection.query(createTablePeople);
connection.end()

app.get('/', (req, res) => {
    var con = mysql.createConnection(config)

    var sqlInsert = 'INSERT INTO people(name) values ("' + random_name() + '");';

    con.query(sqlInsert)

    var sqlSelect = 'SELECT name FROM people;'

    con.query(sqlSelect, function (err, result) {
        var list = " "

        for (const chave in result) {
            list = list + result[chave].name + '<br>';
        }

        res.send('<h1>Full Cycle Rocks!</h1><br><hr>' + list);
    });

    con.end()
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})