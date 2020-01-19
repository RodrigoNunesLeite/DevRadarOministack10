const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

// Schema é uma nova estrutura de tabela/entidade no banco de dados
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], // vetor de strings
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

// Dev é o nome de como será salvo no banco de dados
module.exports = mongoose.model('Dev', DevSchema)