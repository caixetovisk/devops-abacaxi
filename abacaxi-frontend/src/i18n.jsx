import { createContext, useContext, useEffect, useState } from 'react';

const IDIOMA_PADRAO = 'pt-BR';
const CHAVE_IDIOMA = 'idioma';

export const IDIOMAS = [
  { codigo: 'pt-BR', nome: 'Português' },
  { codigo: 'en-US', nome: 'English' },
  { codigo: 'zh-CN', nome: '简体中文' },
];

const mensagens = {
  'pt-BR': {
    'app.name': 'Fazenda de Abacaxis',
    'nav.dashboard': 'Painel',
    'nav.harvests': 'Colheitas',
    'nav.sales': 'Vendas',
    'nav.logout': 'Sair',
    'language.select': 'Selecionar idioma',
    'login.username': 'Usuário',
    'login.password': 'Senha',
    'login.signIn': 'Entrar',
    'login.signingIn': 'Entrando...',
    'login.wakeMessage': 'No plano gratuito do Render a API pode levar até 1 minuto para "acordar".',
    'common.loading': 'Carregando...',
    'common.save': 'Salvar',
    'common.delete': 'Excluir',
    'common.date': 'Data',
    'common.quantity': 'Quantidade',
    'common.client': 'Cliente',
    'common.total': 'Total',
    'common.unitPrice': 'Preço un.',
    'common.emptyHarvests': 'Nenhuma colheita registrada.',
    'common.emptySales': 'Nenhuma venda registrada.',
    'dashboard.harvested': 'Total colhido',
    'dashboard.sold': 'Total vendido',
    'dashboard.stock': 'Em estoque',
    'dashboard.revenue': 'Faturamento',
    'harvest.title': 'Registrar colheita',
    'harvest.observation': 'Observação',
    'sale.title': 'Registrar venda',
    'sale.unitPrice': 'Preço unitário (R$)',
    'error.network': 'Não foi possível conectar à API',
    'error.invalidCredentials': 'Usuário ou senha inválidos',
    'error.internal': 'Erro interno no servidor',
    'error.request': 'Erro na requisição',
    'error.harvestValidation': 'Informe a data e uma quantidade maior que zero',
    'error.harvestNotFound': 'Colheita não encontrada',
    'error.harvestAlreadySold': 'Não é possível excluir: os abacaxis desta colheita já foram vendidos',
    'error.saleValidation': 'Informe data, quantidade e preço maiores que zero',
    'error.saleNotFound': 'Venda não encontrada',
    'error.insufficientStock': 'Estoque insuficiente. Disponível: {{available}}',
  },
  'en-US': {
    'app.name': 'Pineapple Farm',
    'nav.dashboard': 'Dashboard',
    'nav.harvests': 'Harvests',
    'nav.sales': 'Sales',
    'nav.logout': 'Log out',
    'language.select': 'Select language',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.signIn': 'Sign in',
    'login.signingIn': 'Signing in...',
    'login.wakeMessage': 'On Render’s free plan, the API may take up to 1 minute to wake up.',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.date': 'Date',
    'common.quantity': 'Quantity',
    'common.client': 'Customer',
    'common.total': 'Total',
    'common.unitPrice': 'Unit price',
    'common.emptyHarvests': 'No harvests recorded.',
    'common.emptySales': 'No sales recorded.',
    'dashboard.harvested': 'Total harvested',
    'dashboard.sold': 'Total sold',
    'dashboard.stock': 'In stock',
    'dashboard.revenue': 'Revenue',
    'harvest.title': 'Record harvest',
    'harvest.observation': 'Notes',
    'sale.title': 'Record sale',
    'sale.unitPrice': 'Unit price (R$)',
    'error.network': 'Could not connect to the API',
    'error.invalidCredentials': 'Invalid username or password',
    'error.internal': 'Internal server error',
    'error.request': 'Request failed',
    'error.harvestValidation': 'Enter a date and a quantity greater than zero',
    'error.harvestNotFound': 'Harvest not found',
    'error.harvestAlreadySold': 'Cannot delete: the pineapples from this harvest have already been sold',
    'error.saleValidation': 'Enter a date, quantity, and price greater than zero',
    'error.saleNotFound': 'Sale not found',
    'error.insufficientStock': 'Insufficient stock. Available: {{available}}',
  },
  'zh-CN': {
    'app.name': '菠萝农场',
    'nav.dashboard': '仪表盘',
    'nav.harvests': '采收记录',
    'nav.sales': '销售记录',
    'nav.logout': '退出',
    'language.select': '选择语言',
    'login.username': '用户名',
    'login.password': '密码',
    'login.signIn': '登录',
    'login.signingIn': '正在登录...',
    'login.wakeMessage': 'Render 免费方案中的 API 可能需要最多 1 分钟才能唤醒。',
    'common.loading': '正在加载...',
    'common.save': '保存',
    'common.delete': '删除',
    'common.date': '日期',
    'common.quantity': '数量',
    'common.client': '客户',
    'common.total': '总计',
    'common.unitPrice': '单价',
    'common.emptyHarvests': '暂无采收记录。',
    'common.emptySales': '暂无销售记录。',
    'dashboard.harvested': '采收总量',
    'dashboard.sold': '销售总量',
    'dashboard.stock': '库存',
    'dashboard.revenue': '销售额',
    'harvest.title': '登记采收',
    'harvest.observation': '备注',
    'sale.title': '登记销售',
    'sale.unitPrice': '单价（巴西雷亚尔）',
    'error.network': '无法连接到 API',
    'error.invalidCredentials': '用户名或密码错误',
    'error.internal': '服务器内部错误',
    'error.request': '请求失败',
    'error.harvestValidation': '请输入日期和大于零的数量',
    'error.harvestNotFound': '未找到采收记录',
    'error.harvestAlreadySold': '无法删除：该批采收的菠萝已售出',
    'error.saleValidation': '请输入日期、数量和大于零的价格',
    'error.saleNotFound': '未找到销售记录',
    'error.insufficientStock': '库存不足。可用数量：{{available}}',
  },
};

const errosApi = {
  'Usuário ou senha inválidos': 'error.invalidCredentials',
  'Erro interno no servidor': 'error.internal',
  'Erro na requisição': 'error.request',
  'Informe a data e uma quantidade maior que zero': 'error.harvestValidation',
  'Colheita não encontrada': 'error.harvestNotFound',
  'Não é possível excluir: os abacaxis desta colheita já foram vendidos': 'error.harvestAlreadySold',
  'Informe data, quantidade e preço maiores que zero': 'error.saleValidation',
  'Venda não encontrada': 'error.saleNotFound',
  'Failed to fetch': 'error.network',
};

const ContextoIdioma = createContext(null);

function idiomaSalvo() {
  const salvo = localStorage.getItem(CHAVE_IDIOMA);
  return IDIOMAS.some(({ codigo }) => codigo === salvo) ? salvo : IDIOMA_PADRAO;
}

export function ProvedorIdioma({ children }) {
  const [idioma, setIdioma] = useState(idiomaSalvo);

  useEffect(() => {
    document.documentElement.lang = idioma;
    document.title = mensagens[idioma]['app.name'];
  }, [idioma]);

  function alterarIdioma(novoIdioma) {
    if (!IDIOMAS.some(({ codigo }) => codigo === novoIdioma)) return;
    localStorage.setItem(CHAVE_IDIOMA, novoIdioma);
    setIdioma(novoIdioma);
  }

  function t(chave, valores = {}) {
    const texto = mensagens[idioma][chave] || mensagens[IDIOMA_PADRAO][chave] || chave;
    return texto.replace(/\{\{(\w+)\}\}/g, (_, nome) => valores[nome] ?? '');
  }

  function traduzirErro(mensagem) {
    if (errosApi[mensagem]) return t(errosApi[mensagem]);
    if (typeof mensagem !== 'string') return t('error.request');
    const estoque = mensagem.match(/^Estoque insuficiente\. Disponível: (.+)$/);
    if (estoque) {
      const disponivel = Number(estoque[1]);
      return t('error.insufficientStock', {
        available: Number.isFinite(disponivel) ? disponivel.toLocaleString(idioma) : estoque[1],
      });
    }
    return mensagem || t('error.request');
  }

  return (
    <ContextoIdioma.Provider value={{ idioma, alterarIdioma, t, traduzirErro }}>
      {children}
    </ContextoIdioma.Provider>
  );
}

export function useIdioma() {
  const contexto = useContext(ContextoIdioma);
  if (!contexto) throw new Error('useIdioma deve ser usado dentro de ProvedorIdioma');
  return contexto;
}

function BandeiraIdioma({ codigo }) {
  if (codigo === 'pt-BR') {
    return (
      <svg className="bandeira-idioma" viewBox="0 0 24 16" aria-hidden="true">
        <rect width="24" height="16" fill="#009b3a" />
        <path d="M12 2 22 8 12 14 2 8Z" fill="#ffdf00" />
        <circle cx="12" cy="8" r="3.5" fill="#002776" />
      </svg>
    );
  }

  if (codigo === 'en-US') {
    return (
      <svg className="bandeira-idioma" viewBox="0 0 24 16" aria-hidden="true">
        <rect width="24" height="16" fill="#b22234" />
        <path d="M0 1.23h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0" fill="#fff" />
        <rect width="10.5" height="8" fill="#3c3b6e" />
        <g fill="#fff">
          <circle cx="2" cy="1.5" r=".45" /><circle cx="5" cy="1.5" r=".45" /><circle cx="8" cy="1.5" r=".45" />
          <circle cx="3.5" cy="3.5" r=".45" /><circle cx="6.5" cy="3.5" r=".45" /><circle cx="2" cy="5.5" r=".45" />
          <circle cx="5" cy="5.5" r=".45" /><circle cx="8" cy="5.5" r=".45" /><circle cx="3.5" cy="7" r=".45" />
          <circle cx="6.5" cy="7" r=".45" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="bandeira-idioma" viewBox="0 0 24 16" aria-hidden="true">
    <rect width="24" height="16" fill="#de2910" />
    <path d="m5 2 .8 1.7 1.9.2-1.4 1.3.4 1.9L5 6.1 3.3 7l.4-1.9-1.4-1.3 1.9-.2z" fill="#ffde00" />
    <path d="m9 1.8.25.65.7.04-.54.44.18.67L9 3.23l-.59.37.18-.67-.54-.44.7-.04zm2.1 2.1.25.65.7.04-.54.44.18.67-.59-.37-.59.37.18-.67-.54-.44.7-.04zm0 2.5.25.65.7.04-.54.44.18.67-.59-.37-.59.37.18-.67-.54-.44.7-.04zm-2.1 2.1.25.65.7.04-.54.44.18.67L9 7.93l-.59.37.18-.67-.54-.44.7-.04z" fill="#ffde00" />
    </svg>
  );
}

export function SeletorIdioma({ className = '' }) {
  const { idioma, alterarIdioma, t } = useIdioma();

  return (
    <div className={`seletor-idioma ${className}`.trim()} role="group" aria-label={t('language.select')}>
      {IDIOMAS.map(({ codigo, nome }) => (
        <button
          key={codigo}
          type="button"
          className={idioma === codigo ? 'ativo' : ''}
          aria-label={nome}
          aria-pressed={idioma === codigo}
          title={nome}
          onClick={() => alterarIdioma(codigo)}
        >
          <BandeiraIdioma codigo={codigo} />
        </button>
      ))}
    </div>
  );
}
