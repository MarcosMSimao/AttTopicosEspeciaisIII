import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function ProdutoDetalhe() {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
        setProduto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  if (!produto) {
    return (
      <div>
        <h2>Produto não encontrado</h2>
        <Link to="/produtos" className="back-link">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Detalhes do Produto</h2>
      <div className="detail-card">
        <p><strong>ID:</strong> {produto.id}</p>
        <p><strong>Nome:</strong> {produto.nome}</p>
        <p><strong>Quantidade:</strong> {produto.quantidade}</p>
        <p><strong>Valor:</strong> R$ {produto.valor}</p>
      </div>
      <Link to="/produtos" className="back-link">Voltar para a lista</Link>
    </div>
  );
}

export default ProdutoDetalhe;