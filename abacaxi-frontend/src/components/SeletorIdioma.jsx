const OPCOES = [
  { idioma: 'pt', bandeira: '🇧🇷', nome: 'Português' },
  { idioma: 'en', bandeira: '🇺🇸', nome: 'English' },
  { idioma: 'zh', bandeira: '🇨🇳', nome: '中文' },
];

export default function SeletorIdioma({ idioma, aoAlterar, rotulo }) {
  return (
    <nav className="seletor-idioma" aria-label={rotulo}>
      {OPCOES.map((opcao) => (
        <button
          key={opcao.idioma}
          type="button"
          className={idioma === opcao.idioma ? 'idioma-ativo' : ''}
          aria-label={opcao.nome}
          aria-pressed={idioma === opcao.idioma}
          title={opcao.nome}
          onClick={() => aoAlterar(opcao.idioma)}
        >
          <span aria-hidden="true">{opcao.bandeira}</span>
        </button>
      ))}
    </nav>
  );
}
