import { Link } from "react-router-dom";
import "../styles/CardBanner.css";

function formatarData(data) {
    if (!data) return "Data não informada";

    const dataIso = data instanceof Date ? data.toISOString().slice(0, 10) : String(data).slice(0, 10);
    const [ano, mes, dia] = dataIso.split("-").map(Number);

    if (!ano || !mes || !dia) return "Data não informada";

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(ano, mes - 1, dia));
}

function CardBanner({ evento, perfil }) {
    const idEvento = evento?.codEvento ?? evento?.id;

    if (!evento || idEvento == null) return null;

    const status = evento.status || "planejamento";
    const eventoEncerrado = ["cancelado", "realizado"].includes(status);
    const localizacao = [evento.cidade, evento.ufEstado].filter(Boolean).join(", ");

    return (
        <article className={`card-banner${eventoEncerrado ? " card-banner-encerrado" : ""}`}>
            <div className="card-banner-ilustracao" aria-hidden="true">
                <span>EVENTO #{idEvento}</span>
                <strong>{evento.nome}</strong>
            </div>

            <div className="card-banner-conteudo">
                <div className="card-banner-status-linha">
                    <span className={`card-banner-status${eventoEncerrado ? " encerrado" : ""}`}>
                        <i aria-hidden="true" />
                        {status}
                    </span>
                </div>
                <h2>{evento.nome}</h2>
                <div className="card-banner-metadados">
                    <div>
                        <span>Período</span>
                        <strong>{formatarData(evento.dataInicio)} – {formatarData(evento.dataFinal)}</strong>
                    </div>
                    <div>
                        <span>Cidade</span>
                        <strong>{localizacao || "Não informada"}</strong>
                    </div>
                    {evento.localEvento && (
                        <div>
                            <span>Local</span>
                            <strong>{evento.localEvento}</strong>
                        </div>
                    )}
                    {perfil === "admin" && (
                        <div>
                            <span>Organizador</span>
                            <strong>{evento.nomeFantasia || "Não informado"}</strong>
                        </div>
                    )}
                    {perfil === "fornecedor" && (
                        <div>
                            <span>Público esperado</span>
                            <strong>{evento.pubEsperado ?? "Não informado"}</strong>
                        </div>
                    )}
                    {(perfil === "admin" || perfil === "organizador") && (
                        <div>
                            <span>Itens de custo</span>
                            <strong>{evento.totalItensCusto ?? 0}</strong>
                        </div>
                    )}
                </div>
            </div>

            <div className="card-banner-acoes">
                <Link
                    className="card-banner-acao-secundaria"
                    to={`/eventos/${encodeURIComponent(idEvento)}/detalhes`}
                    state={{ evento }}
                >
                    Ver Detalhes
                </Link>
            </div>
        </article>
    );
}

export default CardBanner;
