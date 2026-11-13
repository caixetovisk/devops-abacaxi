import { useEffect, useState } from 'react';
import { api, formatarDolares } from '../api.js';
import { t } from '../i18n.js';

export default function Painel({ lang }) {
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch((err) => setErro(err.message));
  }, []);

  if (erro) return <p className="erro">{erro}</p>;
  if (!resumo) return <p>{t(lang, 'dashboard.loading')}</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>{t(lang, 'dashboard.totalHarvested')}</span><strong>{resumo.colhido}</strong></div>
      <div className="card"><span>{t(lang, 'dashboard.totalSold')}</span><strong>{resumo.vendido}</strong></div>
      <div className="card"><span>{t(lang, 'dashboard.inStock')}</span><strong>{resumo.estoque}</strong></div>
      <div className="card">
        <span>{t(lang, 'dashboard.revenue')}</span>
        <strong>{formatarDolares(resumo.faturamento)}</strong>
        <small className="currency-notice">{t(lang, 'currency.notice')}</small>
      </div>
    </div>
  );
}
