import "../styles/CardDashboard.css";

function CardDashboard({ titulo, valor, legenda, descricao, status, tags = [], acao, icone, variante = "padrao" }) {
    return (
        <article className={`card-dashboard card-dashboard-${variante}`}>
            <div className="cabecalho-card-dashboard">
                <span className="icone-card-dashboard">
                    <img src={icone} alt="" aria-hidden="true" />
                </span>
                {status && <span className="status-card-dashboard">{status}</span>}
            </div>

            <h2>{titulo}</h2>

            {valor !== undefined && valor !== null ? (
                <p className="valor-card-dashboard">
                    {valor}
                    {legenda && <small>{legenda}</small>}
                </p>
            ) : (
                <p className="descricao-card-dashboard">{descricao}</p>
            )}

            {tags.length > 0 && (
                <div className="tags-card-dashboard">
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
            )}

            {acao && <a className="acao-card-dashboard" href={acao.href}>{acao.texto}<span aria-hidden="true">&#8250;</span></a>}
        </article>
    );
}

export default CardDashboard;
