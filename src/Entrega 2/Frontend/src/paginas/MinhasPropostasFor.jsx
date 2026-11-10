import { useLocation, useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/MinhasPropostasFor.css";

// Propostas locais de exemplo para preencher a tela sem integração com backend.
const dadosMock = [
    {
        id: "PROP-8821",
        eventoId: "EVT-2025-01",
        evento: "Festival Sunset Sound 2025",
        fornecedor: "Prime Produções",
        servico: "Palco, Som & Iluminação",
        status: "Pré-Aprovada",
        valor: 28500,
        observacao: "30% Escrow • 70% Pós-evento",
        icone: "♧",
        tipoIcone: "palco",
    },
    {
        id: "PROP-8790",
        eventoId: "EVT-2025-02",
        evento: "Summit Tech Inovação & Negócios",
        fornecedor: "Vanguard Eventos",
        servico: "Painel LED P2.6 & Sonorização",
        status: "Em Análise",
        valor: 26800,
        observacao: "Encerra em 48h",
        alerta: "Laudo acústico pendente",
        icone: "▣",
        tipoIcone: "painel",
    },
    {
        id: "PROP-8742",
        eventoId: "EVT-2025-03",
        evento: "Circuito Gastronômico & Beer Experience",
        fornecedor: "Gourmet Live",
        servico: "Geradores & Tendas",
        status: "Atenção Requerida",
        valor: 26800,
        observacao: "",
        alerta: "Laudo acústico pendente",
        icone: "ϟ",
        tipoIcone: "energia",
    },
    {
        id: "PROP-8698",
        eventoId: "EVT-2025-01",
        evento: "Festa da Primavera Urbana",
        fornecedor: "Prime Produções",
        servico: "Liberação Escrow em 24h",
        status: "Concluído",
        valor: 26800,
        observacao: "Liberação Escrow em 24h",
        icone: "✓",
        tipoIcone: "concluido",
    },
];

// Formata os valores para o padrão de moeda brasileira.
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(valor);
}

function MinhasPropostasFor() {
    const navigate = useNavigate();
    const location = useLocation();
    // A proposta recém-enviada chega pelo estado local de navegação, sem backend.
    const propostaRecebida = location.state?.novaProposta;
    const propostas = propostaRecebida
        ? [propostaRecebida, ...dadosMock.filter((proposta) => proposta.id !== propostaRecebida.id)]
        : dadosMock;
    const propostasPreAprovadas = propostas.filter((proposta) => proposta.status === "Pré-Aprovada").length;

    return (
        <main className="minhas-propostas-for-pagina">
            <section className="minhas-propostas-for-conteudo">
                {/* Botão para retornar à tela anterior, seguindo o padrão da aplicação. */}
                <BotaoVoltar className="minhas-propostas-for-voltar" />

                {/* Título e resumo da quantidade de propostas em andamento. */}
                <header className="minhas-propostas-for-cabecalho">
                    <h1>Minhas Propostas Comerciais</h1>
                    <p>Acompanhe concorrências ativas, esteiras de homologação e liberação de escrow.</p>
                    <button
                        className="minhas-propostas-for-eventos"
                        type="button"
                        onClick={() => navigate("/fornecedor/eventos")}
                    >
                        Ver eventos disponíveis
                    </button>
                </header>

                <section className="minhas-propostas-for-contador" aria-label="Resumo de propostas">
                    <div>
                        <span className="minhas-propostas-for-rotulo">Propostas ativas</span>
                        <div className="minhas-propostas-for-total">
                            <strong>{propostas.length}</strong>
                            <span>{propostasPreAprovadas} Pré-aprovada</span>
                        </div>
                    </div>
                    <span className="minhas-propostas-for-contador-icone" aria-hidden="true">▤</span>
                </section>

                {/* Lista de propostas, cada cartão mostra o evento e o status comercial. */}
                <section className="minhas-propostas-for-lista" aria-label="Lista de propostas comerciais">
                    {propostas.map((proposta) => (
                        <article className="minhas-propostas-for-card" key={proposta.id}>
                            <span
                                className={`minhas-propostas-for-icone ${proposta.tipoIcone}`}
                                aria-hidden="true"
                            >
                                {proposta.icone}
                            </span>

                            <div className="minhas-propostas-for-detalhes">
                                <div className="minhas-propostas-for-titulo-linha">
                                    <h2>{proposta.evento}</h2>
                                    <span className={`minhas-propostas-for-status ${proposta.tipoIcone}`}>
                                        {proposta.status === "Pré-Aprovada" && <i aria-hidden="true">✓</i>}
                                        {proposta.status === "Em Análise" && <i aria-hidden="true">◷</i>}
                                        {proposta.status === "Atenção Requerida" && <i aria-hidden="true">!</i>}
                                        {proposta.status === "Concluído" && <i aria-hidden="true">✓</i>}
                                        {proposta.status}
                                    </span>
                                    {proposta.status === "Em Análise" && (
                                        <span className="minhas-propostas-for-prazo">◷ {proposta.observacao}</span>
                                    )}
                                </div>
                                <p className="minhas-propostas-for-metadados">
                                    <strong>{proposta.fornecedor}</strong>
                                    <i aria-hidden="true">•</i>
                                    <span>{proposta.servico}</span>
                                    <i aria-hidden="true">•</i>
                                    <span className="minhas-propostas-for-id">#{proposta.id}</span>
                                </p>
                            </div>

                            {/* Total e aviso de cada proposta, quando houver pendência. */}
                            <div className="minhas-propostas-for-valor-bloco">
                                <span className="minhas-propostas-for-valor-rotulo">Valor total</span>
                                <strong>{formatarMoeda(proposta.valor)}</strong>
                                <span className={proposta.alerta ? "minhas-propostas-for-alerta" : "minhas-propostas-for-observacao"}>
                                    {proposta.alerta || proposta.observacao}
                                </span>
                            </div>

                            {/* Abre o evento relacionado à proposta selecionada. */}
                            <button
                                className="minhas-propostas-for-detalhes"
                                type="button"
                                onClick={() => navigate(`/fornecedor/eventos/${proposta.eventoId}`)}
                            >
                                Detalhes
                            </button>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    );
}

export default MinhasPropostasFor;
