import { useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';
import { SeletorIdioma, useIdioma } from './i18n.jsx';

const PAGINAS = [
  { chave: 'painel', traducao: 'dashboard' },
  { chave: 'colheitas', traducao: 'harvests' },
  { chave: 'vendas', traducao: 'sales' },
];

export default function App() {
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
        <h1><span className="abacaxi-large">🍍</span> {t('appName')}</h1>
        <nav>
          {PAGINAS.map(({ chave, traducao }) => (
            <button
              key={chave}
              className={pagina === chave ? 'ativo' : ''}
              onClick={() => setPagina(chave)}
            >
              {t(traducao)}
            </button>
          ))}
        </nav>
        <div className="usuario">
          {usuario} <button onClick={sair}>{t('logout')}</button>
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
