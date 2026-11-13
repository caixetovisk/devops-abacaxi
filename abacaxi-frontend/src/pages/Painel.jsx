import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useIdioma } from '../i18n.jsx';

export default function Painel() {
  const { t, traduzirErro, formatarReais } = useIdioma();
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch((err) => setErro(err.message));
  }, []);

  if (erro) return <p className="erro">{traduzirErro(erro)}</p>;
  if (!resumo) return <p>{t.painel.carregando}</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>{t.painel.colhido}</span><strong>{resumo.colhido}</strong></div>
      <div className="card"><span>{t.painel.vendido}</span><strong>{resumo.vendido}</strong></div>
      <div className="card"><span>{t.painel.estoque}</span><strong>{resumo.estoque}</strong></div>
      <div className="card"><span>{t.painel.faturamento}</span><strong>{formatarReais(resumo.faturamento)}</strong></div>
    </div>
  );
}
