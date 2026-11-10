import { Link } from "react-router-dom";

function AcaoItemCusto({ eventoId, item, perfil }) {
    if (perfil === "admin" || perfil === "organizador") {
        return (
            <Link
                className="acao-item-custo"
                to={`/comparacao-proposta-org?itemCusto=${encodeURIComponent(item.codItem)}`}
            >
                Ver Propostas
            </Link>
        );
    }

    if (perfil === "fornecedor") {
        return (
            <Link
                className="acao-item-custo"
                to={`/fornecedor/eventos/${encodeURIComponent(eventoId)}/proposta`}
                state={{ eventoId, itemCusto: item.codItem }}
            >
                Propor Cotação
            </Link>
        );
    }

    return null;
}

export default AcaoItemCusto;