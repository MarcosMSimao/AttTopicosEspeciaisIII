import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function PessoasList() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPessoas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/pessoas');
      setPessoas(response.data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    } finally {
      setLoading(false);
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
    if (window.confirm('Tem certeza que deseja deletar esta pessoa?')) {
      try {
        await api.delete(`/api/pessoas/${id}`);
        fetchPessoas();
      } catch (error) {
        console.error("Erro ao deletar pessoa:", error);
      }
    }
  };

  return (
    <div>
      <div className="card">
        <h2 className="card-title">👤 Cadastrar Nova Pessoa</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="idade">Idade</label>
            <input
              id="idade"
              type="number"
              placeholder="Digite a idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              min="1"
              max="120"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : '✨ Salvar Pessoa'}
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="card-title">📋 Lista de Pessoas ({pessoas.length})</h2>
        {loading ? (
          <div className="loading">Carregando pessoas...</div>
        ) : pessoas.length === 0 ? (
          <div className="loading">Nenhuma pessoa cadastrada ainda.</div>
        ) : (
          <ul className="list-container">
            {pessoas.map(pessoa => (
              <li key={pessoa.id} className="list-item">
                <Link to={`/pessoas/${pessoa.id}`} className="list-item-link">
                  <span className="person-icon">👤</span>
                  <span className="person-name">{pessoa.nome}</span>
                  <span className="person-age">({pessoa.idade} anos)</span>
                </Link>
                <button 
                  onClick={() => handleDelete(pessoa.id)} 
                  className="delete-btn"
                  title="Deletar pessoa"
                >
                  🗑️ Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PessoasList;