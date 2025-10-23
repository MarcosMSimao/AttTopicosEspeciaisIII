import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function PessoaDetalhe() {
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/pessoas/${id}`);
        setPessoa(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da pessoa:", error);
        setPessoa(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoa();
  }, [id]);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  if (!pessoa) {
    return (
      <div>
        <h2>Pessoa não encontrada</h2>
        <Link to="/" className="back-link">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Detalhes da Pessoa</h2>
      <div className="detail-card">
        <p><strong>ID:</strong> {pessoa.id}</p>
        <p><strong>Nome:</strong> {pessoa.nome}</p>
        <p><strong>Idade:</strong> {pessoa.idade}</p>
      </div>
      <Link to="/" className="back-link">Voltar para a lista</Link>
    </div>
  );
}

export default PessoaDetalhe;