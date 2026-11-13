import { useState } from 'react';
import { LANG_OPTIONS } from '../i18n.js';

const LANGUAGE_NAMES = { pt: 'Português', en: 'English', zh: '中文' };
const LANGUAGE_SHORT_NAMES = { pt: 'PT', en: 'EN', zh: '中文' };

function FlagIcon({ lang }) {
  if (lang === 'pt') {
    return (
      <svg className="language-flag" viewBox="0 0 24 18" aria-hidden="true">
        <rect width="24" height="18" fill="#009b3a" />
        <path d="M12 2.5 22 9 12 15.5 2 9Z" fill="#ffdf00" />
        <circle cx="12" cy="9" r="3.5" fill="#002776" />
      </svg>
    );
  }

  if (lang === 'en') {
    return (
      <svg className="language-flag" viewBox="0 0 24 18" aria-hidden="true">
        <rect width="24" height="18" fill="#fff" />
        <path d="M0 0h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0z" fill="#b22234" />
        <rect width="10" height="9.5" fill="#3c3b6e" />
        <path d="m2 1.5.35 1.05h1.1l-.9.65.35 1.05L2 3.6l-.9.65.35-1.05-.9-.65h1.1zM6 1.5l.35 1.05h1.1l-.9.65.35 1.05L6 3.6l-.9.65.35-1.05-.9-.65h1.1zM4 5l.35 1.05h1.1l-.9.65.35 1.05L4 7.1l-.9.65.35-1.05-.9-.65h1.1zM8 5l.35 1.05h1.1l-.9.65.35 1.05L8 7.1l-.9.65.35-1.05-.9-.65h1.1z" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg className="language-flag" viewBox="0 0 24 18" aria-hidden="true">
      <rect width="24" height="18" fill="#de2910" />
      <path d="m5 2 .55 1.7h1.8L5.9 4.75l.55 1.7L5 5.4l-1.45 1.05.55-1.7-1.45-1.05h1.8z" fill="#ffde00" />
      <circle cx="9.1" cy="2.6" r=".65" fill="#ffde00" />
      <circle cx="10.8" cy="4.3" r=".65" fill="#ffde00" />
      <circle cx="10.7" cy="6.4" r=".65" fill="#ffde00" />
      <circle cx="8.8" cy="8" r=".65" fill="#ffde00" />
    </svg>
  );
}

export default function LanguageSwitcher({ lang, onChange }) {
  const [aberto, setAberto] = useState(false);

  function selecionarIdioma(codigo) {
    onChange(codigo);
    setAberto(false);
  }

  return (
    <div className="language-menu">
      {aberto && (
        <div className="language-options" role="group" aria-label="Select language">
          {LANG_OPTIONS.map((codigo) => (
            <button
              key={codigo}
              type="button"
              className={lang === codigo ? 'language-option ativo' : 'language-option'}
              onClick={() => selecionarIdioma(codigo)}
              aria-pressed={lang === codigo}
            >
              <FlagIcon lang={codigo} />
              <span>{LANGUAGE_NAMES[codigo]}</span>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="language-toggle"
        onClick={() => setAberto(!aberto)}
        aria-label={`Idioma atual: ${LANGUAGE_NAMES[lang]}`}
        aria-expanded={aberto}
        title={LANGUAGE_NAMES[lang]}
      >
        <FlagIcon lang={lang} />
        <span className="language-toggle-label">{LANGUAGE_SHORT_NAMES[lang]}</span>
      </button>
    </div>
  );
}
