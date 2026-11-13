import { useEffect, useState } from 'react';
import { api, formatarData, formatarReais, hoje } from '../api.js';
import { t } from '../i18n.js';

export default function Vendas({ lang }) {
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
        <h2>{t(lang, 'form.registerSale')}</h2>
        <label>
          {t(lang, 'form.date')}
          <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />
        </label>
        <label>
          {t(lang, 'form.quantity')}
          <input type="number" min="1" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} required />
        </label>
        <label>
          {t(lang, 'form.priceUnit')}
          <input type="number" min="0.01" step="0.01" value={form.preco_unitario} onChange={(e) => setForm({ ...form, preco_unitario: e.target.value })} required />
        </label>
        <label>
          {t(lang, 'form.customer')}
          <input value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} />
        </label>
        <button type="submit">{t(lang, 'form.save')}</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      <div className="card tabela">
        <table>
          <thead>
            <tr>
              <th>{t(lang, 'form.date')}</th>
              <th>{t(lang, 'form.customer')}</th>
              <th>{t(lang, 'table.qtyShort')}</th>
              <th>{t(lang, 'table.priceUnitShort')}</th>
              <th>{t(lang, 'table.total')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((v) => (
              <tr key={v.id}>
                <td>{formatarData(v.data)}</td>
                <td>{v.cliente}</td>
                <td>{v.quantidade}</td>
                <td>{formatarReais(v.preco_unitario)}</td>
                <td>{formatarReais(v.quantidade * Number(v.preco_unitario))}</td>
                <td><button className="excluir" onClick={() => excluir(v.id)}>{t(lang, 'form.delete')}</button></td>
              </tr>
            ))}
            {vendas.length === 0 && <tr><td colSpan="6">{t(lang, 'table.noSales')}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
