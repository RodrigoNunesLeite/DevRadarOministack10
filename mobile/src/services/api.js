import axios from 'axios';

const api = axios.create({
    // aqui deve ser definido com o IP apresentado no context, no momento de rodar o projeto
    baseURL: 'http://192.168.1.34:3333',
});

export default api;
