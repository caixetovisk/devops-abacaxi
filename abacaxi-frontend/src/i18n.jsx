import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const IDIOMAS = {
  pt: { locale: 'pt-BR', nome: 'Português' },
  en: { locale: 'en-US', nome: 'English' },
  zh: { locale: 'zh-CN', nome: '中文' },
};

const TRADUCOES = {
  pt: {
    appName: 'Fazenda de Abacaxis',
    dashboard: 'Painel',
    harvests: 'Colheitas',
    sales: 'Vendas',
    logout: 'Sair',
    username: 'Usuário',
    password: 'Senha',
    login: 'Entrar',
    loggingIn: 'Entrando...',
    apiUnavailable: 'Não foi possível conectar à API',
    renderSleepTip: 'No plano gratuito do Render a API pode levar até 1 minuto para "acordar".',
    loading: 'Carregando...',
    totalHarvested: 'Total colhido',
    totalSold: 'Total vendido',
    inStock: 'Em estoque',
    revenue: 'Faturamento',
    registerHarvest: 'Registrar colheita',
    date: 'Data',
    quantity: 'Quantidade',
    observation: 'Observação',
    save: 'Salvar',
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
    invalidSale: 'Informe data, quantidade e preço maiores que zero',
    invalidHarvest: 'Informe a data e uma quantidade maior que zero',
    insufficientStock: 'Estoque insuficiente. Disponível: {quantity}',
    harvestAlreadySold: 'Não é possível excluir: os abacaxis desta colheita já foram vendidos',
    harvestNotFound: 'Colheita não encontrada',
    saleNotFound: 'Venda não encontrada',
    serverError: 'Erro interno no servidor',
    genericError: 'Erro na requisição',
  },
  en: {
    appName: 'Pineapple Farm',
    dashboard: 'Dashboard',
    harvests: 'Harvests',
    sales: 'Sales',
    logout: 'Log out',
    username: 'Username',
    password: 'Password',
    login: 'Log in',
    loggingIn: 'Logging in...',
    apiUnavailable: 'Could not connect to the API',
    renderSleepTip: 'On Render’s free plan, the API may take up to 1 minute to wake up.',
    loading: 'Loading...',
    totalHarvested: 'Total harvested',
    totalSold: 'Total sold',
    inStock: 'In stock',
    revenue: 'Revenue',
    registerHarvest: 'Register harvest',
    date: 'Date',
    quantity: 'Quantity',
    observation: 'Notes',
    save: 'Save',
    delete: 'Delete',
    noHarvests: 'No harvests registered.',
    registerSale: 'Register sale',
    unitPrice: 'Unit price (R$)',
    customer: 'Customer',
    abbreviatedQuantity: 'Qty.',
    abbreviatedUnitPrice: 'Unit price',
    total: 'Total',
    noSales: 'No sales registered.',
    invalidCredentials: 'Invalid username or password',
    invalidSale: 'Enter a date, quantity, and price greater than zero',
    invalidHarvest: 'Enter a date and a quantity greater than zero',
    insufficientStock: 'Insufficient stock. Available: {quantity}',
    harvestAlreadySold: 'Cannot delete: pineapples from this harvest have already been sold',
    harvestNotFound: 'Harvest not found',
    saleNotFound: 'Sale not found',
    serverError: 'Internal server error',
    genericError: 'Request failed',
  },
  zh: {
    appName: '菠萝农场',
    dashboard: '仪表盘',
    harvests: '收获记录',
    sales: '销售记录',
    logout: '退出',
    username: '用户名',
    password: '密码',
    login: '登录',
    loggingIn: '正在登录...',
    apiUnavailable: '无法连接到 API',
    renderSleepTip: 'Render 免费计划中的 API 可能需要最多 1 分钟才能唤醒。',
    loading: '正在加载...',
    totalHarvested: '收获总量',
    totalSold: '销售总量',
    inStock: '库存',
    revenue: '销售额',
    registerHarvest: '登记收获',
    date: '日期',
    quantity: '数量',
    observation: '备注',
    save: '保存',
    delete: '删除',
    noHarvests: '暂无收获记录。',
    registerSale: '登记销售',
    unitPrice: '单价（巴西雷亚尔）',
    customer: '客户',
    abbreviatedQuantity: '数量',
    abbreviatedUnitPrice: '单价',
    total: '总计',
    noSales: '暂无销售记录。',
    invalidCredentials: '用户名或密码无效',
    invalidSale: '请输入日期、数量和大于零的价格',
    invalidHarvest: '请输入日期和大于零的数量',
    insufficientStock: '库存不足。可用数量：{quantity}',
    harvestAlreadySold: '无法删除：这批收获的菠萝已经售出',
    harvestNotFound: '未找到收获记录',
    saleNotFound: '未找到销售记录',
    serverError: '服务器内部错误',
    genericError: '请求失败',
  },
};

const ERROS_API = {
  'Usuário ou senha inválidos': 'invalidCredentials',
  'Informe data, quantidade e preço maiores que zero': 'invalidSale',
  'Informe a data e uma quantidade maior que zero': 'invalidHarvest',
  'Não é possível excluir: os abacaxis desta colheita já foram vendidos': 'harvestAlreadySold',
  'Colheita não encontrada': 'harvestNotFound',
  'Venda não encontrada': 'saleNotFound',
  'Erro interno no servidor': 'serverError',
  'Erro na requisição': 'genericError',
};

const IdiomaContexto = createContext(null);

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState(() => {
    const salvo = localStorage.getItem('idioma');
    return Object.hasOwn(IDIOMAS, salvo) ? salvo : 'pt';
  });

  useEffect(() => {
    localStorage.setItem('idioma', idioma);
    document.documentElement.lang = IDIOMAS[idioma].locale;
    document.title = TRADUCOES[idioma].appName;
  }, [idioma]);

  const valor = useMemo(() => {
    const t = (chave) => TRADUCOES[idioma][chave];
    const formatarData = (data) => {
      const [ano, mes, dia] = data.split('-').map(Number);
      return new Intl.DateTimeFormat(IDIOMAS[idioma].locale).format(new Date(ano, mes - 1, dia));
    };
    const formatarReais = (valor) =>
      Number(valor).toLocaleString(IDIOMAS[idioma].locale, { style: 'currency', currency: 'BRL' });
    const traduzirErro = (mensagem) => {
      if (mensagem === 'Failed to fetch') return t('apiUnavailable');

      const erroEstoque = mensagem.match(/^Estoque insuficiente\. Disponível: (.+)$/);
      if (erroEstoque) return t('insufficientStock').replace('{quantity}', erroEstoque[1]);

      const chave = ERROS_API[mensagem];
      return chave ? t(chave) : mensagem;
    };

    return { idioma, setIdioma, t, formatarData, formatarReais, traduzirErro };
  }, [idioma]);

  return <IdiomaContexto.Provider value={valor}>{children}</IdiomaContexto.Provider>;
}

export function useIdioma() {
  const contexto = useContext(IdiomaContexto);
  if (!contexto) throw new Error('useIdioma deve ser usado dentro de IdiomaProvider');
  return contexto;
}

function IconeIdioma() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function Bandeira({ idioma }) {
  if (idioma === 'pt') {
    return (
      <svg viewBox="0 0 24 16" aria-hidden="true">
        <rect width="24" height="16" fill="#009b3a" />
        <path d="m12 2 9 6-9 6-9-6z" fill="#ffdf00" />
        <circle cx="12" cy="8" r="3.2" fill="#002776" />
      </svg>
    );
  }

  if (idioma === 'en') {
    return (
      <svg viewBox="0 0 24 16" aria-hidden="true">
        <rect width="24" height="16" fill="#fff" />
        <path d="M0 0h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0z" fill="#b22234" />
        <path d="M0 0h11v9H0z" fill="#3c3b6e" />
        <path d="m2 2 .3.8h.8l-.7.5.3.8-.7-.5-.7.5.3-.8-.7-.5h.8zM6 2l.3.8h.8l-.7.5.3.8-.7-.5-.7.5.3-.8-.7-.5h.8zM4 5l.3.8h.8l-.7.5.3.8-.7-.5-.7.5.3-.8-.7-.5h.8zM8 5l.3.8h.8l-.7.5.3.8-.7-.5-.7.5.3-.8-.7-.5h.8z" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#de2910" />
      <path d="m5 2 .8 2.2h2.3L6.2 5.5 7 7.7 5 6.3 3 7.7l.8-2.2L2 4.2h2.2z" fill="#ffde00" />
      <circle cx="10" cy="2.8" r=".7" fill="#ffde00" />
      <circle cx="12" cy="4.3" r=".7" fill="#ffde00" />
      <circle cx="12" cy="6.5" r=".7" fill="#ffde00" />
      <circle cx="10" cy="8" r=".7" fill="#ffde00" />
    </svg>
  );
}

export function SeletorIdioma() {
  const { idioma, setIdioma } = useIdioma();
  const seletorRef = useRef(null);
  const atual = IDIOMAS[idioma];

  return (
    <details className="seletor-idioma" ref={seletorRef}>
      <summary aria-label={`Idioma: ${atual.nome}`} title={`Idioma: ${atual.nome}`}>
        <IconeIdioma />
      </summary>
      <div className="menu-idiomas" role="group" aria-label="Idiomas">
        {Object.entries(IDIOMAS).map(([codigo, item]) => (
          <button
            key={codigo}
            type="button"
            className={idioma === codigo ? 'idioma-ativo' : ''}
            aria-pressed={idioma === codigo}
            onClick={() => {
              setIdioma(codigo);
              seletorRef.current?.removeAttribute('open');
            }}
          >
            <Bandeira idioma={codigo} />
            <span>{item.nome}</span>
          </button>
        ))}
      </div>
    </details>
  );
}
