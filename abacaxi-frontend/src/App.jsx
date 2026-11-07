import { useState } from 'react';
import LanguageSelector from './components/LanguageSelector.jsx';
import { I18nProvider, useLanguage } from './i18n.jsx';
import Login from './pages/Login.jsx';
import Institucional from './pages/Institucional.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';

const SECOES = [
  ['inicio', 'nav.home'],
  ['fazenda', 'nav.farm'],
  ['cultivo', 'nav.cultivation'],
  ['receitas', 'nav.recipes'],
  ['contato', 'nav.contact'],
];
const GESTAO = [
  ['painel', 'nav.dashboard'],
  ['colheitas', 'nav.harvests'],
  ['vendas', 'nav.sales'],
];

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

function AppContent() {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('inicio');
  const { t } = useLanguage();

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  if (!usuario) return <Login onLogin={setUsuario} />;

  return (
    <>
      <header>
        <h1>🍍 Fazenda Abacaxi</h1>
        <div className="usuario">
          <LanguageSelector />
          {usuario} <button onClick={sair}>{t('common.exit')}</button>
        </div>
        <div className="navegacao">
          <nav className="site-nav" aria-label={t('nav.mainLabel')}>
            {SECOES.map(([chave, rotulo]) => (
              <button
                key={chave}
                className={pagina === chave ? 'ativo' : ''}
                aria-current={pagina === chave ? 'page' : undefined}
                onClick={() => setPagina(chave)}
              >
                {t(rotulo)}
              </button>
            ))}
          </nav>
          <nav className="gestao-nav" aria-label={t('nav.managementLabel')}>
            <span>{t('common.management')}</span>
            {GESTAO.map(([chave, rotulo]) => (
              <button
                key={chave}
                className={pagina === chave ? 'ativo' : ''}
                aria-current={pagina === chave ? 'page' : undefined}
                onClick={() => setPagina(chave)}
              >
                {t(rotulo)}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main>
        {SECOES.some(([chave]) => chave === pagina) && <Institucional pagina={pagina} />}
        {pagina === 'painel' && <Painel />}
        {pagina === 'colheitas' && <Colheitas />}
        {pagina === 'vendas' && <Vendas />}
      </main>
    </>
  );
}
