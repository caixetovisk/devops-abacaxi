import { useEffect, useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';
import SeletorIdioma from './components/SeletorIdioma.jsx';
import { IDIOMAS, TRADUCOES } from './i18n.js';

const IDIOMA_STORAGE = 'idioma';
const PAGINAS = [
  { id: 'painel', traducao: 'dashboard' },
  { id: 'colheitas', traducao: 'harvests' },
  { id: 'vendas', traducao: 'sales' },
];

export default function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('painel');
  const [idioma, setIdioma] = useState(() => {
    const salvo = localStorage.getItem(IDIOMA_STORAGE);
    return Object.prototype.hasOwnProperty.call(IDIOMAS, salvo) ? salvo : 'pt';
  });
  const t = (chave) => TRADUCOES[idioma][chave];

  useEffect(() => {
    document.documentElement.lang = IDIOMAS[idioma].locale;
    document.title = `🍍 ${TRADUCOES[idioma].appTitle}`;
  }, [idioma]);

  function alterarIdioma(novoIdioma) {
    setIdioma(novoIdioma);
    localStorage.setItem(IDIOMA_STORAGE, novoIdioma);
  }

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  if (!usuario) {
    return (
      <div className="login-pagina">
        <SeletorIdioma idioma={idioma} aoAlterar={alterarIdioma} rotulo={t('language')} />
        <Login onLogin={setUsuario} idioma={idioma} t={t} />
      </div>
    );
  }

  return (
    <>
      <header>
        <h1><span className="abacaxi-large">🍍</span> {t('appTitle')}</h1>
        <nav>
          {PAGINAS.map(({ id, traducao }) => (
            <button
              key={id}
              className={pagina === id ? 'ativo' : ''}
              aria-current={pagina === id ? 'page' : undefined}
              onClick={() => setPagina(id)}
            >
              {t(traducao)}
            </button>
          ))}
        </nav>
        <SeletorIdioma idioma={idioma} aoAlterar={alterarIdioma} rotulo={t('language')} />
        <div className="usuario">
          {usuario} <button onClick={sair}>{t('logout')}</button>
        </div>
      </header>
      <main>
        {pagina === 'painel' && <Painel idioma={idioma} t={t} />}
        {pagina === 'colheitas' && <Colheitas idioma={idioma} t={t} />}
        {pagina === 'vendas' && <Vendas idioma={idioma} t={t} />}
      </main>
    </>
  );
}
