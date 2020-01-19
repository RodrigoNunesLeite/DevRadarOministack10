const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                //in = dentro de
                $in: techsArray,
            },
            location: {
              // o near permite localizar um objetivo perto de uma localização
              $near: {
                $geometry:{
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: 10000, //10 km 
              }  
            },
        });
        // Buscar todos os devs num raio 10 km
        // Filtrar por tecnologias
        return response.json({devs});

    }
}