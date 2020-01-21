import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/Devitem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    
    const response = await api.post('/devs', data);

    // adiciona todos os devs que existem mais 1
    setDevs([...devs, response.data]);

  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastra</strong>
        <DevForm onSubmit={handleAddDev} />  
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;
