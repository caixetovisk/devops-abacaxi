import { idiomas } from '../translations.js';
import { useLanguage } from '../i18n.jsx';

export default function LanguageSelector() {
  const { idioma, setIdioma, t } = useLanguage();

  return (
    <label className="seletor-idioma">
      <span aria-hidden="true">🌐</span>
      <span className="sr-only">{t('language.label')}</span>
      <select
        aria-label={t('language.label')}
        value={idioma}
        onChange={(event) => setIdioma(event.target.value)}
      >
        {idiomas.map(({ codigo, nome }) => (
          <option key={codigo} value={codigo}>{nome}</option>
        ))}
      </select>
    </label>
  );
}
