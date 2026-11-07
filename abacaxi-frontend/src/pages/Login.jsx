import { useState } from 'react';
import { api } from '../api.js';
import { traduzirErro } from '../i18n.js';

export default function Login({ onLogin, idioma, t }) {
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
      setErro(err.message === 'Failed to fetch' ? 'Não foi possível conectar à API' : err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login">
      <form className="card" onSubmit={entrar}>
        <h1>🍍 {t('appName')}</h1>
        <label>
          {t('login.username')}
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required autoFocus />
        </label>
        <label>
          {t('login.password')}
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        {erro && <p className="erro">{traduzirErro(erro, idioma)}</p>}
        <button type="submit" disabled={carregando}>
          {carregando ? t('login.submitting') : t('login.submit')}
        </button>
        {carregando && (
          <p className="dica">{t('login.renderTip')}</p>
        )}
      </form>
    </div>
  );
}
