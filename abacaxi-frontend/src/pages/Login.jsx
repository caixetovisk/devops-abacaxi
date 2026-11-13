import { useState } from 'react';
import { api } from '../api.js';
import LanguageSelector from '../components/LanguageSelector.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Login({ onLogin, onCancel }) {
  const { t, traduzirErro } = useLanguage();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const dados = await api('/auth/login', { method: 'POST', body: { usuario, senha } });
      localStorage.setItem('token', dados.token);
      localStorage.setItem('usuario', dados.usuario);
      onLogin(dados.usuario);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <header className="login-header">
        <LanguageSelector />
      </header>
      <div className="login">
        <form className="card" onSubmit={entrar}>
          <h1>🍍 Fazenda Abacaxi</h1>
          <label>
            {t('login.username')}
            <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required autoFocus />
          </label>
          <label>
            {t('login.password')}
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </label>
          {erro && <p className="erro">{traduzirErro(erro)}</p>}
          <button type="submit" disabled={carregando}>
            {carregando ? t('login.entering') : t('login.enter')}
          </button>
          {carregando && <p className="dica">{t('login.waking')}</p>}
          {onCancel && (
            <button type="button" onClick={onCancel}>
              {t('nav.home')}
            </button>
          )}
        </form>
      </div>
    </>
  );
}
