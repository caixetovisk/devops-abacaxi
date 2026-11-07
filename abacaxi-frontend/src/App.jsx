import { useEffect, useState } from 'react';
import Login from './pages/Login.jsx';
import Painel from './pages/Painel.jsx';
import Colheitas from './pages/Colheitas.jsx';
import Vendas from './pages/Vendas.jsx';
import { CHAVE_IDIOMA, idiomaSalvo, traduzir } from './i18n.js';
import bandeiraBrasil from './assets/flags/brazil.svg';
import bandeiraEUA from './assets/flags/united-states.svg';
import bandeiraChina from './assets/flags/china.svg';

const IDIOMAS = [
  { codigo: 'pt', bandeira: bandeiraBrasil },
  { codigo: 'en', bandeira: bandeiraEUA },
  { codigo: 'zh', bandeira: bandeiraChina },
];

export default function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));
  const [pagina, setPagina] = useState('painel');
  const [idioma, setIdioma] = useState(idiomaSalvo);
  const t = (chave) => traduzir(idioma, chave);

  useEffect(() => {
    document.documentElement.lang = { pt: 'pt-BR', en: 'en', zh: 'zh-CN' }[idioma];
    document.title = t('appName');
  }, [idioma]);

  function alterarIdioma(novoIdioma) {
    localStorage.setItem(CHAVE_IDIOMA, novoIdioma);
    setIdioma(novoIdioma);
  }

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  function seletorIdioma() {
    return (
      <div className="seletor-idioma" role="group" aria-label={t('language')}>
        {IDIOMAS.map(({ codigo, bandeira }) => (
          <button
            key={codigo}
            type="button"
            className={idioma === codigo ? 'idioma-ativo' : ''}
            aria-label={t(`languageNames.${codigo}`)}
            aria-pressed={idioma === codigo}
            title={t(`languageNames.${codigo}`)}
            onClick={() => alterarIdioma(codigo)}
          >
            <img className="idioma-bandeira" src={bandeira} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="app-login">
        {seletorIdioma()}
        <Login onLogin={setUsuario} idioma={idioma} t={t} />
      </div>
    );
  }

  return (
    <>
      <header>
        <h1><span className="abacaxi-large">🍍</span> {t('appName')}</h1>
        <nav>
          {['painel', 'colheitas', 'vendas'].map((chave) => (
            <button
              key={chave}
              className={pagina === chave ? 'ativo' : ''}
              onClick={() => setPagina(chave)}
            >
              {t(`pages.${chave}`)}
            </button>
          ))}
        </nav>
        <div className="usuario">
          {usuario} <button onClick={sair}>{t('logout')}</button>
        </div>
        {seletorIdioma()}
      </header>
      <main>
        {pagina === 'painel' && <Painel idioma={idioma} t={t} />}
        {pagina === 'colheitas' && <Colheitas idioma={idioma} t={t} />}
        {pagina === 'vendas' && <Vendas idioma={idioma} t={t} />}
      </main>
    </>
  );
}
