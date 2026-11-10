import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/ComparacaoPropostaOrg.css";

// Propostas simuladas para comparar preço, solução técnica e prazo de montagem.
const dadosMock = [
    {
        id: "PROP-001",
        fornecedor: "AudioPro Brasil",
        servico: "Sonorização Completa & Sistema Line Array",
        detalhes: "48 Canais Digitais • 12 Técnicos",
        montagem: "Montagem: 48h antecedência",
        status: "Recomendada",
        valor: 158000,
        recomendada: true,
        menorCotacao: true,
        marca: "A",
    },
    {
        id: "PROP-002",
        fornecedor: "StageSound Master",
        servico: "Sonorização Completa & Iluminação Cênica Integrada",
        detalhes: "Line Array K1 + Iluminação",
        montagem: "Montagem: 36h antecedência",
        status: "Em Análise",
        valor: 164500,
        recomendada: false,
        menorCotacao: false,
        marca: "S",
    },
    {
        id: "PROP-003",
        fornecedor: "MegaVibe Eventos",
        servico: "Sonorização de Palco & P.A. Tradicional",
        detalhes: "8 Operadores",
        montagem: "Montagem: 24h antecedência",
        status: "P.A. Convencional",
        valor: 171200,
        recomendada: false,
        menorCotacao: false,
        marca: "M",
    },
];

// Apresenta os valores no formato de moeda brasileira.
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(valor);
}

function ComparacaoPropostaOrg() {
    const navigate = useNavigate();

    // A primeira proposta vem pré-selecionada por ser a recomendação simulada.
    const [propostaSelecionadaId, setPropostaSelecionadaId] = useState(dadosMock[0].id);
    const [mensagem, setMensagem] = useState("");

    const propostaSelecionada = dadosMock.find((proposta) => proposta.id === propostaSelecionadaId);

    // Marca uma proposta como escolhida localmente e atualiza o resumo inferior.
    function aprovarProposta(proposta) {
        setPropostaSelecionadaId(proposta.id);
        setMensagem(`${proposta.fornecedor} foi selecionada neste protótipo.`);
    }

    return (
        <main className="comparacao-proposta-org-pagina">
            <div className="comparacao-proposta-org-container">
                {/* Retorna à página anterior seguindo o padrão das demais telas. */}
                <BotaoVoltar className="comparacao-proposta-org-voltar" />

                {/* Título e orientação para comparar as cotações recebidas. */}
                <header className="comparacao-proposta-org-cabecalho">
                    <h1>Comparação de Propostas Recebidas</h1>
                    <p>
                        Avalie as cotações técnicas, compare custos e prazos de entrega e selecione a proposta ideal para cada serviço do evento.
                    </p>
                </header>

                {/* Cada cartão destaca fornecedor, escopo, prazo e preço da proposta. */}
                <section className="comparacao-proposta-org-lista" aria-label="Propostas recebidas">
                    {dadosMock.map((proposta) => {
                        const selecionada = proposta.id === propostaSelecionadaId;

                        return (
                            <article
                                className={`comparacao-proposta-org-card ${selecionada ? "selecionada" : ""}`}
                                key={proposta.id}
                            >
                                <div className={`comparacao-proposta-org-marca marca-${proposta.marca.toLowerCase()}`} aria-hidden="true">
                                    {proposta.marca}
                                </div>

                                <div className="comparacao-proposta-org-detalhes">
                                    <div className="comparacao-proposta-org-fornecedor-linha">
                                        <h2>{proposta.fornecedor}</h2>
                                        {proposta.recomendada && (
                                            <span className="comparacao-proposta-org-selo recomendada">
                                                <i aria-hidden="true">✓</i> Recomendada
                                            </span>
                                        )}
                                        {proposta.menorCotacao && (
                                            <span className="comparacao-proposta-org-selo menor-cotacao">
                                                Menor Cotação (-12%)
                                            </span>
                                        )}
                                        {!proposta.recomendada && (
                                            <span className="comparacao-proposta-org-selo em-analise">
                                                {proposta.status}
                                            </span>
                                        )}
                                    </div>
                                    <p className="comparacao-proposta-org-servico">{proposta.servico}</p>
                                    <p className="comparacao-proposta-org-metadados">
                                        <span>{proposta.detalhes}</span>
                                        <i aria-hidden="true">•</i>
                                        <span>{proposta.montagem}</span>
                                    </p>
                                </div>

                                <div className="comparacao-proposta-org-acoes">
                                    <span className="comparacao-proposta-org-rotulo-valor">Valor total</span>
                                    <strong className="comparacao-proposta-org-valor">
                                        {formatarMoeda(proposta.valor)}
                                    </strong>
                                    <div className="comparacao-proposta-org-botoes">
                                        <button
                                            className="comparacao-proposta-org-ver-detalhes"
                                            type="button"
                                            onClick={() => navigate("/propostas/EVT-8942")}
                                        >
                                            Ver Detalhes
                                        </button>
                                        <button
                                            className="comparacao-proposta-org-aprovar"
                                            type="button"
                                            aria-pressed={selecionada}
                                            onClick={() => aprovarProposta(proposta)}
                                        >
                                            <span aria-hidden="true">✓</span> Aprovar Proposta
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                {/* Resumo persistente da proposta atualmente selecionada. */}
                <section className="comparacao-proposta-org-resumo" aria-label="Proposta selecionada">
                    <div className={`comparacao-proposta-org-marca marca-${propostaSelecionada.marca.toLowerCase()}`} aria-hidden="true">
                        {propostaSelecionada.marca}
                    </div>
                    <div className="comparacao-proposta-org-resumo-detalhes">
                        <div className="comparacao-proposta-org-fornecedor-linha">
                            <h2>{propostaSelecionada.fornecedor}</h2>
                            {propostaSelecionada.recomendada && (
                                <span className="comparacao-proposta-org-selo recomendada">
                                    <i aria-hidden="true">✓</i> Recomendada
                                </span>
                            )}
                            {propostaSelecionada.menorCotacao && (
                                <span className="comparacao-proposta-org-selo menor-cotacao">
                                    Menor Cotação (-12%)
                                </span>
                            )}
                        </div>
                        <p className="comparacao-proposta-org-servico">{propostaSelecionada.servico}</p>
                        <p className="comparacao-proposta-org-metadados">
                            <span>{propostaSelecionada.detalhes}</span>
                            <i aria-hidden="true">•</i>
                            <span>{propostaSelecionada.montagem}</span>
                        </p>
                    </div>
                    <div className="comparacao-proposta-org-resumo-acoes">
                        <span className="comparacao-proposta-org-rotulo-valor">Valor total</span>
                        <strong className="comparacao-proposta-org-valor">
                            {formatarMoeda(propostaSelecionada.valor)}
                        </strong>
                        <div className="comparacao-proposta-org-botoes">
                            <button
                                className="comparacao-proposta-org-ver-detalhes"
                                type="button"
                                onClick={() => navigate("/propostas/EVT-8942")}
                            >
                                Ver Detalhes
                            </button>
                            <button
                                className="comparacao-proposta-org-aprovar"
                                type="button"
                                onClick={() => aprovarProposta(propostaSelecionada)}
                            >
                                <span aria-hidden="true">✓</span> Aprovar Proposta
                            </button>
                        </div>
                    </div>
                </section>
                {mensagem && <p className="comparacao-proposta-org-feedback" role="status">{mensagem}</p>}
            </div>
        </main>
    );
}

export default ComparacaoPropostaOrg;
