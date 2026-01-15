// Primeiro temos que importar o módulo
const sequelize = require('sequelize')

// Temos que fazer a conexão, adiciona o NOME do Banco de dados, USUARIO que é "root" e a senha
const connection = new sequelize('guiaperguntas', 'root', '12345678', {
    host: 'localhost', // aqui você coloca onde está rodando o servidor, nesse caso é no meu computador

    dialect: 'mysql' // dialect é qual o tipo de banco vamos nos conectar, no meu caso é MySql
})

// aqui estamos exportando nossa conexão, para utilizarmos em outros arquivos
module.exports = connection;