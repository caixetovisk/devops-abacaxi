import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { traducoes, traducoesErrosApi } from './translations.js';

const IDIOMA_PADRAO = 'pt-BR';
const CHAVE_IDIOMA = 'idioma';
const LanguageContext = createContext(null);

function lerIdiomaSalvo() {
  const salvo = localStorage.getItem(CHAVE_IDIOMA);
  return Object.hasOwn(traducoes, salvo) ? salvo : IDIOMA_PADRAO;
}

export function I18nProvider({ children }) {
  const [idioma, setIdioma] = useState(lerIdiomaSalvo);

  useEffect(() => {
    localStorage.setItem(CHAVE_IDIOMA, idioma);
    document.documentElement.lang = idioma;
  }, [idioma]);

  const value = useMemo(() => {
    const t = (chave) => traducoes[idioma][chave] ?? traducoes[IDIOMA_PADRAO][chave] ?? chave;

    function traduzirErro(mensagem) {
      if (mensagem === 'Failed to fetch' || mensagem === 'Não foi possível conectar à API') {
        return t('error.connection');
      }

      if (mensagem === 'Erro na requisição') return t('error.request');

      if (mensagem.startsWith('Estoque insuficiente. Disponível: ')) {
        const estoque = mensagem.slice('Estoque insuficiente. Disponível: '.length);
        return t('error.insufficientStock').replace('{stock}', estoque);
      }

      const chave = traducoesErrosApi[mensagem];
      return chave ? t(chave) : mensagem;
    }

    return { idioma, setIdioma, t, traduzirErro };
  }, [idioma]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage deve ser usado dentro de I18nProvider');
  return context;
}
