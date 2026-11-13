import { useEffect, useState } from 'react';
import { api, hoje } from '../api.js';
import { useIdioma } from '../i18n.jsx';

export default function Colheitas() {
  const { t, traduzirErro, formatarData } = useIdioma();
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
        <h2>{t.colheitas.registrar}</h2>
        <label>
          {t.colheitas.data}
          <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required />
        </label>
        <label>
          {t.colheitas.quantidade}
          <input type="number" min="1" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} required />
        </label>
        <label>
          {t.colheitas.observacao}
          <input value={form.observacao} onChange={(e) => setForm({ ...form, observacao: e.target.value })} />
        </label>
        <button type="submit">{t.colheitas.salvar}</button>
      </form>
      {erro && <p className="erro">{traduzirErro(erro)}</p>}

      <div className="card tabela">
        <table>
          <thead>
            <tr><th>{t.colheitas.data}</th><th>{t.colheitas.quantidade}</th><th>{t.colheitas.observacao}</th><th></th></tr>
          </thead>
          <tbody>
            {colheitas.map((c) => (
              <tr key={c.id}>
                <td>{formatarData(c.data)}</td>
                <td>{c.quantidade}</td>
                <td>{c.observacao}</td>
                <td><button className="excluir" onClick={() => excluir(c.id)}>{t.colheitas.excluir}</button></td>
              </tr>
            ))}
            {colheitas.length === 0 && <tr><td colSpan="4">{t.colheitas.nenhuma}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
