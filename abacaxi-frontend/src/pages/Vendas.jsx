import { useEffect, useState } from 'react';
import { api, formatarData, formatarReais, hoje } from '../api.js';
import { useIdioma } from '../i18n.jsx';

export default function Vendas() {
  const { idioma, t, traduzirErro } = useIdioma();
  const [vendas, setVendas] = useState([]);
  const [form, setForm] = useState({ data: hoje(), quantidade: '', preco_unitario: '', cliente: '' });
  const [erro, setErro] = useState('');

  const carregar = () => api('/vendas').then(setVendas).catch((err) => setErro(err.message));
  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    setErro('');
    try {
      await api('/vendas', {
        method: 'POST',
        body: {
          ...form,
          quantidade: Number(form.quantidade),
          preco_unitario: Number(form.preco_unitario),
        },
      });
      setForm({ ...form, quantidade: '', preco_unitario: '', cliente: '' });
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function excluir(id) {
    setErro('');
    try {
      await api(`/vendas/${id}`, { method: 'DELETE' });
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <>
      <form className="card formulario" onSubmit={salvar}>
        <h2>{t('sale.title')}</h2>
        <label>
          {t('common.date')}
          <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />
        </label>
        <label>
          {t('common.quantity')}
          <input type="number" min="1" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} required />
        </label>
        <label>
          {t('sale.unitPrice')}
          <input type="number" min="0.01" step="0.01" value={form.preco_unitario} onChange={(e) => setForm({ ...form, preco_unitario: e.target.value })} required />
        </label>
        <label>
          {t('common.client')}
          <input value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} />
        </label>
        <button type="submit">{t('common.save')}</button>
      </form>
      {erro && <p className="erro">{traduzirErro(erro)}</p>}

      <div className="card tabela">
        <table>
          <thead>
            <tr><th>{t('common.date')}</th><th>{t('common.client')}</th><th>{t('common.quantity')}</th><th>{t('common.unitPrice')}</th><th>{t('common.total')}</th><th></th></tr>
          </thead>
          <tbody>
            {vendas.map((v) => (
              <tr key={v.id}>
                <td>{formatarData(v.data, idioma)}</td>
                <td>{v.cliente}</td>
                <td>{v.quantidade.toLocaleString(idioma)}</td>
                <td>{formatarReais(v.preco_unitario, idioma)}</td>
                <td>{formatarReais(v.quantidade * Number(v.preco_unitario), idioma)}</td>
                <td><button className="excluir" onClick={() => excluir(v.id)}>{t('common.delete')}</button></td>
              </tr>
            ))}
            {vendas.length === 0 && <tr><td colSpan="6">{t('common.emptySales')}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
