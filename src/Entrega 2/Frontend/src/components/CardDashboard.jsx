import { Link } from "react-router-dom";
import "../styles/CardDashboard.css";

// Card genérico: os textos, ícone e destino são definidos nos dados do Dashboard.
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

            {/* Exibe o valor do card se houver ou exibe a descrição passada */}
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

            {/* Link do router troca de tela sem recarregar e preserva o perfil em memória. */}
            {acao && <Link className="acao-card-dashboard" to={acao.href}>{acao.texto}<span aria-hidden="true">&#8250;</span></Link>}
        </article>
    );
}

export default CardDashboard;
