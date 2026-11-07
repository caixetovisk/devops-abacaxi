import { useEffect, useState } from 'react';
import { api, hoje } from '../api.js';
import { formatarData, formatarNumero, traduzirErro } from '../i18n.js';

export default function Colheitas({ idioma, t }) {
  const [colheitas, setColheitas] = useState([]);
  const [form, setForm] = useState({ data: hoje(), quantidade: '', observacao: '' });
  const [erro, setErro] = useState('');

  const carregar = () => api('/colheitas').then(setColheitas).catch((err) => setErro(err.message));
  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    setErro('');
    try {
      await api('/colheitas', {
        method: 'POST',
        body: { ...form, quantidade: Number(form.quantidade) },
      });
      setForm({ ...form, quantidade: '', observacao: '' });
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function excluir(id) {
    setErro('');
    try {
      await api(`/colheitas/${id}`, { method: 'DELETE' });
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <>
      <form className="card formulario" onSubmit={salvar}>
        <h2>{t('harvests.title')}</h2>
        <label>
          {t('harvests.date')}
          <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />
        </label>
        <label>
          {t('harvests.quantity')}
          <input type="number" min="1" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} required />
        </label>
        <label>
          {t('harvests.notes')}
          <input value={form.observacao} onChange={(e) => setForm({ ...form, observacao: e.target.value })} />
        </label>
        <button type="submit">{t('harvests.save')}</button>
      </form>
      {erro && <p className="erro">{traduzirErro(erro, idioma)}</p>}

      <div className="card tabela">
        <table>
          <thead>
            <tr><th>{t('harvests.date')}</th><th>{t('harvests.quantity')}</th><th>{t('harvests.notes')}</th><th></th></tr>
          </thead>
          <tbody>
            {colheitas.map((c) => (
              <tr key={c.id}>
                <td>{formatarData(c.data, idioma)}</td>
                <td>{formatarNumero(c.quantidade, idioma)}</td>
                <td>{c.observacao}</td>
                <td><button className="excluir" onClick={() => excluir(c.id)}>{t('harvests.delete')}</button></td>
              </tr>
            ))}
            {colheitas.length === 0 && <tr><td colSpan="4">{t('harvests.empty')}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
