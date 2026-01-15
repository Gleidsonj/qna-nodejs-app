let express = require("express");
let app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // só local
}

const connection = require("./database/database"); // aqui importamos a nossa conexão, o sequelize
const Pergunta = require("./database/Perguntas"); // exportando model de perguntas
const Resposta = require("./database/Resposta");

//Database - testando nosso banco de dados
connection //vamos tentar nos autenticar com meu banco
    .authenticate()
    .then(() => { // se a conexão der CERTO, esse código será executado
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => { // se der ERRO esse código será executado
        console.log(msgErro)
    })



//Primeiro instalamos o "Bory-parser" e importamos, é atráves que conseguimos pegar os dados do Formulário
const bodyParser = require("body-parser");


app.set('view engine', 'ejs') // estou dizendo para o Express usar o EJS como view engine


app.use(express.static("public")) //Para usar arquivos estatícos tem que colocar esse código abaixo / css, imagens e etc ...


// -----------  BORY PARSER -------------
//bodyParser.urlencoded(...) - Serve para ler dados enviados por forms HTML
//extended: false - Diz que você quer trabalhar com dados simples, como strings e números.
app.use(bodyParser.urlencoded({ extended: false }))

// ---------  ROTAS -----------
app.get("/index", function (req, res) {

    //retornando os dados enviado pelo formulario para mostrar no front
    //usando a sintaxe abaixo podemos retornar esses dados
    //raw: true - serve para filtrar e retornar apenas os dados que foram enviados
    //findAll() faz a busca dos dados no BD, é como se fosse o " SELECT * FROM perguntas " pegando todas as perguntas
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] // order:[[...]] ondem de como sera exibido   DESC = descrecente || ASC = crescente
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        })
    })


})

app.get("/perguntar", function (req, res) {
    res.render("perguntar")
})

// precisamos de uma rota para salvar as perguntas / a rota vai ser POST pois no formulário vamos enviar no tipo POST
app.post("/salvarpergunta", (req, res) => {

    //pegando as perguntas que será enviada no FORM, é atráves do bodyParser que conseguimos pegar o dados
    //sempre coloque os "nome" nos inputs para podemos identificarmos na hora de pegar os dados
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/index")
    })
})

app.get("/pergunta/:id", (req, res) => {

    var id = req.params.id

    Pergunta.findOne({
        where: { id: id },
        
    }).then(Pergunta => {

        if (Pergunta != undefined) {  //pergunta encontrada

            Resposta.findAll({
            where: {perguntaId: Pergunta.id},
             order: [
            ['id', 'DESC'] // order:[[...]] ondem de como sera exibido   DESC = descrecente || ASC = crescente
        ]
        }).then(respostas => {

            res.render("pergunta", {
                pergunta: Pergunta,
                respostas: respostas
            })
        })
        } else { // pergunta não encontrada
            res.redirect("/perguntar")
        }
    })
})

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    })
})

// ----------- INICIANDO SERVIDOR -----------

const PORT = process.env.PORT || 3080

app.listen(PORT,() => {
    console.log("Servidor rodando!")
})