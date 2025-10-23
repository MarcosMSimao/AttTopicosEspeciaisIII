import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PessoasList from './components/PessoasList';
import PessoaDetalhe from './components/PessoaDetalhe';
import ProdutoList from './components/ProdutoList';
import ProdutoDetalhe from './components/ProdutoDetalhe';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Pessoas</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
        </ul>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<PessoasList />} />
          <Route path="/pessoas/:id" element={<PessoaDetalhe />} />
          <Route path="/produtos" element={<ProdutoList />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;