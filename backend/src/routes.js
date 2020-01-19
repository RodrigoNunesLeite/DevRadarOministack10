// Importando apenas o modulo de roteamento do node express
const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

// dentro de routes tem agora todos os metodos http
const routes = Router();


// recebe um caminho
// o segundo parametro dessa função get é outra função, que podemos usar arrowfunction
// arrow function, basta tirar a palavra function e o {} se tornam o corpo da função
/*
 no primeiro parametro da funcão
  a arrow function recebe dois parametros
  sempre fixos, imbutidos automatica pelo express
  são o req(request) e response
  Quando acesso alguma rota estou fazendo uma requisão e ela pode ter alguma informação,
  essas informações são o response

  Request é o que vem do frontend, response é como devolvemos uma resposta para nosso frontend
*/

/* 
    Response.send pode enviar um texto
*/

// get, post, put, delete
// get buscar informação
  // quando chamamos na url do navegador, automaticamente é chamado o metodo get
// post cadastrar
// put atualizar
// delete excluir

// Na aplicação vamos retornar um json
routes.post('/devs', DevController.store);

// lista os devs
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

routes.delete('/del/:_id', DevController.destroy);

// exportando as rotas
module.exports = routes;
