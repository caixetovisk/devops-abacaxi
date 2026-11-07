import { useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';
import { LanguageSelector, useLanguage } from './i18n.jsx';

const PAGE_LABELS = {
  painel: 'dashboard',
  colheitas: 'harvests',
  vendas: 'sales',
};

export default function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('painel');
  const { t } = useLanguage();

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  if (!usuario) {
    return (
      <>
        <LanguageSelector className="login-language-selector" />
        <Login onLogin={setUsuario} />
      </>
    );
  }

  return (
    <>
      <header>
        <h1>🍍 {t('brand')}</h1>
        <nav>
          {Object.entries(PAGE_LABELS).map(([chave, label]) => (
            <button
              key={chave}
              className={pagina === chave ? 'ativo' : ''}
              onClick={() => setPagina(chave)}
            >
              {t(label)}
            </button>
          ))}
        </nav>
        <div className="usuario">
          {usuario} <button onClick={sair}>{t('logout')}</button>
        </div>
        <LanguageSelector />
      </header>
      <main>
        {pagina === 'painel' && <Painel />}
        {pagina === 'colheitas' && <Colheitas />}
        {pagina === 'vendas' && <Vendas />}
      </main>
    </>
  );
}
