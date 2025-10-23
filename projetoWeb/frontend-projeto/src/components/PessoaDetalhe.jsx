import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function PessoaDetalhe() {
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/api/pessoas/${id}`);
        setPessoa(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da pessoa:", error);
        setError("Erro ao carregar dados da pessoa");
        setPessoa(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoa();
  }, [id]);

  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="loading-spinner">⏳</div>
          <p>Carregando dados da pessoa...</p>
        </div>
      </div>
    );
  }

  if (error || !pessoa) {
    return (
      <div className="card">
        <div className="error">
          <div className="error-icon">❌</div>
          <h2>Pessoa não encontrada</h2>
          <p>Não foi possível encontrar a pessoa solicitada.</p>
          <Link to="/" className="back-link">
            Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">👤 Detalhes da Pessoa</h2>
      <div className="detail-card">
        <div className="person-header">
          <div className="person-avatar">👤</div>
          <div className="person-info">
            <h3 className="person-name">{pessoa.nome}</h3>
            <p className="person-age">{pessoa.idade} anos</p>
          </div>
        </div>
        
        <div className="person-details">
          <p><strong>🆔 ID:</strong> {pessoa.id}</p>
          <p><strong>📝 Nome:</strong> {pessoa.nome}</p>
          <p><strong>🎂 Idade:</strong> {pessoa.idade} anos</p>
          <p><strong>📅 Status:</strong> <span className="status-active">Ativo</span></p>
        </div>
      </div>
      
      <div className="action-buttons">
        <Link to="/" className="back-link">
          ← Voltar para a lista
        </Link>
      </div>
    </div>
  );
}

export default PessoaDetalhe;