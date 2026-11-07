import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { formatarMoeda, formatarNumero, traduzirErro } from '../i18n.js';

export default function Painel({ idioma, t }) {
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch((err) => setErro(err.message));
  }, []);

  if (erro) return <p className="erro">{traduzirErro(erro, idioma)}</p>;
  if (!resumo) return <p>{t('dashboard.loading')}</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>{t('dashboard.harvested')}</span><strong>{formatarNumero(resumo.colhido, idioma)}</strong></div>
      <div className="card"><span>{t('dashboard.sold')}</span><strong>{formatarNumero(resumo.vendido, idioma)}</strong></div>
      <div className="card"><span>{t('dashboard.stock')}</span><strong>{formatarNumero(resumo.estoque, idioma)}</strong></div>
      <div className="card"><span>{t('dashboard.revenue')}</span><strong>{formatarMoeda(resumo.faturamento, idioma)}</strong></div>
    </div>
  );
}
