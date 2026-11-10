import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/MeusEventosOrg.css";

// Eventos estáticos usados para montar a interface enquanto não há integração com API.
// Os IDs permitem navegar para a proposta simulada associada a cada evento.
const dadosMock = [
    {
        propostaId: "EVT-8942",
        id: "EVT-8942",
        nome: "Festival Sunset Sound 2025 - Edição SP",
        data: "22 a 24 de Nov, 2025",
        local: "São Paulo, SP - Pavilhão Anhembi",
        status: "cotacoes",
        orcamento: 120000,
        fechadas: 3,
        total: 5,
        propostas: 12,
        destaque: "Urgente",
    },
    {
        propostaId: "EVT-8942",
        id: "EVT-7719",
        nome: "Summit Corporativo TechBR 2025",
        data: "04 e 05 de Dez, 2025",
        local: "Campinas, SP - Royal Palm Hall",
        status: "fechado",
        orcamento: 215000,
        fechadas: 5,
        total: 5,
        propostas: 8,
        destaque: "Concluído",
    },
    {
        propostaId: "EVT-8942",
        id: "EVT-3021",
        nome: "Arena GastroFest Experience 2026",
        data: "18 a 21 de Jan, 2026",
        local: "Belo Horizonte, MG - Expominas",
        status: "cotacoes",
        orcamento: 340000,
        fechadas: 2,
        total: 6,
        propostas: 16,
        destaque: "+4 hoje",
    },
];

// Formata valores numéricos como moeda brasileira.
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2,
    }).format(valor);
}

function MeusEventosOrg() {
    const navigate = useNavigate();

    // A busca e o filtro atualizam a listagem sem sair da página.
    const eventos = dadosMock;
    const [busca, setBusca] = useState("");
    const [statusFiltro, setStatusFiltro] = useState("todos");

    // Mantém apenas eventos que correspondem ao texto e ao status selecionados.
    const eventosVisiveis = eventos.filter((evento) => {
        const termoBusca = busca.trim().toLocaleLowerCase("pt-BR");
        const correspondeBusca = [evento.nome, evento.local, evento.id]
            .some((campo) => campo.toLocaleLowerCase("pt-BR").includes(termoBusca));
        const correspondeStatus = statusFiltro === "todos" || evento.status === statusFiltro;

        return correspondeBusca && correspondeStatus;
    });

    return (
        <main className="pagina-meus-eventos-org">
            <section className="meus-eventos-org-conteudo">
                {/* Botão de retorno e cabeçalho com a ação principal da página. */}
                <header className="meus-eventos-org-topo">
                    <BotaoVoltar className="meus-eventos-org-voltar" />
                    <div className="meus-eventos-org-titulo-linha">
                        <div>
                            <h1>Meus Eventos</h1>
                            <p>
                                Gerencie seus eventos criados, acompanhe o status das cotações em tempo real e feche a grade de fornecedores qualificados.
                            </p>
                        </div>
                        <button
                            className="meus-eventos-org-publicar"
                            type="button"
                            onClick={() => navigate("/criar-evento-org")}
                        >
                            <span aria-hidden="true">＋</span> Publicar Novo Evento
                        </button>
                    </div>
                </header>

                {/* Busca, filtro por status e total de eventos cadastrados. */}
                <div className="meus-eventos-org-ferramentas">
                    <label className="meus-eventos-org-busca">
                        <span aria-hidden="true">⌕</span>
                        <input
                            aria-label="Buscar por nome do evento ou local"
                            placeholder="Buscar por nome do evento ou local..."
                            value={busca}
                            onChange={(event) => setBusca(event.target.value)}
                        />
                    </label>
                    <label className="meus-eventos-org-filtro">
                        <span className="meus-eventos-org-sr-only">Filtrar eventos por status</span>
                        <select
                            value={statusFiltro}
                            onChange={(event) => setStatusFiltro(event.target.value)}
                        >
                            <option value="todos">Status: Todos os Eventos</option>
                            <option value="cotacoes">Recebendo Cotações</option>
                            <option value="fechado">Grade Fechada</option>
                        </select>
                    </label>
                    <span className="meus-eventos-org-total">
                        <i aria-hidden="true" />
                        {eventos.length} eventos cadastrados
                    </span>
                </div>

                {/* Cada cartão resume evento, progresso das cotações e orçamento. */}
                <div className="meus-eventos-org-lista">
                    {eventosVisiveis.map((evento) => {
                        const percentual = Math.round((evento.fechadas / evento.total) * 100);
                        const fechado = evento.status === "fechado";

                        return (
                            <article className="meus-eventos-org-card" key={evento.id}>
                                <div className="meus-eventos-org-detalhes">
                                    <div className="meus-eventos-org-identificadores">
                                        <span className={`meus-eventos-org-status ${fechado ? "fechado" : ""}`}>
                                            <i aria-hidden="true" />
                                            {fechado ? "Grade Fechada" : "Recebendo Cotações"}
                                        </span>
                                        <span className="meus-eventos-org-id">#{evento.id}</span>
                                    </div>
                                    <h2>{evento.nome}</h2>
                                    <p className="meus-eventos-org-metadados">
                                        <span aria-hidden="true">▣</span>{evento.data}
                                        <span className="meus-eventos-org-local-icone" aria-hidden="true">⌖</span>{evento.local}
                                    </p>
                                </div>

                                <div className="meus-eventos-org-progresso">
                                    <div className="meus-eventos-org-progresso-topo">
                                        <span>Progresso da Grade</span>
                                        <strong>{evento.fechadas} de {evento.total} fechadas ({percentual}%)</strong>
                                    </div>
                                    <div
                                        className="meus-eventos-org-trilho"
                                        role="progressbar"
                                        aria-label={`Progresso da grade de ${evento.nome}`}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        aria-valuenow={percentual}
                                    >
                                        <span style={{ width: `${percentual}%` }} />
                                    </div>
                                    <div className="meus-eventos-org-resumo">
                                        <span className={`meus-eventos-org-resumo-icone ${fechado ? "concluido" : ""}`} aria-hidden="true">
                                            {fechado ? "✓" : "▱"}
                                        </span>
                                        <strong>{evento.propostas} {fechado ? "contratadas" : "propostas"}</strong>
                                        {!fechado && <span className="meus-eventos-org-aguardando">aguardando análise</span>}
                                        <b className={fechado ? "concluido" : ""}>{evento.destaque}</b>
                                    </div>
                                </div>

                                <div className="meus-eventos-org-acoes">
                                    <span className="meus-eventos-org-orcamento-label">Teto orçamentário</span>
                                    <strong className="meus-eventos-org-orcamento">{formatarMoeda(evento.orcamento)}</strong>
                                    <button
                                        className="meus-eventos-org-botao-analisar"
                                        type="button"
                                        onClick={() => navigate(`/propostas/${evento.propostaId}`)}
                                    >
                                        Analisar a Proposta
                                        <span aria-hidden="true">→</span>
                                    </button>
                                </div>
                            </article>
                        );
                    })}

                    {/* Mensagem para o caso de a busca ou o filtro não encontrar eventos. */}
                    {eventosVisiveis.length === 0 && (
                        <p className="meus-eventos-org-vazio">
                            Nenhum evento encontrado para estes filtros.
                        </p>
                    )}
                </div>
            </section>

        </main>
    );
}

export default MeusEventosOrg;
