import { useEffect, useState } from 'react';
import { api, formatarDolares } from '../api.js';
import { useLanguage } from '../i18n.jsx';

export default function Painel() {
  const { idioma, t, traduzirErro } = useLanguage();
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch((err) => setErro(err.message));
  }, []);

  if (erro) return <p className="erro">{traduzirErro(erro)}</p>;
  if (!resumo) return <p>{t('common.loading')}</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>{t('dashboard.harvested')}</span><strong>{resumo.colhido}</strong></div>
      <div className="card"><span>{t('dashboard.sold')}</span><strong>{resumo.vendido}</strong></div>
      <div className="card"><span>{t('dashboard.inStock')}</span><strong>{resumo.estoque}</strong></div>
      <div className="card"><span>{t('dashboard.revenue')}</span><strong>{formatarDolares(resumo.faturamento, idioma)}</strong></div>
    </div>
  );
}
