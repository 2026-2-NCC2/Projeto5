import { Link } from "react-router-dom";
import "../styles/CardProposta.css";

function formatarMoeda(valor) {
    const numero = Number(valor);
    if (!Number.isFinite(numero)) return "—";

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(numero);
}

function formatarValidade(validade) {
    if (!validade) return "—";
    const data = new Date(validade);
    if (Number.isNaN(data.getTime())) return "—";

    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(data);
}

function statusLegivel(status) {
    const statusPorValor = {
        aprovada: "Aprovada",
        expirada: "Expirada",
        pendente: "Pendente",
        recusada: "Recusada",
    };
    return statusPorValor[status] || status || "—";
}

function CardProposta({ proposta, perfil }) {
    if (!proposta || !["organizador", "admin", "fornecedor"].includes(perfil)) {
        return null;
    }

    const fornecedor = perfil === "organizador" || perfil === "admin";

    return (
        <article className="card-proposta">
            <div className="card-proposta-marca" aria-hidden="true">
                {fornecedor
                    ? (proposta.nomeFantasia || "F").trim().charAt(0).toUpperCase()
                    : (proposta.nomeEvento || "E").trim().charAt(0).toUpperCase()}
            </div>

            <div className="card-proposta-conteudo">
                <div className="card-proposta-cabecalho">
                    <h2>{fornecedor ? proposta.nomeFantasia || "Fornecedor sem nome" : proposta.nomeEvento || "Evento sem nome"}</h2>
                    <span className={`card-proposta-status status-${proposta.status || "indefinido"}`}>
                        {statusLegivel(proposta.status)}
                    </span>
                </div>

                {fornecedor ? (
                    <p className="card-proposta-metadados">
                        Validade: <strong>{formatarValidade(proposta.validade)}</strong>
                    </p>
                ) : (
                    <p className="card-proposta-metadados">
                        Categoria: <strong>{proposta.categoria || "—"}</strong>
                    </p>
                )}
            </div>

            <div className="card-proposta-valor">
                <span>Valor</span>
                <strong>{formatarMoeda(proposta.valor)}</strong>
                <Link
                    className="card-proposta-detalhes"
                    to={`/propostas/${encodeURIComponent(proposta.codItem)}/${encodeURIComponent(proposta.idFornecedor)}`}
                >
                    Ver Detalhes
                </Link>
            </div>
        </article>
    );
}

export default CardProposta;
