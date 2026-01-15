// ------------- MODEL ----------------- CRIAR TABELA PARA O BANCO DE DADOS COM MODEL

//para utilizar o model primeiros temos que importar o 'Sequelize' e o connection
const sequelize = require('sequelize')
const connection = require('./database')


// definindo o nosso MODEL para criar o banco de dados
// o connection.define() - é onde você coloca o nome da tabela 
const Perguntas = connection.define('perguntas', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false // isso faz com que esse campo nunca esteja vazio no seu banco de dados
    },

    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
});


// Isso vai sincronizar o que está aqui com o banco de dados, dai de fato irá criar a tabela
// e o force: false - significa que ele não irá forçar a criação caso a tebale já exista
// e o Then() é executado quando a tabela é criada  
Perguntas.sync({force: false}).then(() => {
    console.log("Tabela criada!")
})

//Exportando model
module.exports =  Perguntas;