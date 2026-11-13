import { useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';
import { IdiomaProvider, SeletorIdioma, useIdioma } from './i18n.jsx';

const PAGINAS = ['painel', 'colheitas', 'vendas'];

export default function App() {
  return (
    <IdiomaProvider>
      <Aplicacao />
    </IdiomaProvider>
  );
}

function Aplicacao() {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('painel');
  const { t } = useIdioma();

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  if (!usuario) return <Login onLogin={setUsuario} />;

  return (
    <>
      <header>
        <h1>{t.titulo}</h1>
        <nav>
          {PAGINAS.map((chave) => (
            <button
              key={chave}
              className={pagina === chave ? 'ativo' : ''}
              onClick={() => setPagina(chave)}
            >
              {t.nav[chave]}
            </button>
          ))}
        </nav>
        <div className="usuario">
          {usuario} <button onClick={sair}>{t.sair}</button>
        </div>
        <SeletorIdioma />
      </header>
      <main>
        {pagina === 'painel' && <Painel />}
        {pagina === 'colheitas' && <Colheitas />}
        {pagina === 'vendas' && <Vendas />}
      </main>
    </>
  );
}
