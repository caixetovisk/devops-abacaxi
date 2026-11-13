import { useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import { getPreferredLanguage, t } from './i18n.js';

const PAGINAS = { painel: 'nav.painel', colheitas: 'nav.colheitas', vendas: 'nav.vendas' };

export default function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('painel');
  const [lang, setLang] = useState(getPreferredLanguage());

  function mudarIdioma(novoIdioma) {
    setLang(novoIdioma);
    localStorage.setItem('lang', novoIdioma);
  }

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  if (!usuario) {
    return (
      <>
        <Login onLogin={setUsuario} lang={lang} />
        <LanguageSwitcher lang={lang} onChange={mudarIdioma} />
      </>
    );
  }

  return (
    <>
      <header>
        <h1>
          <span className="abacaxi-large">🍍</span> Fazenda de Abacaxis
        </h1>

        <nav>
          {Object.entries(PAGINAS).map(([chave, chaveTraducao]) => (
            <button
              key={chave}
              className={pagina === chave ? 'ativo' : ''}
              onClick={() => setPagina(chave)}
            >
              {t(lang, chaveTraducao)}
            </button>
          ))}
        </nav>
        <div className="usuario">
          {usuario} <button onClick={sair}>{t(lang, 'header.logout')}</button>
        </div>
      </header>
      <main>
        {pagina === 'painel' && <Painel lang={lang} />}
        {pagina === 'colheitas' && <Colheitas lang={lang} />}
        {pagina === 'vendas' && <Vendas lang={lang} />}
      </main>
      <LanguageSwitcher lang={lang} onChange={mudarIdioma} />
    </>
  );
}
