import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/api/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const produto = {
        nome,
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
      };
      await api.post('/api/produtos', produto);
      setNome('');
      setQuantidade('');
      setValor('');
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Valor (ex: 10.50)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>

      <hr />

      <h2>Lista de Produtos</h2>
      <ul className="list-container">
        {produtos.map(produto => (
          <li key={produto.id}>
            <Link to={`/produtos/${produto.id}`} className="list-item-link">
              {produto.nome} (Qtd: {produto.quantidade}, R$ {produto.valor})
            </Link>
            <button onClick={() => handleDelete(produto.id)} className="delete-btn">
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProdutoList;