import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { formatarReais, traduzirErro } from '../i18n.js';

export default function Painel({ idioma, t }) {
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch((err) => setErro(err.message));
  }, []);

  if (erro) return <p className="erro">{traduzirErro(erro, idioma)}</p>;
  if (!resumo) return <p>{t('loading')}</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>{t('totalHarvested')}</span><strong>{resumo.colhido}</strong></div>
      <div className="card"><span>{t('totalSold')}</span><strong>{resumo.vendido}</strong></div>
      <div className="card"><span>{t('inStock')}</span><strong>{resumo.estoque}</strong></div>
      <div className="card"><span>{t('revenue')}</span><strong>{formatarReais(resumo.faturamento, idioma)}</strong></div>
    </div>
  );
}
