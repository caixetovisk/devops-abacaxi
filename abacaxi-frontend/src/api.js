// Endereço da API vem da variável de ambiente VITE_API_URL
// (definida no arquivo .env localmente, ou nas variáveis do Render).
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

export async function api(caminho, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('token');

  const resposta = await fetch(`${API_URL}${caminho}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body && JSON.stringify(body),
  });

  if (resposta.status === 401 && token) {
    // token expirou: volta para o login
    localStorage.removeItem('token');
    window.location.reload();
  }
  if (resposta.status === 204) return null;

  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro || 'Erro na requisição');
  return dados;
}

export const formatarData = (data) => data.split('-').reverse().join('/');
export const formatarDolares = (valor) =>
  Number(valor).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
export const hoje = () => new Date().toISOString().slice(0, 10);
