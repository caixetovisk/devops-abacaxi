import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_KEY = 'idioma';
const SUPPORTED_LANGUAGES = ['pt', 'en', 'zh'];

const translations = {
  pt: {
    brand: 'Fazenda de Abacaxis',
    selectLanguage: 'Selecionar idioma',
    dashboard: 'Painel',
    harvests: 'Colheitas',
    sales: 'Vendas',
    logout: 'Sair',
    login: 'Entrar',
    loggingIn: 'Entrando...',
    username: 'Usuário',
    password: 'Senha',
    renderWakeup: 'No plano gratuito do Render a API pode levar até 1 minuto para "acordar".',
    totalHarvested: 'Total colhido',
    totalSold: 'Total vendido',
    inStock: 'Em estoque',
    revenue: 'Faturamento',
    loading: 'Carregando...',
    registerHarvest: 'Registrar colheita',
    date: 'Data',
    quantity: 'Quantidade',
    observation: 'Observação',
    save: 'Salvar',
    harvestTableObservation: 'Observação',
    delete: 'Excluir',
    noHarvests: 'Nenhuma colheita registrada.',
    registerSale: 'Registrar venda',
    unitPrice: 'Preço unitário (R$)',
    customer: 'Cliente',
    abbreviatedQuantity: 'Qtd.',
    abbreviatedUnitPrice: 'Preço un.',
    total: 'Total',
    noSales: 'Nenhuma venda registrada.',
    invalidCredentials: 'Usuário ou senha inválidos',
    apiConnectionError: 'Não foi possível conectar à API. Verifique se o backend está em execução e se VITE_API_URL está correto.',
    harvestValidationError: 'Informe a data e uma quantidade maior que zero',
    saleValidationError: 'Informe data, quantidade e preço maiores que zero',
    insufficientStock: (available) => `Estoque insuficiente. Disponível: ${available}`,
    harvestAlreadySold: 'Não é possível excluir: os abacaxis desta colheita já foram vendidos',
    harvestNotFound: 'Colheita não encontrada',
    saleNotFound: 'Venda não encontrada',
    tokenMissing: 'Token não informado',
    tokenInvalid: 'Token inválido ou expirado',
    serverError: 'Erro interno no servidor',
    requestError: 'Erro na requisição',
  },
  en: {
    brand: 'Pineapple Farm',
    selectLanguage: 'Select language',
    dashboard: 'Dashboard',
    harvests: 'Harvests',
    sales: 'Sales',
    logout: 'Log out',
    login: 'Log in',
    loggingIn: 'Logging in...',
    username: 'Username',
    password: 'Password',
    renderWakeup: 'On Render’s free plan, the API may take up to 1 minute to wake up.',
    totalHarvested: 'Total harvested',
    totalSold: 'Total sold',
    inStock: 'In stock',
    revenue: 'Revenue',
    loading: 'Loading...',
    registerHarvest: 'Record harvest',
    date: 'Date',
    quantity: 'Quantity',
    observation: 'Notes',
    save: 'Save',
    harvestTableObservation: 'Notes',
    delete: 'Delete',
    noHarvests: 'No harvests recorded.',
    registerSale: 'Record sale',
    unitPrice: 'Unit price (BRL)',
    customer: 'Customer',
    abbreviatedQuantity: 'Qty.',
    abbreviatedUnitPrice: 'Unit price',
    total: 'Total',
    noSales: 'No sales recorded.',
    invalidCredentials: 'Invalid username or password',
    apiConnectionError: 'Could not connect to the API. Check that the backend is running and VITE_API_URL is correct.',
    harvestValidationError: 'Enter a date and a quantity greater than zero',
    saleValidationError: 'Enter a date, quantity, and price greater than zero',
    insufficientStock: (available) => `Insufficient stock. Available: ${available}`,
    harvestAlreadySold: 'Cannot delete: the pineapples from this harvest have already been sold',
    harvestNotFound: 'Harvest not found',
    saleNotFound: 'Sale not found',
    tokenMissing: 'Token not provided',
    tokenInvalid: 'Token is invalid or has expired',
    serverError: 'Internal server error',
    requestError: 'Request error',
  },
  zh: {
    brand: '菠萝农场',
    selectLanguage: '选择语言',
    dashboard: '仪表板',
    harvests: '采收记录',
    sales: '销售记录',
    logout: '退出登录',
    login: '登录',
    loggingIn: '正在登录...',
    username: '用户名',
    password: '密码',
    renderWakeup: 'Render 免费方案中的 API 可能需要最多 1 分钟才能唤醒。',
    totalHarvested: '采收总量',
    totalSold: '销售总量',
    inStock: '库存',
    revenue: '营业额',
    loading: '加载中...',
    registerHarvest: '登记采收',
    date: '日期',
    quantity: '数量',
    observation: '备注',
    save: '保存',
    harvestTableObservation: '备注',
    delete: '删除',
    noHarvests: '暂无采收记录。',
    registerSale: '登记销售',
    unitPrice: '单价（巴西雷亚尔）',
    customer: '客户',
    abbreviatedQuantity: '数量',
    abbreviatedUnitPrice: '单价',
    total: '总计',
    noSales: '暂无销售记录。',
    invalidCredentials: '用户名或密码错误',
    apiConnectionError: '无法连接到 API。请检查后端是否正在运行，以及 VITE_API_URL 是否正确。',
    harvestValidationError: '请输入日期和大于零的数量',
    saleValidationError: '请输入日期、大于零的数量和价格',
    insufficientStock: (available) => `库存不足。可用数量：${available}`,
    harvestAlreadySold: '无法删除：这批采收的菠萝已售出',
    harvestNotFound: '未找到采收记录',
    saleNotFound: '未找到销售记录',
    tokenMissing: '未提供令牌',
    tokenInvalid: '令牌无效或已过期',
    serverError: '服务器内部错误',
    requestError: '请求错误',
  },
};

const apiErrorKeys = {
  'Usuário ou senha inválidos': 'invalidCredentials',
  'Não foi possível conectar à API': 'apiConnectionError',
  'Informe a data e uma quantidade maior que zero': 'harvestValidationError',
  'Informe data, quantidade e preço maiores que zero': 'saleValidationError',
  'Não é possível excluir: os abacaxis desta colheita já foram vendidos': 'harvestAlreadySold',
  'Colheita não encontrada': 'harvestNotFound',
  'Venda não encontrada': 'saleNotFound',
  'Token não informado': 'tokenMissing',
  'Token inválido ou expirado': 'tokenInvalid',
  'Erro interno no servidor': 'serverError',
  'Erro na requisição': 'requestError',
  'Failed to fetch': 'apiConnectionError',
};

const LanguageContext = createContext(null);

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : 'pt';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);
  const locale = { pt: 'pt-BR', en: 'en-US', zh: 'zh-CN' }[language];
  const value = useMemo(() => {
    const t = (key) => translations[language][key];
    const translateError = (message) => {
      if (message.startsWith('Estoque insuficiente. Disponível: ')) {
        return t('insufficientStock')(message.slice('Estoque insuficiente. Disponível: '.length));
      }
      const key = apiErrorKeys[message];
      return key ? t(key) : message;
    };

    return {
      language,
      locale,
      t,
      translateError,
      setLanguage(nextLanguage) {
        if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) {
          throw new Error(`Unsupported language: ${nextLanguage}`);
        }
        localStorage.setItem(LANGUAGE_KEY, nextLanguage);
        setLanguageState(nextLanguage);
      },
    };
  }, [language, locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translations[language].brand;
  }, [language, locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

export function LanguageSelector({ className = '' }) {
  const { language, setLanguage, t } = useLanguage();
  const options = [
    { code: 'pt', flag: '🇧🇷', label: 'Português' },
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'zh', flag: '🇨🇳', label: '中文' },
  ];

  return (
    <nav className={`language-selector ${className}`} aria-label={t('selectLanguage')}>
      {options.map(({ code, flag, label }) => (
        <button
          key={code}
          type="button"
          aria-label={label}
          aria-pressed={language === code}
          title={label}
          onClick={() => setLanguage(code)}
        >
          <span aria-hidden="true">{flag}</span>
        </button>
      ))}
    </nav>
  );
}
