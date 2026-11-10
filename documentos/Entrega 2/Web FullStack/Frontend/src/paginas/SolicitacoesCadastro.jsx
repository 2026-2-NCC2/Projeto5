import { useMemo, useState } from "react";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/SolicitacoesCadastro.css";

// Dados locais para demonstrar a fila e o histórico sem depender do backend.
const dadosMock = [
    {
        id: "SOL-2025-041",
        razaoSocial: "VibeLive Produções Artísticas e Festivais Ltda",
        nomeFantasia: "VibeLive Events - Setor de Festivais de Música e Megaventos",
        tipo: "Organizador",
        status: "Aguardando Validação",
        cnpj: "28.491.802/0001-44",
        email: "contato@vibelive.com.br",
        local: "São Paulo, SP",
        telefone: "(11) 98452-1100",
        criadoEm: "Recebido há 42 minutos",
        recente: true,
        inicial: "VL",
        cor: "roxo",
    },
    {
        id: "SOL-2025-038",
        razaoSocial: "AudioTech Soluções Acústicas & Iluminação Cênica",
        nomeFantasia: "AudioTech Pro - Fornecimento de P.A., Rider Técnico e Grids Q30",
        tipo: "Fornecedor",
        status: "Documentos sob Análise",
        cnpj: "19.822.714/0001-09",
        email: "comercial@audiotechpro.com.br",
        local: "Belo Horizonte, MG",
        telefone: "(31) 97120-8844",
        criadoEm: "Enviado hoje às 11:05",
        recente: false,
        inicial: "AT",
        cor: "azul",
    },
    {
        id: "SOL-2025-035",
        razaoSocial: "Pulse Gestão & Produção de Eventos Corporativos",
        nomeFantasia: "Pulse Business - Congressos, Feiras e Convenções Nacionais",
        tipo: "Organizador",
        status: "Aguardando Validação",
        cnpj: "34.102.553/0001-92",
        email: "credenciamento@pulsecorp.com.br",
        local: "Curitiba, PR",
        telefone: "(41) 99870-2211",
        criadoEm: "Enviado ontem às 18:30",
        recente: false,
        inicial: "PG",
        cor: "verde",
    },
    {
        id: "SOL-2025-031",
        razaoSocial: "StageCraft Cenografia, Stands & Decoração Temática",
        nomeFantasia: "StageCraft - Montagem de Palcos Especialistas em Camarins VIP",
        tipo: "Fornecedor",
        status: "Aguardando Contrato Social",
        cnpj: "08.761.320/0001-15",
        email: "operacoes@stagecraft.com.br",
        local: "Rio de Janeiro, RJ",
        telefone: "(21) 98112-9960",
        criadoEm: "Enviado em 23/10 às 09:12",
        recente: false,
        inicial: "SC",
        cor: "dourado",
    },
    {
        id: "SOL-2025-026",
        razaoSocial: "Pulse Gestão & Produção de Eventos Corporativos",
        nomeFantasia: "Pulse Business - Congressos, Feiras e Convenções Nacionais",
        tipo: "Organizador",
        status: "Cadastro Aprovado",
        cnpj: "34.102.553/0001-92",
        email: "credenciamento@pulsecorp.com.br",
        local: "Curitiba, PR",
        telefone: "(41) 99870-2211",
        criadoEm: "Aprovado em 22/10 às 15:20",
        recente: false,
        pendente: false,
        inicial: "PG",
        cor: "verde",
    },
    {
        id: "SOL-2025-024",
        razaoSocial: "AudioTech Soluções Acústicas & Iluminação Cênica",
        nomeFantasia: "AudioTech Pro - Fornecimento de P.A., Rider Técnico e Grids Q30",
        tipo: "Fornecedor",
        status: "Documentos sob Análise",
        cnpj: "19.822.714/0001-09",
        email: "comercial@audiotechpro.com.br",
        local: "Belo Horizonte, MG",
        telefone: "(31) 97120-8844",
        criadoEm: "Solicitação concluída em 20/10 às 14:10",
        recente: false,
        pendente: false,
        inicial: "AT",
        cor: "azul",
    },
    {
        id: "SOL-2025-020",
        razaoSocial: "NorteSul Eventos e Produções Ltda",
        nomeFantasia: "NorteSul Produções - Eventos corporativos e culturais",
        tipo: "Organizador",
        status: "Cadastro Aprovado",
        cnpj: "51.040.611/0001-72",
        email: "contato@nortesulproducoes.com.br",
        local: "São Paulo, SP",
        telefone: "(11) 95540-3312",
        criadoEm: "Aprovado em 18/10 às 10:45",
        recente: false,
        pendente: false,
        inicial: "NS",
        cor: "laranja",
    },
];

const itensPorPagina = 4;

// Remove acentos para que a busca aceite termos digitados sem diacríticos.
function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR");
}

function SolicitacoesCadastro() {
    const [solicitacoes, setSolicitacoes] = useState(dadosMock);
    const [aba, setAba] = useState("fila");
    const [categoria, setCategoria] = useState("Todos");
    const [busca, setBusca] = useState("");
    const [filtrosAbertos, setFiltrosAbertos] = useState(false);
    const [statusFiltro, setStatusFiltro] = useState("Todos");
    const [pagina, setPagina] = useState(1);

    // A fila mostra cadastros pendentes; o histórico mostra os já analisados.
    const registrosDaAba = useMemo(
        () => solicitacoes.filter((item) => (aba === "fila" ? item.pendente !== false : item.pendente === false)),
        [aba, solicitacoes],
    );

    // Aplica busca e filtros antes de calcular a página atual.
    const solicitacoesFiltradas = useMemo(() => {
        const termoBusca = normalizarTexto(busca.trim());

        return registrosDaAba.filter((item) => {
            const correspondeBusca = !termoBusca || normalizarTexto([
                item.razaoSocial,
                item.nomeFantasia,
                item.cnpj,
                item.email,
            ].join(" ")).includes(termoBusca);
            const correspondeCategoria = categoria === "Todos" || item.tipo === categoria;
            const correspondeStatus = statusFiltro === "Todos" || item.status === statusFiltro;

            return correspondeBusca && correspondeCategoria && correspondeStatus;
        });
    }, [busca, categoria, registrosDaAba, statusFiltro]);

    const totalPaginas = Math.max(1, Math.ceil(solicitacoesFiltradas.length / itensPorPagina));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const registrosVisiveis = solicitacoesFiltradas.slice(
        (paginaAtual - 1) * itensPorPagina,
        paginaAtual * itensPorPagina,
    );
    const totalFila = solicitacoes.filter((item) => item.pendente !== false).length;
    const totalHistorico = solicitacoes.filter((item) => item.pendente === false).length;
    const contagens = {
        Todos: registrosDaAba.length,
        Organizador: registrosDaAba.filter((item) => item.tipo === "Organizador").length,
        Fornecedor: registrosDaAba.filter((item) => item.tipo === "Fornecedor").length,
    };

    // Mantém a paginação na primeira página sempre que um filtro muda.
    function atualizarFiltro(acao) {
        acao();
        setPagina(1);
    }

    // Ações do MVP alteram apenas os dados mantidos no estado local.
    function atualizarSolicitacao(id, status, pendente) {
        setSolicitacoes((itensAtuais) => itensAtuais.map((item) => (
            item.id === id ? { ...item, status, pendente } : item
        )));
    }

    function alterarAba(novaAba) {
        setAba(novaAba);
        setCategoria("Todos");
        setStatusFiltro("Todos");
        setPagina(1);
    }

    return (
        <main className="pagina-solicitacoes">
            <section className="solicitacoes-painel" aria-labelledby="titulo-solicitacoes">
                <BotaoVoltar className="voltar-solicitacoes" />

                <header className="topo-solicitacoes">
                    <div>
                        <h1 id="titulo-solicitacoes">
                            {aba === "fila" ? "Solicitações de Cadastro" : "Histórico de Cadastro"}
                        </h1>
                        <p>Gerenciamento, validação jurídica e aprovação de novos Organizadores e Fornecedores parceiros.</p>
                    </div>
                    <aside className="resumo-fila">
                        <span>FILA DE ESPERA</span>
                        <strong>{totalFila} novas solicitações</strong>
                        <b>{totalFila}</b>
                    </aside>
                </header>

                <div className="navegacao-solicitacoes">
                    <div className="abas-solicitacoes" role="tablist" aria-label="Visualização das solicitações">
                        <button
                            className={aba === "fila" ? "aba-solicitacao ativa" : "aba-solicitacao"}
                            type="button"
                            role="tab"
                            aria-selected={aba === "fila"}
                            onClick={() => alterarAba("fila")}
                        >
                            ▤ Solicitações <span>{totalFila}</span>
                        </button>
                        <button
                            className={aba === "historico" ? "aba-solicitacao ativa" : "aba-solicitacao"}
                            type="button"
                            role="tab"
                            aria-selected={aba === "historico"}
                            onClick={() => alterarAba("historico")}
                        >
                            ◷ Histórico <span>{totalHistorico}</span>
                        </button>
                    </div>

                    <label className="busca-solicitacoes">
                        <span aria-hidden="true">⌕</span>
                        <input
                            aria-label="Buscar por razão social, CNPJ ou e-mail"
                            placeholder="Buscar por Razão Social, CNPJ ou E-mail..."
                            value={busca}
                            onChange={(evento) => atualizarFiltro(() => setBusca(evento.target.value))}
                        />
                    </label>
                </div>

                <div className="filtros-solicitacoes">
                    <div className="categorias-solicitacoes" aria-label="Filtrar por categoria">
                        <span className="rotulo-filtro-solicitacoes">FILTRAR:</span>
                        {["Todos", "Organizador", "Fornecedor"].map((item) => (
                            <button
                                className={categoria === item ? "filtro-categoria ativo" : "filtro-categoria"}
                                key={item}
                                type="button"
                                onClick={() => atualizarFiltro(() => setCategoria(item))}
                            >
                                {item === "Todos" ? "Todos" : item === "Organizador" ? "Organizadores" : "Fornecedores"} ({contagens[item]})
                            </button>
                        ))}
                        <button
                            className={filtrosAbertos ? "botao-mais-filtros ativo" : "botao-mais-filtros"}
                            type="button"
                            aria-expanded={filtrosAbertos}
                            onClick={() => setFiltrosAbertos(!filtrosAbertos)}
                        >
                            ♧ Mais Filtros
                        </button>
                        {filtrosAbertos && (
                            <label className="filtro-status-solicitacoes">
                                Status
                                <select
                                    value={statusFiltro}
                                    onChange={(evento) => atualizarFiltro(() => setStatusFiltro(evento.target.value))}
                                >
                                    <option value="Todos">Todos os status</option>
                                    <option value="Aguardando Validação">Aguardando Validação</option>
                                    <option value="Documentos sob Análise">Documentos sob Análise</option>
                                    <option value="Aguardando Contrato Social">Aguardando Contrato Social</option>
                                    <option value="Cadastro Aprovado">Cadastro Aprovado</option>
                                    <option value="Ajustes Solicitados">Ajustes Solicitados</option>
                                    <option value="Cadastro Recusado">Cadastro Recusado</option>
                                </select>
                            </label>
                        )}
                    </div>
                    <span className="ordenacao-solicitacoes">Ordenação: <strong>Mais recentes primeiro</strong></span>
                </div>

                <div className="lista-solicitacoes">
                    {registrosVisiveis.map((solicitacao) => (
                        <article className="card-solicitacao" key={solicitacao.id}>
                            <div className={`miniatura-solicitacao miniatura-${solicitacao.cor}`} aria-hidden="true">
                                <span>{solicitacao.inicial}</span>
                                {solicitacao.recente && <b>NOVO</b>}
                            </div>

                            <div className="detalhes-solicitacao">
                                <div className="etiquetas-solicitacao">
                                    <span className={`tipo-solicitacao tipo-${solicitacao.tipo.toLowerCase()}`}>{solicitacao.tipo}</span>
                                    <span className="status-solicitacao">{solicitacao.status}</span>
                                    <small>{solicitacao.criadoEm}</small>
                                </div>
                                <h2>{solicitacao.razaoSocial}</h2>
                                <p className="nome-fantasia">Nome Fantasia: {solicitacao.nomeFantasia}</p>
                                <div className="dados-solicitacao">
                                    <span><strong>CNPJ:</strong> {solicitacao.cnpj}</span>
                                    <span><strong>Local:</strong> {solicitacao.local}</span>
                                    <span><strong>E-mail:</strong> {solicitacao.email}</span>
                                    <span><strong>Tel./WhatsApp:</strong> {solicitacao.telefone}</span>
                                </div>
                            </div>

                            <div className="acoes-solicitacao" aria-label={`Ações para ${solicitacao.razaoSocial}`}>
                                <button
                                    className="acao-aprovar"
                                    type="button"
                                    onClick={() => atualizarSolicitacao(solicitacao.id, "Cadastro Aprovado", false)}
                                >
                                    ✓ Aprovar Cadastro
                                </button>
                                <button
                                    className="acao-ajustes"
                                    type="button"
                                    onClick={() => atualizarSolicitacao(solicitacao.id, "Ajustes Solicitados", true)}
                                >
                                    ⟳ Solicitar Ajustes
                                </button>
                                <button
                                    className="acao-recusar"
                                    type="button"
                                    onClick={() => atualizarSolicitacao(solicitacao.id, "Cadastro Recusado", false)}
                                >
                                    ⊘ Recusar / Bloquear
                                </button>
                            </div>
                        </article>
                    ))}
                    {registrosVisiveis.length === 0 && (
                        <p className="estado-vazio-solicitacoes">Nenhuma solicitação encontrada com os filtros selecionados.</p>
                    )}
                </div>

                <footer className="rodape-lista-solicitacoes">
                    <span>
                        Mostrando {solicitacoesFiltradas.length ? (paginaAtual - 1) * itensPorPagina + 1 : 0}
                        –{Math.min(paginaAtual * itensPorPagina, solicitacoesFiltradas.length)} de {solicitacoesFiltradas.length} registros
                        {aba === "fila" ? " pendentes" : " no histórico"}
                    </span>
                    <nav className="paginacao-solicitacoes" aria-label="Paginação das solicitações">
                        <button type="button" disabled={paginaAtual === 1} onClick={() => setPagina(paginaAtual - 1)}>Anterior</button>
                        {Array.from({ length: totalPaginas }, (_, indice) => (
                            <button
                                className={paginaAtual === indice + 1 ? "pagina-atual" : ""}
                                key={indice + 1}
                                type="button"
                                aria-current={paginaAtual === indice + 1 ? "page" : undefined}
                                onClick={() => setPagina(indice + 1)}
                            >
                                {indice + 1}
                            </button>
                        ))}
                        <button type="button" disabled={paginaAtual === totalPaginas} onClick={() => setPagina(paginaAtual + 1)}>Próxima</button>
                    </nav>
                </footer>
            </section>
        </main>
    );
}

export default SolicitacoesCadastro;
