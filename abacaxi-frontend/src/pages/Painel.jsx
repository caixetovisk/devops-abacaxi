import { useEffect, useState } from 'react';
import { api, formatarReais } from '../api.js';
import { useLanguage } from '../i18n.jsx';

export default function Painel() {
  const { locale, t, translateError } = useLanguage();
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch((err) => setErro(err.message));
  }, []);

  if (erro) return <p className="erro">{translateError(erro)}</p>;
  if (!resumo) return <p>{t('loading')}</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>{t('totalHarvested')}</span><strong>{resumo.colhido}</strong></div>
      <div className="card"><span>{t('totalSold')}</span><strong>{resumo.vendido}</strong></div>
      <div className="card"><span>{t('inStock')}</span><strong>{resumo.estoque}</strong></div>
      <div className="card"><span>{t('revenue')}</span><strong>{formatarReais(resumo.faturamento, locale)}</strong></div>
    </div>
  );
}
