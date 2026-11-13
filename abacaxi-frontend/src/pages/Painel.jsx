import { useEffect, useState } from 'react';
import { api, formatarReais } from '../api.js';
import { useIdioma } from '../i18n.jsx';

export default function Painel() {
  const { idioma, t, traduzirErro } = useIdioma();
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch((err) => setErro(err.message));
  }, []);

  if (erro) return <p className="erro">{traduzirErro(erro)}</p>;
  if (!resumo) return <p>{t('common.loading')}</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>{t('dashboard.harvested')}</span><strong>{resumo.colhido.toLocaleString(idioma)}</strong></div>
      <div className="card"><span>{t('dashboard.sold')}</span><strong>{resumo.vendido.toLocaleString(idioma)}</strong></div>
      <div className="card"><span>{t('dashboard.stock')}</span><strong>{resumo.estoque.toLocaleString(idioma)}</strong></div>
      <div className="card"><span>{t('dashboard.revenue')}</span><strong>{formatarReais(resumo.faturamento, idioma)}</strong></div>
    </div>
  );
}
