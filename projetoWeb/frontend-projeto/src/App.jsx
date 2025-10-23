import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PessoasList from './components/PessoasList';
import PessoaDetalhe from './components/PessoaDetalhe';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Sistema de Gestão de Pessoas</h1>
          <nav className="main-nav">
            <Link to="/" className="nav-link">
              <span className="nav-icon">👥</span>
              Pessoas
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<PessoasList />} />
          <Route path="/pessoas/:id" element={<PessoaDetalhe />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;