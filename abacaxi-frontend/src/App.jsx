import { useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';

const PAGINAS = { painel: 'Painel', colheitas: 'Colheitas', vendas: 'Vendas' };

export default function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('painel');

  function sair() {
    localStorage.clear();
    setUsuario(null);
  }

  if (!usuario) return <Login onLogin={setUsuario} />;

  return (
    <>
      <header>
        <h1> <span class="abacaxi-large">🍍</span> Fazenda de Abacaxis</h1>
        <nav>
          {Object.entries(PAGINAS).map(([chave, nome]) => (
            <button
              key={chave}
              className={pagina === chave ? 'ativo' : ''}
              onClick={() => setPagina(chave)}
            >
              {nome}
            </button>
          ))}
        </nav>
        <div className="usuario">
          {usuario} <button onClick={sair}>Sair</button>
        </div>
      </header>
      <main>
        {pagina === 'painel' && <Painel />}
        {pagina === 'colheitas' && <Colheitas />}
        {pagina === 'vendas' && <Vendas />}
      </main>
    </>
  );
}
