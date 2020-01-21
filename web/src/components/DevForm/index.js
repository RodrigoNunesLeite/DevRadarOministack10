import React, { useState, useEffect } from 'react';

import './styles.css';

function DevForm({ onSubmit }){

    const [github_username, setGithubusername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // 1 - qual funcao precisa executar, 
    // 2 - quando a funcao precisa executar
    // 3 param = sempre q o valor for alterado, executa de novo
    useEffect(() => {
        // capturando a localização do navegador
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const { latitude, longitude } = position.coords;

            setLatitude(latitude);
            setLongitude(longitude);

            },
            (err) => {
            console.log(err);
            },
            {
            timeout: 30000,
            }
        )
    }, []);

    async function handleSubmit(e){
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
            
        });

        // limpando os campos  
        setGithubusername('');
        setTechs('');
    }
    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="username_github" 
              required
              value={github_username}
              onChange={e => setGithubusername(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required 
              value={techs}
              onChange={e => setTechs(e.target.value)} />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}/>
            </div>

          </div>

          <button type="submit">Salvar</button>

        </form>
    );
}

export default DevForm;