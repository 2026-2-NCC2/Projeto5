import { Link } from "react-router-dom";
import "../styles/CardEvento.css";

function formatarData(data) {
    if (!data) return "—";

    const dataIso = data instanceof Date ? data.toISOString().slice(0, 10) : String(data).slice(0, 10);
    const [ano, mes, dia] = dataIso.split("-").map(Number);

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(ano, mes - 1, dia));
}

function CardEvento({ evento, perfil }) {
    if (!evento || !["organizador", "adm", "admin", "fornecedor"].includes(perfil)) {
        return null;
    }

    const exibirDadosAdmin = perfil === "adm" || perfil === "admin";
    const exibirTotalItens = exibirDadosAdmin || perfil === "organizador";
    const exibirPublicoEsperado = perfil === "fornecedor";
    const localizacao = [evento.cidade, evento.ufEstado].filter(Boolean).join(", ") || "—";
    const idEvento = evento.codEvento ?? evento.id;

    return (
        <article className="card-evento-dados">
            <div className="card-evento-dados-conteudo">
                <div className="card-evento-dados-cabecalho">
                    <span className="card-evento-dados-status">{evento.status || "—"}</span>
                    {exibirDadosAdmin && (
                        <span className="card-evento-dados-organizador">
                            Organização: {evento.nomeFantasia || "—"}
                        </span>
                    )}
                </div>

                <h2>{evento.nome || "Evento sem nome"}</h2>

                <div className="card-evento-dados-informacoes">
                    <p>
                        <span aria-hidden="true">▣</span>
                        {formatarData(evento.dataInicio)} – {formatarData(evento.dataFinal)}
                    </p>
                    <p>
                        <span aria-hidden="true">⌖</span>
                        {localizacao}
                    </p>
                    {evento.localEvento && (
                        <p>
                            <span aria-hidden="true">⌂</span>
                            {evento.localEvento}
                        </p>
                    )}
                </div>

                {exibirTotalItens && (
                    <p className="card-evento-dados-resumo">
                        Itens de custo: <strong>{evento.totalItensCusto ?? 0}</strong>
                    </p>
                )}

                {exibirPublicoEsperado && (
                    <p className="card-evento-dados-resumo">
                        Público esperado: <strong>{evento.pubEsperado ?? "—"}</strong>
                    </p>
                )}
            </div>
            {idEvento != null && (
                <Link
                    className="card-evento-dados-botao"
                    to={`/eventos/${encodeURIComponent(idEvento)}/detalhes`}
                    state={{ evento }}
                >
                    Ver Detalhes
                </Link>
            )}
        </article>
    );
}

export default CardEvento;
