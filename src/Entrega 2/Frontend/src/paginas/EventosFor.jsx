import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/EventosFor.css";

// Eventos de exemplo que representam oportunidades disponíveis para fornecedores.
const dadosMock = [
    {
        id: "EVT-2025-01",
        nome: "Festival Brasil Ritmos & Arte 2025",
        categoria: "Sonorização & Palco",
        descricao: "Infraestrutura técnica de som (Line Array e monitoração) para arena principal.",
        data: "14 a 16 Nov 2025",
        local: "Parque Ibirapuera, SP",
        orcamento: 180000,
        status: "aberto",
        prazo: "Encerra em 5 dias",
        visual: "festival",
        detalhe: "Demanda para sistema de PA Line Array, monitoração de palco e operação técnica durante o festival.",
    },
    {
        id: "EVT-2025-02",
        nome: "Summit Inovação & Tecnologia SP 2025",
        categoria: "Iluminação & Cenografia",
        descricao: "Painéis de LED P2.6, estruturas de grid aéreo e cenografia modular.",
        data: "02 a 04 Out 2025",
        local: "Transamerica Expo, SP",
        orcamento: 95000,
        status: "aberto",
        prazo: "Encerra em 12 dias",
        visual: "tecnologia",
        detalhe: "Busca fornecedores para painel de LED, iluminação de palco, estruturas aéreas e cenografia modular.",
    },
    {
        id: "EVT-2025-03",
        nome: "Circuito Gastronômico & Cervejeiro das Montanhas",
        categoria: "Infraestrutura & Bar",
        descricao: "Quiosques em madeira tratada, pontos refrigerados e geradores silenciosos.",
        data: "22 a 24 Ago 2025",
        local: "Campos do Jordão, SP",
        orcamento: 60000,
        status: "encerrado",
        prazo: "Inscrições Encerradas",
        visual: "gastronomia",
        detalhe: "Evento encerrado para novas propostas. A demanda incluía quiosques, refrigeração e geradores.",
    },
];

// Formata o orçamento para moeda brasileira.
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(valor);
}

function EventosFor() {
    const navigate = useNavigate();

    // Estados simples para busca, seleção das abas e ações locais dos cartões.
    const [filtro, setFiltro] = useState("todos");
    const [busca, setBusca] = useState("");

    // Calcula os totais das abas a partir dos dados de demonstração.
    const contagens = {
        todos: dadosMock.length,
        abertos: dadosMock.filter((evento) => evento.status === "aberto").length,
        encerrados: dadosMock.filter((evento) => evento.status === "encerrado").length,
    };

    // Aplica o filtro de situação e a busca por nome, categoria ou descrição.
    const eventosVisiveis = dadosMock.filter((evento) => {
        const termo = busca.trim().toLocaleLowerCase("pt-BR");
        const correspondeBusca = [evento.nome, evento.categoria, evento.descricao]
            .some((campo) => campo.toLocaleLowerCase("pt-BR").includes(termo));
        const correspondeFiltro = filtro === "todos"
            || (filtro === "abertos" && evento.status === "aberto")
            || (filtro === "encerrados" && evento.status === "encerrado");

        return correspondeBusca && correspondeFiltro;
    });

    return (
        <main className="eventos-for-pagina">
            <section className="eventos-for-conteudo">
                {/* Volta à página anterior seguindo o padrão de navegação do projeto. */}
                <BotaoVoltar className="eventos-for-voltar" />

                {/* Título e filtros para navegar pelas oportunidades disponíveis. */}
                <header className="eventos-for-cabecalho">
                    <h1>Eventos Disponíveis</h1>
                    <div className="eventos-for-abas" role="group" aria-label="Filtrar eventos">
                        {[
                            { id: "todos", texto: "Todos" },
                            { id: "abertos", texto: "Abertos" },
                            { id: "encerrados", texto: "Encerrados" },
                        ].map((aba) => (
                            <button
                                className={filtro === aba.id ? "ativa" : ""}
                                key={aba.id}
                                type="button"
                                aria-pressed={filtro === aba.id}
                                onClick={() => setFiltro(aba.id)}
                            >
                                {aba.texto} ({contagens[aba.id]})
                            </button>
                        ))}
                    </div>
                    <button
                        className="eventos-for-minhas-propostas"
                        type="button"
                        onClick={() => navigate("/fornecedor/propostas")}
                    >
                        Minhas Propostas
                    </button>
                </header>

                {/* Busca eventos pelo título, categoria ou escopo do serviço. */}
                <label className="eventos-for-busca">
                    <span aria-hidden="true">⌕</span>
                    <input
                        aria-label="Buscar evento ou escopo"
                        placeholder="Buscar evento ou escopo..."
                        value={busca}
                        onChange={(event) => setBusca(event.target.value)}
                    />
                </label>

                {/* Cartões de oportunidade com categoria, orçamento e prazo. */}
                <section className="eventos-for-lista" aria-label="Eventos disponíveis">
                    {eventosVisiveis.map((evento) => {
                        const encerrado = evento.status === "encerrado";

                        return (
                            <article className={`eventos-for-card ${encerrado ? "encerrado" : ""}`} key={evento.id}>
                                <div className={`eventos-for-imagem ${evento.visual}`} aria-hidden="true">
                                    <span className="eventos-for-categoria">
                                        <i aria-hidden="true">{evento.visual === "gastronomia" ? "⚑" : "▣"}</i>
                                        {evento.categoria}
                                    </span>
                                    <span className="eventos-for-imagem-texto">
                                        {evento.visual === "festival" ? "BRASIL RITMOS" : evento.visual === "tecnologia" ? "INOVAÇÃO 2025" : "MONTANHAS"}
                                    </span>
                                </div>

                                <div className="eventos-for-detalhes">
                                    <div className="eventos-for-status-linha">
                                        <span className={`eventos-for-status ${encerrado ? "fechado" : ""}`}>
                                            <i aria-hidden="true" />
                                            {encerrado ? "Inscrições Encerradas" : "Inscrições Abertas"}
                                        </span>
                                        <span className={`eventos-for-prazo ${encerrado ? "fechado" : ""}`}>
                                            <i aria-hidden="true">{encerrado ? "◷" : "◷"}</i>{evento.prazo}
                                        </span>
                                    </div>
                                    <h2>{evento.nome}</h2>
                                    <p className="eventos-for-descricao">{evento.descricao}</p>
                                    <div className="eventos-for-metadados">
                                        <div><span>Data</span><strong>{evento.data}</strong></div>
                                        <div><span>Local</span><strong>{evento.local}</strong></div>
                                        <div><span>Teto orçado</span><strong>{formatarMoeda(evento.orcamento)}</strong></div>
                                    </div>
                                </div>

                                {/* Abre o detalhe do evento ou inicia o formulário de proposta. */}
                                <div className="eventos-for-acoes">
                                    <button
                                        className="eventos-for-apresentar"
                                        type="button"
                                        disabled={encerrado}
                                        onClick={() => navigate(`/fornecedor/eventos/${evento.id}/proposta`)}
                                    >
                                        {encerrado ? "Encerrado" : "Apresentar Proposta"}
                                        <span aria-hidden="true">{encerrado ? "✓" : "→"}</span>
                                    </button>
                                    <button
                                        className="eventos-for-ver-detalhes"
                                        type="button"
                                        onClick={() => navigate(`/fornecedor/eventos/${evento.id}`)}
                                    >
                                        ◉ Ver Detalhes
                                    </button>
                                </div>
                            </article>
                        );
                    })}

                    {/* Mensagem de estado vazio para buscas e filtros sem resultados. */}
                    {eventosVisiveis.length === 0 && (
                        <p className="eventos-for-vazio">Nenhum evento encontrado para esta busca ou filtro.</p>
                    )}
                </section>
            </section>
        </main>
    );
}

export default EventosFor;
