const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index - mostra lista, show - mostra um unico
// store, update, destroy


module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },     

    async store(request, response) {
        const { github_username, techs, latitude, longitude} = request.body;
        
        // Verifica na base de dados se o usuario ja existe na base de dados
        let dev = await Dev.findOne({ github_username });
          
        // se o dev nao existir 
        if (!dev) {
            // chama a api do github e salva a responsa no response
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            // essa pratica, se chama desestruturação
            const { name = login, avatar_url, bio} = apiResponse.data;
        
            // Transformando a string em um vetor, para realizar o cadastro no banco de dados
            // split = corta a string, sempre que encontra uma virgula
            // o map percorre o vetor, e para cada elemento aplica um trim
            const techArray = parseStringAsArray(techs); //techs.split(",").map(tech => tech.trim());
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            // Como o nome da propriedade é igual o nome dos campos, pode-se escrever uma unica vez
            dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techArray, 
            location,
            });
        }
        
    
        // retorna o dev que acabou de ser cadastrado.
        return response.json(dev);
    },

    async update() {
        // nome, avatar, bio, tecnologia e localização
    },

    async destroy(request, response){
        const { _id } = request.params;

        let dev = await Dev.findOne({ _id });

        if(dev) {
           dev = await Dev.deleteOne({ _id });    

           return response.json(dev);
        }
        else{
            return response.json({"message":"Registro não encontrado"});
        }
    }
};