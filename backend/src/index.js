// importando o modulo express para uma variavel
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')

// o express nesse caso aqui é uma função
const app = express();

// Conexão com o banco de dados
// informar string de conexao do atlas.
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// libera o acesso externo para a api
app.use(cors());

// Fazendo o express entender o json
app.use(express.json());
app.use(routes);

// defini a porta do servidor
app.listen(3333);
