import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Eventos.css";

// Eventos de exemplo usados para preencher a listagem enquanto não há integração com API.
const eventosMock = [
    {
        id: "EVT-001",
        nome: "Festival Aurora Sound 2025",
        descricao: "Festival de música eletrônica e artes visuais com palcos imersivos.",
        organizadorId: "Horizon Eventos e Entretenimento Brasil",
        dataInicio: "2025-11-15T12:00:00",
        dataLabel: "15 a 17 de Novembro, 2025",
        local: { nome: "Pavilhão Anhembi", cidade: "São Paulo", estado: "SP" },
        orcamentoEstimado: 480000,
        status: "recebendo propostas",
        fornecedorIds: Array.from({ length: 12 }, (_, index) => index + 1),
        cotacoesAtendidas: 75,
        poster: "poster-evento-1",
        posterChamada: "SOUND 2025 FESTIVAL",
    },
    {
        id: "EVT-002",
        nome: "Summit Corporativo TechBR 2025",
        descricao: "Congresso de tecnologia focado em inovações para o mercado corporativo.",
        organizadorId: "Nexus B2B Conferences & Media",
        dataInicio: "2025-12-04T09:00:00",
        dataLabel: "04 e 05 de Dezembro, 2025",
        local: { nome: "Royal Palm Hall", cidade: "Campinas", estado: "SP" },
        orcamentoEstimado: 215000,
        status: "concluido",
        fornecedorIds: Array.from({ length: 8 }, (_, index) => index + 1),
        cotacoesAtendidas: 100,
        poster: "poster-evento-2",
        posterChamada: "SUMMIT CORPORATIVO TECHBR",
    },
    {
        id: "EVT-003",
        nome: "Arena GastroFest Experience 2026",
        descricao: "Feira gastronômica ao ar livre com chefs renomados e food trucks.",
        organizadorId: "Minas Gastronomia & Shows Ltda.",
        dataInicio: "2026-01-18T10:00:00",
        dataLabel: "18 a 21 de Janeiro, 2026",
        local: { nome: "ExpoMinas", cidade: "Belo Horizonte", estado: "MG" },
        orcamentoEstimado: 340000,
        status: "planejamento",
        fornecedorIds: Array.from({ length: 16 }, (_, index) => index + 1),
        cotacoesAtendidas: 35,
        poster: "poster-evento-3",
        posterChamada: "GASTROFEST EXPERIENCE",
    },
];

// Converte datas ISO em texto localizado para exibição nos cards.
const formatarData = (data) => new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
}).format(new Date(data));

// Apresenta valores monetários no padrão brasileiro.
const formatarOrcamento = (valor) => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
}).format(valor);

function Eventos() {
    const navigate = useNavigate();

    // Estados da tela: dados da lista, critérios de busca, página atual e modal.
    const [eventos, setEventos] = useState(eventosMock);
    const [filtro, setFiltro] = useState("recentes");
    const [busca, setBusca] = useState("");
    const [filtrosAbertos, setFiltrosAbertos] = useState(false);
    const [statusDetalhe, setStatusDetalhe] = useState("todos");
    const [cidadeDetalhe, setCidadeDetalhe] = useState("todas");
    const [pagina, setPagina] = useState(1);
    const [modal, setModal] = useState(null);
    const itensPorPagina = 3;

    // Combina a aba selecionada com a busca e os filtros avançados.
    const eventosFiltrados = eventos.filter((evento) => {
        const termoBusca = busca.trim().toLocaleLowerCase("pt-BR");
        const correspondeBusca = !termoBusca || [
            evento.nome,
            evento.organizadorId,
            evento.local.nome,
            evento.local.cidade,
        ].some((campo) => campo.toLocaleLowerCase("pt-BR").includes(termoBusca));
        const correspondeAba = filtro === "recentes"
            || (filtro === "aberto" && evento.status !== "concluido")
            || (filtro === "concluido" && evento.status === "concluido");
        const correspondeStatus = statusDetalhe === "todos" || evento.status === statusDetalhe;
        const correspondeCidade = cidadeDetalhe === "todas" || evento.local.cidade === cidadeDetalhe;

        return correspondeBusca && correspondeAba && correspondeStatus && correspondeCidade;
    });

    // Pagina somente os resultados já filtrados e prepara os totais das abas.
    const totalPaginas = Math.max(1, Math.ceil(eventosFiltrados.length / itensPorPagina));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const eventosDaPagina = eventosFiltrados.slice(
        (paginaAtual - 1) * itensPorPagina,
        paginaAtual * itensPorPagina,
    );
    const contagens = {
        recentes: eventos.length,
        aberto: eventos.filter((evento) => evento.status !== "concluido").length,
        concluido: eventos.filter((evento) => evento.status === "concluido").length,
    };

    // Após alterar filtros, volta à primeira página para evitar listas vazias.
    function atualizarFiltro(callback) {
        callback();
        setPagina(1);
    }

    // Cria um evento de demonstração a partir dos campos do modal.
    function criarEvento(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const novoEvento = {
            id: `EVT-${Date.now().toString().slice(-6)}`,
            nome: formData.get("nome"),
            descricao: formData.get("descricao") || "Sem descrição informada.",
            organizadorId: "Seu Perfil de Organizador",
            dataInicio: `${formData.get("dataInicio")}T12:00:00`,
            dataLabel: formatarData(`${formData.get("dataInicio")}T12:00:00`),
            local: { nome: "A definir", cidade: "São Paulo", estado: "SP" },
            orcamentoEstimado: Number(formData.get("orcamento")) || 0,
            status: "recebendo propostas",
            fornecedorIds: [],
            cotacoesAtendidas: 0,
            poster: "poster-evento-1",
            posterChamada: "NOVO EVENTO",
        };

        // Atualiza a lista local e limpa os filtros para mostrar o novo cadastro.
        setEventos([novoEvento, ...eventos]);
        setModal(null);
        setFiltro("recentes");
        setBusca("");
        setStatusDetalhe("todos");
        setCidadeDetalhe("todas");
        setPagina(1);
    }

    return (
        <main className="pagina-eventos">
            <section className="eventos-conteudo">
                {/* Título, retorno à página anterior e abertura do formulário de novo evento. */}
                <div className="topo-eventos">
                    <button className="voltar-eventos" type="button" onClick={() => navigate(-1)}>
                        ← Voltar
                    </button>
                    <h1>Gestão de Eventos</h1>
                    <p>Acompanhe eventos cadastrados, cotações, orçamentos e canais de contato direto com organizadores.</p>
                    <button className="novo-evento" type="button" onClick={() => setModal("novo")}>
                        ＋ Novo Evento
                    </button>
                </div>

                {/* Abas, busca e filtros que refinam a lista sem recarregar a página. */}
                <div className="ferramentas-eventos">
                    <div className="abas-eventos">
                        <span className="rotulo-filtros">FILTROS:</span>
                        <button className={`aba-evento ${filtro === "recentes" ? "ativa" : ""}`} onClick={() => atualizarFiltro(() => setFiltro("recentes"))}>
                            Recentes <span>{contagens.recentes}</span>
                        </button>
                        <button className={`aba-evento ${filtro === "aberto" ? "ativa" : ""}`} onClick={() => atualizarFiltro(() => setFiltro("aberto"))}>
                            Em Aberto <span>{contagens.aberto}</span>
                        </button>
                        <button className={`aba-evento ${filtro === "concluido" ? "ativa" : ""}`} onClick={() => atualizarFiltro(() => setFiltro("concluido"))}>
                            Concluído <span>{contagens.concluido}</span>
                        </button>
                    </div>
                    <div className="controles-eventos">
                        <label className="busca-eventos">
                            <span aria-hidden="true">⌕</span>
                            <input
                                aria-label="Buscar eventos"
                                placeholder="Buscar por nome, organizador ou local..."
                                value={busca}
                                onChange={(e) => atualizarFiltro(() => setBusca(e.target.value))}
                            />
                        </label>
                        <button
                            className={`botao-filtros-avancados ${filtrosAbertos ? "ativo" : ""}`}
                            type="button"
                            aria-expanded={filtrosAbertos}
                            onClick={() => setFiltrosAbertos(!filtrosAbertos)}
                        >
                            ♧ Filtros Avançados
                        </button>
                    </div>
                    {filtrosAbertos && (
                        <div className="filtros-avancados">
                            <label>
                                Status do evento
                                <select value={statusDetalhe} onChange={(e) => atualizarFiltro(() => setStatusDetalhe(e.target.value))}>
                                    <option value="todos">Todos os status</option>
                                    <option value="recebendo propostas">Em cotação</option>
                                    <option value="planejamento">Em aberto</option>
                                    <option value="concluido">Concluído</option>
                                </select>
                            </label>
                            <label>
                                Cidade
                                <select value={cidadeDetalhe} onChange={(e) => atualizarFiltro(() => setCidadeDetalhe(e.target.value))}>
                                    <option value="todas">Todas as cidades</option>
                                    {[...new Set(eventos.map((evento) => evento.local.cidade))].map((cidade) => (
                                        <option key={cidade} value={cidade}>{cidade}</option>
                                    ))}
                                </select>
                            </label>
                            <button type="button" onClick={() => atualizarFiltro(() => {
                                setStatusDetalhe("todos");
                                setCidadeDetalhe("todas");
                            })}>
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* Resumo dos resultados e controles de paginação. */}
                <div className="resumo-listagem-eventos">
                    <span>
                        Exibindo {eventosFiltrados.length ? (paginaAtual - 1) * itensPorPagina + 1 : 0}
                        -{Math.min(paginaAtual * itensPorPagina, eventosFiltrados.length)} de {eventosFiltrados.length} eventos registrados
                    </span>
                    <nav className="paginacao-eventos" aria-label="Paginação dos eventos">
                        <button type="button" disabled={paginaAtual === 1} onClick={() => setPagina(paginaAtual - 1)}>Anterior</button>
                        {Array.from({ length: totalPaginas }, (_, index) => (
                            <button
                                className={paginaAtual === index + 1 ? "pagina-atual" : ""}
                                key={index + 1}
                                type="button"
                                aria-current={paginaAtual === index + 1 ? "page" : undefined}
                                onClick={() => setPagina(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button type="button" disabled={paginaAtual === totalPaginas} onClick={() => setPagina(paginaAtual + 1)}>Próxima</button>
                    </nav>
                </div>

                {/* Cada card resume um evento e oferece atalhos para contato e cotações. */}
                <div className="lista-eventos">
                    {eventosDaPagina.map((evento) => (
                        <article className="card-evento" key={evento.id}>
                            <div className={`poster-evento ${evento.poster}`}>
                                <span className="poster-selo">{evento.id}</span>
                                <strong>{evento.posterChamada}</strong>
                                <span className="poster-data">{evento.dataLabel}</span>
                                <span className="poster-grafismo" aria-hidden="true">✦</span>
                            </div>
                            <div className="detalhes-evento">
                                <div className="linha-status-evento">
                                    <span className={`evento-status ${evento.status === "concluido" ? "evento-status-concluido" : evento.status === "planejamento" ? "evento-status-aberto" : "evento-status-planejamento"}`}>
                                        <span aria-hidden="true">●</span>
                                        {evento.status === "concluido" ? "Confirmado" : evento.status === "planejamento" ? "Em Aberto" : "Em Cotação"}
                                    </span>
                                    <span className="id-evento">ID: #{evento.id}</span>
                                </div>
                                <h2>{evento.nome}</h2>
                                <p className="metadado-evento">
                                    <span aria-hidden="true">▣</span> {evento.dataLabel || formatarData(evento.dataInicio)}
                                    <span aria-hidden="true">·</span>
                                    <span aria-hidden="true">⌖</span> {evento.local.cidade}, {evento.local.estado} - {evento.local.nome}
                                </p>
                                <p className="metadado-evento">
                                    <span aria-hidden="true">◉</span> Organização: <strong>{evento.organizadorId}</strong>
                                </p>
                                <div className="resumo-evento">
                                    <span>Orçamento Previsto: <strong>{formatarOrcamento(evento.orcamentoEstimado)}</strong></span>
                                    <span><strong>{evento.fornecedorIds.length}</strong> itens de custo cotados</span>
                                </div>
                                <div className="progresso-cotacoes">
                                    <div><span>Cotações atendidas</span><strong>{evento.cotacoesAtendidas}% ({evento.fornecedorIds.length} Fornecedores)</strong></div>
                                    <span className="trilho-cotacoes"><i style={{ width: `${evento.cotacoesAtendidas}%` }} /></span>
                                </div>
                            </div>
                            <div className="acoes-evento">
                                <button className="botao-contato-evento" type="button" onClick={() => navigate("/contato")}>
                                    ◉ Contato
                                </button>
                                <button className="botao-cotacoes-evento" type="button" onClick={() => navigate(`/eventos/${evento.id}`)}>
                                    Ver Cotações ›
                                </button>
                            </div>
                        </article>
                    ))}
                    {/* Mensagem de estado vazio quando nenhum item corresponde aos filtros. */}
                    {eventosDaPagina.length === 0 && (
                        <p className="estado-eventos">Nenhum evento encontrado para estes filtros.</p>
                    )}
                </div>
            </section>

            {/* Modal controlado pelo estado `modal`; o formulário adiciona o evento à lista local. */}
            {modal === "novo" && (
                <div className="sobreposicao-modal-evento">
                    <section className="modal-evento">
                        <button className="fechar-modal-evento" type="button" onClick={() => setModal(null)}>×</button>
                        <h2>Adicionar evento</h2>
                        <form className="formulario-evento" onSubmit={criarEvento}>
                            <label>Nome do evento<input name="nome" required /></label>
                            <label>Descrição<textarea name="descricao" rows="2" /></label>
                            <label>Data de Início<input name="dataInicio" type="date" required /></label>
                            <label>Orçamento (R$)<input name="orcamento" type="number" min="0" step="0.01" /></label>
                            <div className="acoes-modal-evento">
                                <button type="button" onClick={() => setModal(null)}>Cancelar</button>
                                <button type="submit">Salvar Evento</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export default Eventos;
