import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function PessoasList() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const fetchPessoas = async () => {
    try {
      const response = await api.get('/api/pessoas');
      setPessoas(response.data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/pessoas', { nome, idade: parseInt(idade) });
      setNome('');
      setIdade('');
      fetchPessoas();
    } catch (error) {
      console.error("Erro ao salvar pessoa:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/pessoas/${id}`);
      fetchPessoas();
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Pessoas</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>

      <hr />

      <h2>Lista de Pessoas</h2>
      <ul className="list-container">
        {pessoas.map(pessoa => (
          <li key={pessoa.id}>
            <Link to={`/pessoas/${pessoa.id}`} className="list-item-link">
              {pessoa.nome} (Idade: {pessoa.idade})
            </Link>
            <button onClick={() => handleDelete(pessoa.id)} className="delete-btn">
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PessoasList;