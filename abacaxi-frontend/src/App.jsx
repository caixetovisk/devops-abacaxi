import { useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';
import { ProvedorIdioma, SeletorIdioma, useIdioma } from './i18n.jsx';

const PAGINAS = {
  painel: 'nav.dashboard',
  colheitas: 'nav.harvests',
  vendas: 'nav.sales',
};

export default function App() {
  return (
    <ProvedorIdioma>
      <Aplicacao />
    </ProvedorIdioma>
  );
}

function Aplicacao() {
  const { t } = useIdioma();
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('painel');

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  if (!usuario) return <Login onLogin={setUsuario} />;

  return (
    <>
      <header>
        <h1><span className="abacaxi-large">🍍</span> {t('app.name')}</h1>
        <nav>
          {Object.entries(PAGINAS).map(([chave, nome]) => (
            <button
              key={chave}
              className={pagina === chave ? 'ativo' : ''}
              onClick={() => setPagina(chave)}
            >
              {t(nome)}
            </button>
          ))}
        </nav>
        <SeletorIdioma />
        <div className="usuario">
          {usuario} <button onClick={sair}>{t('nav.logout')}</button>
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
