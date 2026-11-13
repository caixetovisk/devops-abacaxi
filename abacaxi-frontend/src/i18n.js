export const IDIOMA_PADRAO = 'pt';
export const CHAVE_IDIOMA = 'idioma';

const TRADUCOES = {
  pt: {
    language: 'Idioma',
    languageNames: { pt: 'Português', en: 'Inglês', zh: 'Chinês' },
    appName: 'Fazenda de Abacaxis',
    pages: { painel: 'Painel', colheitas: 'Colheitas', vendas: 'Vendas' },
    logout: 'Sair',
    login: {
      username: 'Usuário',
      password: 'Senha',
      submit: 'Entrar',
      submitting: 'Entrando...',
      renderTip: 'No plano gratuito do Render a API pode levar até 1 minuto para "acordar".',
    },
    dashboard: {
      loading: 'Carregando...',
      harvested: 'Total colhido',
      sold: 'Total vendido',
      stock: 'Em estoque',
      revenue: 'Faturamento',
    },
    harvests: {
      title: 'Registrar colheita',
      date: 'Data',
      quantity: 'Quantidade',
      notes: 'Observação',
      save: 'Salvar',
      customer: 'Cliente',
      delete: 'Excluir',
      empty: 'Nenhuma colheita registrada.',
    },
    sales: {
      title: 'Registrar venda',
      date: 'Data',
      customer: 'Cliente',
      quantity: 'Qtd.',
      unitPrice: 'Preço unitário (USD)',
      total: 'Total',
      save: 'Salvar',
      delete: 'Excluir',
      empty: 'Nenhuma venda registrada.',
    },
  },
  en: {
    language: 'Language',
    languageNames: { pt: 'Portuguese', en: 'English', zh: 'Chinese' },
    appName: 'Pineapple Farm',
    pages: { painel: 'Dashboard', colheitas: 'Harvests', vendas: 'Sales' },
    logout: 'Log out',
    login: {
      username: 'Username',
      password: 'Password',
      submit: 'Sign in',
      submitting: 'Signing in...',
      renderTip: 'On Render’s free plan, the API may take up to 1 minute to wake up.',
    },
    dashboard: {
      loading: 'Loading...',
      harvested: 'Total harvested',
      sold: 'Total sold',
      stock: 'In stock',
      revenue: 'Revenue',
    },
    harvests: {
      title: 'Record harvest',
      date: 'Date',
      quantity: 'Quantity',
      notes: 'Notes',
      save: 'Save',
      customer: 'Customer',
      delete: 'Delete',
      empty: 'No harvests recorded.',
    },
    sales: {
      title: 'Record sale',
      date: 'Date',
      customer: 'Customer',
      quantity: 'Qty.',
      unitPrice: 'Unit price (USD)',
      total: 'Total',
      save: 'Save',
      delete: 'Delete',
      empty: 'No sales recorded.',
    },
  },
  zh: {
    language: '语言',
    languageNames: { pt: '葡萄牙语', en: '英语', zh: '中文' },
    appName: '菠萝农场',
    pages: { painel: '仪表盘', colheitas: '采收记录', vendas: '销售记录' },
    logout: '退出',
    login: {
      username: '用户名',
      password: '密码',
      submit: '登录',
      submitting: '正在登录…',
      renderTip: 'Render 免费方案中的 API 唤醒可能需要最多 1 分钟。',
    },
    dashboard: {
      loading: '加载中…',
      harvested: '采收总量',
      sold: '销售总量',
      stock: '库存',
      revenue: '销售额',
    },
    harvests: {
      title: '登记采收',
      date: '日期',
      quantity: '数量',
      notes: '备注',
      save: '保存',
      customer: '客户',
      delete: '删除',
      empty: '暂无采收记录。',
    },
    sales: {
      title: '登记销售',
      date: '日期',
      customer: '客户',
      quantity: '数量',
      unitPrice: '单价（美元 USD）',
      total: '总计',
      save: '保存',
      delete: '删除',
      empty: '暂无销售记录。',
    },
  },
};

const ERROS = {
  'Failed to fetch': {
    pt: 'Não foi possível conectar à API',
    en: 'Could not connect to the API',
    zh: '无法连接到 API',
  },
  'Usuário ou senha inválidos': {
    en: 'Invalid username or password',
    zh: '用户名或密码无效',
  },
  'Não foi possível conectar à API': {
    en: 'Could not connect to the API',
    zh: '无法连接到 API',
  },
  'Erro na requisição': {
    en: 'Request failed',
    zh: '请求失败',
  },
  'Erro interno no servidor': {
    en: 'Internal server error',
    zh: '服务器内部错误',
  },
  'Informe a data e uma quantidade maior que zero': {
    en: 'Enter a date and a quantity greater than zero',
    zh: '请输入日期和大于零的数量',
  },
  'Não é possível excluir: os abacaxis desta colheita já foram vendidos': {
    en: 'Cannot delete: pineapples from this harvest have already been sold',
    zh: '无法删除：这批采收的菠萝已售出',
  },
  'Informe data, quantidade e preço maiores que zero': {
    en: 'Enter a date, quantity, and price greater than zero',
    zh: '请输入日期、大于零的数量和价格',
  },
  'Colheita não encontrada': {
    en: 'Harvest not found',
    zh: '未找到采收记录',
  },
  'Venda não encontrada': {
    en: 'Sale not found',
    zh: '未找到销售记录',
  },
};

export function idiomaSalvo() {
  const idioma = localStorage.getItem(CHAVE_IDIOMA);
  return Object.hasOwn(TRADUCOES, idioma) ? idioma : IDIOMA_PADRAO;
}

export function traduzir(idioma, chave) {
  return chave.split('.').reduce((valor, parte) => valor?.[parte], TRADUCOES[idioma]) ?? chave;
}

export function traduzirErro(mensagem, idioma) {
  const erro = ERROS[mensagem];
  if (erro) return erro[idioma] || mensagem;

  const estoque = mensagem.match(/^Estoque insuficiente\. Disponível: (.+)$/);
  if (estoque) {
    const quantidade = Number(estoque[1]);
    const disponivel = Number.isNaN(quantidade) ? estoque[1] : formatarNumero(quantidade, idioma);
    if (idioma === 'en') return `Insufficient stock. Available: ${disponivel}`;
    if (idioma === 'zh') return `库存不足。可用数量：${disponivel}`;
  }

  return mensagem;
}

export function formatarNumero(valor, idioma) {
  return new Intl.NumberFormat({ pt: 'pt-BR', en: 'en-US', zh: 'zh-CN' }[idioma])
    .format(Number(valor));
}

export function formatarData(data, idioma) {
  const [ano, mes, dia] = data.split('-').map(Number);
  return new Intl.DateTimeFormat(
    { pt: 'pt-BR', en: 'en-US', zh: 'zh-CN' }[idioma],
    { dateStyle: 'short' }
  ).format(new Date(ano, mes - 1, dia));
}

export function formatarMoeda(valor, idioma) {
  return new Intl.NumberFormat(
    { pt: 'pt-BR', en: 'en-US', zh: 'zh-CN' }[idioma],
    { style: 'currency', currency: 'USD' }
  ).format(Number(valor));
}
