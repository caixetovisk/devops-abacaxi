import { useLanguage } from '../i18n.jsx';

const receitas = [
  ['recipes.pineappleJuice', 'recipes.juiceIngredients', 'recipes.juicePreparation'],
  ['recipes.grilledPineapple', 'recipes.grilledIngredients', 'recipes.grilledPreparation'],
];

export default function Institucional({ pagina }) {
  const { t } = useLanguage();

  if (pagina === 'inicio') {
    return (
      <section className="card destaque-inicio">
        <p className="sobretitulo">{t('home.eyebrow')}</p>
        <h2>{t('home.title')}</h2>
        <p>{t('home.description')}</p>
      </section>
    );
  }

  if (pagina === 'fazenda') {
    return (
      <section className="card">
        <h2>{t('farm.title')}</h2>
        <p>{t('farm.description')}</p>
      </section>
    );
  }

  if (pagina === 'cultivo') {
    return (
      <section className="card">
        <h2>{t('cultivation.title')}</h2>
        <p>{t('cultivation.description')}</p>
      </section>
    );
  }

  if (pagina === 'receitas') {
    return (
      <section>
        <div className="card">
          <h2>{t('recipes.title')}</h2>
          <p>{t('recipes.description')}</p>
        </div>
        <div className="receitas">
          {receitas.map(([nome, ingredientes, preparo]) => (
            <article className="card" key={nome}>
              <h3>{t(nome)}</h3>
              <p><strong>{t('recipes.ingredients')}</strong> {t(ingredientes)}</p>
              <p><strong>{t('recipes.preparation')}</strong> {t(preparo)}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>{t('contact.title')}</h2>
      <p>{t('contact.notConfigured')}</p>
    </section>
  );
}
