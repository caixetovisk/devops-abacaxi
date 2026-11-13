import { useState } from 'react';
import { api } from '../api.js';
import { t } from '../i18n.js';

export default function Login({ onLogin, lang }) {
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
      setErro(err.message === 'Failed to fetch' ? t(lang, 'login.connectionError') : err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login">
      <form className="card" onSubmit={entrar}>
        <h1>{t(lang, 'login.title')}</h1>
        <label>
          {t(lang, 'login.user')}
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required autoFocus />
        </label>
        <label>
          {t(lang, 'login.password')}
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        {erro && <p className="erro">{erro}</p>}
        <button type="submit" disabled={carregando}>
          {carregando ? t(lang, 'login.entering') : t(lang, 'login.enter')}
        </button>
        {carregando && <p className="dica">{t(lang, 'login.renderDelay')}</p>}
      </form>
    </div>
  );
}
