import { useEffect, useState } from 'react';
import { api, hoje } from '../api.js';
import { formatarData, formatarMoeda, formatarNumero, traduzirErro } from '../i18n.js';

export default function Vendas({ idioma, t }) {
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
        <h2>{t('sales.title')}</h2>
        <label>
          {t('sales.date')}
          <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />
        </label>
        <label>
          {t('sales.quantity')}
          <input type="number" min="1" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} required />
        </label>
        <label>
          {t('sales.unitPrice')}
          <input type="number" min="0.01" step="0.01" value={form.preco_unitario} onChange={(e) => setForm({ ...form, preco_unitario: e.target.value })} required />
        </label>
        <label>
          {t('sales.customer')}
          <input value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} />
        </label>
        <button type="submit">{t('sales.save')}</button>
      </form>
      {erro && <p className="erro">{traduzirErro(erro, idioma)}</p>}

      <div className="card tabela">
        <table>
          <thead>
            <tr>
              <th>{t('sales.date')}</th>
              <th>{t('sales.customer')}</th>
              <th>{t('sales.quantity')}</th>
              <th>{t('sales.unitPrice')}</th>
              <th>{t('sales.total')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((v) => (
              <tr key={v.id}>
                <td>{formatarData(v.data, idioma)}</td>
                <td>{v.cliente}</td>
                <td>{formatarNumero(v.quantidade, idioma)}</td>
                <td>{formatarMoeda(v.preco_unitario, idioma)}</td>
                <td>{formatarMoeda(v.quantidade * Number(v.preco_unitario), idioma)}</td>
                <td><button className="excluir" onClick={() => excluir(v.id)}>{t('sales.delete')}</button></td>
              </tr>
            ))}
            {vendas.length === 0 && <tr><td colSpan="6">{t('sales.empty')}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
