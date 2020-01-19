// importando o modulo express para uma variavel
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')

// o express nesse caso aqui é uma função
const app = express();

// week10 é o nome do banco
// Conexão com o banco de dados
mongoose.connect('mongodb+srv://rodrigonunes:omnirodrigo@oministack10-rgdqq.mongodb.net/week10?retryWrites=true&w=majority', {
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
