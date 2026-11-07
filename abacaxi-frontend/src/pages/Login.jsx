import { useState } from 'react';
import { api } from '../api.js';
import { SeletorIdioma, useIdioma } from '../i18n.jsx';

export default function Login({ onLogin }) {
  const { t, traduzirErro } = useIdioma();
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
    <div className="login">
      <SeletorIdioma />
      <form className="card" onSubmit={entrar}>
        <h1>🍍 {t('appName')}</h1>
        <label>
          {t('username')}
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required autoFocus />
        </label>
        <label>
          {t('password')}
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        {erro && <p className="erro">{traduzirErro(erro)}</p>}
        <button type="submit" disabled={carregando}>
          {carregando ? t('loggingIn') : t('login')}
        </button>
        {carregando && (
          <p className="dica">{t('renderSleepTip')}</p>
        )}
      </form>
    </div>
  );
}
