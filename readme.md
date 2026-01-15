Para conectar o banco de dados, precisamos instalar duas bibliotecas

1. Sequelize - ele faz a comunicação do Banco de dados ao servidor.

* *npm install --save sequelize*

2. MySQL2 - precisamos dessa biblioteca para trabalhar com Sequelize junto com o MySQL.

* *npm install --save mysql2*


Para ler os dados enviados pelo formulário precisamos de uma biblioteca - BORY PARSER

* *app.use(bodyParser.urlencoded({extended: false}))*

bodyParser.urlencoded(...) - Serve para ler dados enviados por forms HTML
extended: false - Diz que você quer trabalhar com dados simples, como strings e números.


------------- MODEL -----------------

Definindo MODEL para criar uma tabela no Banco de Dados conectado.
O connection.define() - é onde você coloca o nome da tabela

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


Isso vai sincronizar o que está aqui com o banco de dados, dai de fato irá criar a tabela
e o force: false - significa que ele não irá forçar a criação caso a tebale já exista
e o Then() é executado quando a tabela é criada  
Perguntas.sync({force: false}).then(() => {
    console.log("Tabela criada!")
})



----------- Adicionando dados na nossa tabela -----------------
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/index")
    })

Aqui é como se você tivesse escrevendo um INSERT INTO tabela VALUES (valores), só que de maneira bem simplificada.


