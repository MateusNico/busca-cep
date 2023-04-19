import { useState } from 'react';
import {FiAlertTriangle, FiSearch} from 'react-icons/fi';
import './style.css';
import { wait } from '@testing-library/user-event/dist/utils';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function busca(){
    
   if(input === ''){
    alert("Digite algum CEP!")
    return;
   }

   try{

    const resposta = await api.get(`${input}/json`);
    setCep(resposta.data)
    setInput("");
  
   }catch{
    alert("Ops, erro ao buscar!");
    setInput("")
   }

  }

  return (
    <div className="container">
     <h1 className="title">BuscaCEP</h1>

     <div className="containerInput">
      <input 
      type="text"
      placeholder="Digite seu CEP"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />

      <button className="buttonSearch" onClick={busca}>
        <FiSearch size={25} color='#FFF'/>
      </button>
     </div>

    {Object.keys(cep).length > 0 && (
     <main className='main'>
      <h2>CEP: {cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>Cidade: {cep.localidade} - {cep.uf}</span>
      <span>DDD: {cep.ddd}</span>

     </main>
    )}

    </div>
  );
}

export default App;
