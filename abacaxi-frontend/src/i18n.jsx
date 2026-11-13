import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const IDIOMA_PADRAO = 'pt';
const CHAVE_IDIOMA = 'idioma';

const TRADUCOES = {
  pt: {
    idioma: 'Idioma',
    idiomas: { pt: 'Português', en: 'Inglês', zh: 'Chinês' },
    titulo: '🍍 Fazenda de Abacaxis',
    nav: { painel: 'Painel', colheitas: 'Colheitas', vendas: 'Vendas' },
    sair: 'Sair',
    login: {
      usuario: 'Usuário',
      senha: 'Senha',
      entrar: 'Entrar',
      entrando: 'Entrando...',
      dica: 'No plano gratuito do Render a API pode levar até 1 minuto para "acordar".',
    },
    painel: {
      carregando: 'Carregando...',
      colhido: 'Total colhido',
      vendido: 'Total vendido',
      estoque: 'Em estoque',
      faturamento: 'Faturamento',
    },
    colheitas: {
      registrar: 'Registrar colheita',
      data: 'Data',
      quantidade: 'Quantidade',
      observacao: 'Observação',
      salvar: 'Salvar',
      excluir: 'Excluir',
      nenhuma: 'Nenhuma colheita registrada.',
    },
    vendas: {
      registrar: 'Registrar venda',
      data: 'Data',
      quantidade: 'Quantidade',
      preco: 'Preço unitário (R$)',
      cliente: 'Cliente',
      salvar: 'Salvar',
      excluir: 'Excluir',
      quantidadeAbrev: 'Qtd.',
      precoAbrev: 'Preço un.',
      total: 'Total',
      nenhuma: 'Nenhuma venda registrada.',
    },
    erros: {
      'Usuário ou senha inválidos': 'Usuário ou senha inválidos',
      'Informe a data e uma quantidade maior que zero': 'Informe a data e uma quantidade maior que zero',
      'Colheita não encontrada': 'Colheita não encontrada',
      'Não é possível excluir: os abacaxis desta colheita já foram vendidos':
        'Não é possível excluir: os abacaxis desta colheita já foram vendidos',
      'Informe data, quantidade e preço maiores que zero': 'Informe data, quantidade e preço maiores que zero',
      'Venda não encontrada': 'Venda não encontrada',
      'Token não informado': 'Token não informado',
      'Token inválido ou expirado': 'Token inválido ou expirado',
      'Erro interno no servidor': 'Erro interno no servidor',
      'Failed to fetch': 'Não foi possível conectar à API',
    },
    estoqueInsuficiente: (quantidade) => `Estoque insuficiente. Disponível: ${quantidade}`,
  },
  en: {
    idioma: 'Language',
    idiomas: { pt: 'Portuguese', en: 'English', zh: 'Chinese' },
    titulo: '🍍 Pineapple Farm',
    nav: { painel: 'Dashboard', colheitas: 'Harvests', vendas: 'Sales' },
    sair: 'Log out',
    login: {
      usuario: 'Username',
      senha: 'Password',
      entrar: 'Log in',
      entrando: 'Logging in...',
      dica: 'On Render’s free plan, the API may take up to 1 minute to wake up.',
    },
    painel: {
      carregando: 'Loading...',
      colhido: 'Total harvested',
      vendido: 'Total sold',
      estoque: 'In stock',
      faturamento: 'Revenue',
    },
    colheitas: {
      registrar: 'Record harvest',
      data: 'Date',
      quantidade: 'Quantity',
      observacao: 'Notes',
      salvar: 'Save',
      excluir: 'Delete',
      nenhuma: 'No harvests recorded.',
    },
    vendas: {
      registrar: 'Record sale',
      data: 'Date',
      quantidade: 'Quantity',
      preco: 'Unit price (R$)',
      cliente: 'Customer',
      salvar: 'Save',
      excluir: 'Delete',
      quantidadeAbrev: 'Qty.',
      precoAbrev: 'Unit price',
      total: 'Total',
      nenhuma: 'No sales recorded.',
    },
    erros: {
      'Usuário ou senha inválidos': 'Invalid username or password',
      'Informe a data e uma quantidade maior que zero': 'Enter a date and a quantity greater than zero',
      'Colheita não encontrada': 'Harvest not found',
      'Não é possível excluir: os abacaxis desta colheita já foram vendidos':
        'Cannot delete: the pineapples from this harvest have already been sold',
      'Informe data, quantidade e preço maiores que zero': 'Enter a date, quantity, and price greater than zero',
      'Venda não encontrada': 'Sale not found',
      'Token não informado': 'Authentication token was not provided',
      'Token inválido ou expirado': 'Authentication token is invalid or expired',
      'Erro interno no servidor': 'Internal server error',
      'Failed to fetch': 'Could not connect to the API',
    },
    estoqueInsuficiente: (quantidade) => `Insufficient stock. Available: ${quantidade}`,
  },
  zh: {
    idioma: '语言',
    idiomas: { pt: '葡萄牙语', en: '英语', zh: '中文' },
    titulo: '🍍 菠萝农场',
    nav: { painel: '仪表盘', colheitas: '收成', vendas: '销售' },
    sair: '退出登录',
    login: {
      usuario: '用户名',
      senha: '密码',
      entrar: '登录',
      entrando: '正在登录...',
      dica: 'Render 免费方案中的 API 可能需要最多 1 分钟才能启动。',
    },
    painel: {
      carregando: '加载中...',
      colhido: '收获总量',
      vendido: '销售总量',
      estoque: '库存',
      faturamento: '营业额',
    },
    colheitas: {
      registrar: '登记收成',
      data: '日期',
      quantidade: '数量',
      observacao: '备注',
      salvar: '保存',
      excluir: '删除',
      nenhuma: '暂无收成记录。',
    },
    vendas: {
      registrar: '登记销售',
      data: '日期',
      quantidade: '数量',
      preco: '单价 (R$)',
      cliente: '客户',
      salvar: '保存',
      excluir: '删除',
      quantidadeAbrev: '数量',
      precoAbrev: '单价',
      total: '总计',
      nenhuma: '暂无销售记录。',
    },
    erros: {
      'Usuário ou senha inválidos': '用户名或密码无效',
      'Informe a data e uma quantidade maior que zero': '请输入日期和大于零的数量',
      'Colheita não encontrada': '未找到收成记录',
      'Não é possível excluir: os abacaxis desta colheita já foram vendidos':
        '无法删除：这批收成的菠萝已售出',
      'Informe data, quantidade e preço maiores que zero': '请输入日期以及大于零的数量和价格',
      'Venda não encontrada': '未找到销售记录',
      'Token não informado': '未提供身份验证令牌',
      'Token inválido ou expirado': '身份验证令牌无效或已过期',
      'Erro interno no servidor': '服务器内部错误',
      'Failed to fetch': '无法连接到 API',
    },
    estoqueInsuficiente: (quantidade) => `库存不足。可用数量：${quantidade}`,
  },
};

const IdiomaContexto = createContext(null);

function obterIdiomaSalvo() {
  const salvo = localStorage.getItem(CHAVE_IDIOMA);
  return Object.hasOwn(TRADUCOES, salvo) ? salvo : IDIOMA_PADRAO;
}

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState(obterIdiomaSalvo);

  useEffect(() => {
    document.documentElement.lang = { pt: 'pt-BR', en: 'en', zh: 'zh-CN' }[idioma];
  }, [idioma]);

  function alterarIdioma(novoIdioma) {
    if (!Object.hasOwn(TRADUCOES, novoIdioma)) return;
    localStorage.setItem(CHAVE_IDIOMA, novoIdioma);
    setIdioma(novoIdioma);
  }

  const valor = useMemo(() => ({
    idioma,
    alterarIdioma,
    t: TRADUCOES[idioma],
    formatarData: (data) => new Date(`${data}T00:00:00`).toLocaleDateString(
      { pt: 'pt-BR', en: 'en-US', zh: 'zh-CN' }[idioma]
    ),
    formatarReais: (valor) => Number(valor).toLocaleString(
      { pt: 'pt-BR', en: 'en-US', zh: 'zh-CN' }[idioma],
      { style: 'currency', currency: 'BRL' }
    ),
    traduzirErro: (mensagem) => {
      const correspondenciaEstoque = mensagem.match(/^Estoque insuficiente\. Disponível: (.+)$/);
      if (correspondenciaEstoque) return TRADUCOES[idioma].estoqueInsuficiente(correspondenciaEstoque[1]);
      return TRADUCOES[idioma].erros[mensagem] || mensagem;
    },
  }), [idioma]);

  return <IdiomaContexto.Provider value={valor}>{children}</IdiomaContexto.Provider>;
}

export function useIdioma() {
  const contexto = useContext(IdiomaContexto);
  if (!contexto) throw new Error('useIdioma deve ser usado dentro de IdiomaProvider');
  return contexto;
}

export function SeletorIdioma() {
  const { idioma, alterarIdioma, t } = useIdioma();
  const bandeiras = {
    pt: (
      <svg viewBox="0 0 36 24">
        <rect width="36" height="24" fill="#009b3a" />
        <path d="M18 3 33 12 18 21 3 12Z" fill="#ffdf00" />
        <circle cx="18" cy="12" r="5.7" fill="#002776" />
      </svg>
    ),
    en: (
      <svg viewBox="0 0 36 24">
        <rect width="36" height="24" fill="#012169" />
        <path d="m0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5" />
        <path d="m0 0 36 24M36 0 0 24" stroke="#c8102e" strokeWidth="2" />
        <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="8" />
        <path d="M18 0v24M0 12h36" stroke="#c8102e" strokeWidth="4" />
      </svg>
    ),
    zh: (
      <svg viewBox="0 0 36 24">
        <rect width="36" height="24" fill="#de2910" />
        <path d="m8 3 1.2 3.7H13l-3.1 2.2 1.2 3.7L8 10.3l-3.1 2.3 1.2-3.7L3 6.7h3.8Z" fill="#ffde00" />
        <path d="m16 3 0.6 1.8 1.9-.1-1.5 1.1.6 1.8-1.6-1.1-1.5 1.1.5-1.8-1.5-1.1 1.9.1Z" fill="#ffde00" />
        <path d="m20 6 0.6 1.8 1.9-.1L21 8.8l.6 1.8L20 9.5l-1.5 1.1.5-1.8-1.5-1.1 1.9.1Z" fill="#ffde00" />
        <path d="m20 11 0.6 1.8 1.9-.1-1.5 1.1.6 1.8-1.6-1.1-1.5 1.1.5-1.8-1.5-1.1 1.9.1Z" fill="#ffde00" />
        <path d="m16 15 0.6 1.8 1.9-.1-1.5 1.1.6 1.8-1.6-1.1-1.5 1.1.5-1.8-1.5-1.1 1.9.1Z" fill="#ffde00" />
      </svg>
    ),
  };

  return (
    <div className="seletor-idioma" role="group" aria-label={t.idioma}>
      {Object.entries(bandeiras).map(([codigo, bandeira]) => (
        <button
          key={codigo}
          type="button"
          className={idioma === codigo ? 'idioma-ativo' : ''}
          aria-label={t.idiomas[codigo]}
          aria-pressed={idioma === codigo}
          title={t.idiomas[codigo]}
          onClick={() => alterarIdioma(codigo)}
        >
          <span aria-hidden="true" className="icone-bandeira">{bandeira}</span>
        </button>
      ))}
    </div>
  );
}
