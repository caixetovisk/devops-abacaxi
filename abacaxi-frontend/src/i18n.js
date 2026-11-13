export const LANG_OPTIONS = ['pt', 'en', 'zh'];

export const translations = {
  pt: {
    nav: { painel: 'Painel', colheitas: 'Colheitas', vendas: 'Vendas' },
    header: { logout: 'Sair' },
    login: {
      title: '🍍 Fazenda de Abacaxis',
      user: 'Usuário',
      password: 'Senha',
      enter: 'Entrar',
      entering: 'Entrando...',
      renderDelay: 'No plano gratuito do Render a API pode levar até 1 minuto para "acordar".',
      connectionError: 'Não foi possível conectar à API',
    },
    errors: {
      invalidCredentials: 'Usuário ou senha inválidos',
      harvestInput: 'Informe a data e uma quantidade maior que zero',
      harvestNotFound: 'Colheita não encontrada',
      harvestAlreadySold: 'Não é possível excluir: os abacaxis desta colheita já foram vendidos',
      saleInput: 'Informe data, quantidade e preço maiores que zero',
      insufficientStock: 'Estoque insuficiente. Disponível: {quantidade}',
      saleNotFound: 'Venda não encontrada',
      tokenMissing: 'Token não informado',
      tokenInvalid: 'Token inválido ou expirado',
      server: 'Erro interno no servidor',
      request: 'Erro na requisição',
    },
    dashboard: {
      totalHarvested: 'Total colhido',
      totalSold: 'Total vendido',
      inStock: 'Em estoque',
      revenue: 'Faturamento',
      loading: 'Carregando...',
    },
    form: {
      date: 'Data',
      quantity: 'Quantidade',
      observation: 'Observação',
      priceUnit: 'Preço unitário (R$)',
      customer: 'Cliente',
      save: 'Salvar',
      delete: 'Excluir',
      registerHarvest: 'Registrar colheita',
      registerSale: 'Registrar venda',
    },
    table: {
      noHarvests: 'Nenhuma colheita registrada.',
      noSales: 'Nenhuma venda registrada.',
      qtyShort: 'Qty.',
      priceUnitShort: 'Preço unitário',
      total: 'Total',
    },
  },
  en: {
    nav: { painel: 'Dashboard', colheitas: 'Harvests', vendas: 'Sales' },
    header: { logout: 'Logout' },
    login: {
      title: '🍍 Pineapple Farm',
      user: 'Username',
      password: 'Password',
      enter: 'Sign in',
      entering: 'Signing in...',
      renderDelay: 'On Render free plan, the API may take up to 1 minute to "wake up".',
      connectionError: 'Unable to connect to the API',
    },
    errors: {
      invalidCredentials: 'Invalid username or password',
      harvestInput: 'Enter a date and a quantity greater than zero',
      harvestNotFound: 'Harvest not found',
      harvestAlreadySold: 'Cannot delete: pineapples from this harvest have already been sold',
      saleInput: 'Enter a date, quantity, and price greater than zero',
      insufficientStock: 'Insufficient stock. Available: {quantidade}',
      saleNotFound: 'Sale not found',
      tokenMissing: 'Token not provided',
      tokenInvalid: 'Invalid or expired token',
      server: 'Internal server error',
      request: 'Request failed',
    },
    dashboard: {
      totalHarvested: 'Total harvested',
      totalSold: 'Total sold',
      inStock: 'In stock',
      revenue: 'Revenue',
      loading: 'Loading...',
    },
    form: {
      date: 'Date',
      quantity: 'Quantity',
      observation: 'Observation',
      priceUnit: 'Unit price (R$)',
      customer: 'Customer',
      save: 'Save',
      delete: 'Delete',
      registerHarvest: 'Register harvest',
      registerSale: 'Register sale',
    },
    table: {
      noHarvests: 'No harvests registered.',
      noSales: 'No sales registered.',
      qtyShort: 'Qty.',
      priceUnitShort: 'Unit price',
      total: 'Total',
    },
  },
  zh: {
    nav: { painel: '控制面板', colheitas: '收成', vendas: '销售' },
    header: { logout: '退出' },
    login: {
      title: '🍍 凤梨农场',
      user: '用户名',
      password: '密码',
      enter: '登录',
      entering: '登录中...',
      renderDelay: '在 Render 的免费计划上，API 可能需要长达 1 分钟才能“唤醒”。',
      connectionError: '无法连接到 API',
    },
    errors: {
      invalidCredentials: '用户名或密码无效',
      harvestInput: '请输入日期和大于零的数量',
      harvestNotFound: '未找到收成记录',
      harvestAlreadySold: '无法删除：该批收成中的凤梨已售出',
      saleInput: '请输入日期、大于零的数量和价格',
      insufficientStock: '库存不足。可用数量：{quantidade}',
      saleNotFound: '未找到销售记录',
      tokenMissing: '未提供令牌',
      tokenInvalid: '令牌无效或已过期',
      server: '服务器内部错误',
      request: '请求失败',
    },
    dashboard: {
      totalHarvested: '总收成',
      totalSold: '总销量',
      inStock: '库存',
      revenue: '收入',
      loading: '加载中...',
    },
    form: {
      date: '日期',
      quantity: '数量',
      observation: '备注',
      priceUnit: '单价 (R$)',
      customer: '客户',
      save: '保存',
      delete: '删除',
      registerHarvest: '登记收成',
      registerSale: '登记销售',
    },
    table: {
      noHarvests: '暂无收成记录。',
      noSales: '暂无销售记录。',
      qtyShort: '数量',
      priceUnitShort: '单价',
      total: '总计',
    },
  },
};

export function getPreferredLanguage() {
  const saved = localStorage.getItem('lang');
  return LANG_OPTIONS.includes(saved) ? saved : 'pt';
}

export function getFlag(code) {
  const flags = { pt: '🇧🇷', en: '🇺🇸', zh: '🇨🇳' };
  return flags[code] || '🇧🇷';
}

export function t(lang, key) {
  const path = key.split('.');
  const bundle = translations[lang] || translations.pt;
  let value = bundle;

  for (const part of path) {
    value = value?.[part];
    if (value === undefined) return translations.pt[key] ?? key;
  }

  return value;
}

const API_ERROR_KEYS = {
  'Usuário ou senha inválidos': 'errors.invalidCredentials',
  'Informe a data e uma quantidade maior que zero': 'errors.harvestInput',
  'Colheita não encontrada': 'errors.harvestNotFound',
  'Não é possível excluir: os abacaxis desta colheita já foram vendidos': 'errors.harvestAlreadySold',
  'Informe data, quantidade e preço maiores que zero': 'errors.saleInput',
  'Venda não encontrada': 'errors.saleNotFound',
  'Token não informado': 'errors.tokenMissing',
  'Token inválido ou expirado': 'errors.tokenInvalid',
  'Erro interno no servidor': 'errors.server',
  'Erro na requisição': 'errors.request',
};

export function traduzirErro(lang, mensagem) {
  if (mensagem === 'Failed to fetch') return t(lang, 'login.connectionError');

  const estoqueInsuficiente = /^Estoque insuficiente\. Disponível: (.+)$/.exec(mensagem);
  if (estoqueInsuficiente) {
    return t(lang, 'errors.insufficientStock').replace('{quantidade}', estoqueInsuficiente[1]);
  }

  const chave = API_ERROR_KEYS[mensagem];
  return chave ? t(lang, chave) : mensagem;
}
