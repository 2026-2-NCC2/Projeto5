import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Usuarios.css";

// Registros demonstrativos da tabela de gestão de usuários.
const dadosMock = [
    {
        id: "USR-001",
        nome: "Mariana Albuquerque",
        tipo: "Organizador",
        status: "Ativo",
        empresa: "Albuquerque Entretenimento & Festivais Ltda",
        email: "mariana@albuquerqueeventos.com.br",
        telefone: "(11) 96452-1100",
        regiao: "São Paulo, SP",
        cnpj: "23.456.789/0001-12",
        iniciais: "MA",
        cor: "roxo",
        perfil: true,
        acao: "Solicitações",
    },
    {
        id: "USR-002",
        nome: "Ricardo Silveira",
        tipo: "Fornecedor",
        status: "Ativo",
        empresa: "TicketPass Soluções de Bilheteria Integrada",
        email: "ricardo@ticketpass.com.br",
        telefone: "(21) 97123-4567",
        regiao: "Rio de Janeiro, RJ",
        cnpj: "18.987.654/0001-90",
        iniciais: "RS",
        cor: "azul",
        perfil: true,
        acao: "Histórico Repasses",
    },
    {
        id: "USR-003",
        nome: "Beatriz Nogueira",
        tipo: "Organizador",
        status: "Pendente de Documentação",
        empresa: "Vibe Produtora & Live Experience",
        email: "beatriz@vibeproducoes.art.br",
        telefone: "(31) 99341-8890",
        regiao: "Belo Horizonte, MG",
        cnpj: "45.123.890/0001-34",
        iniciais: "BN",
        cor: "laranja",
        perfil: false,
        acao: "Analisar Cadastro",
    },
    {
        id: "USR-004",
        nome: "Fernando Castro",
        tipo: "Fornecedor",
        status: "Ativo",
        empresa: "Prime Ingressos & Gestão de Acessos",
        email: "fernando.castro@primeingressos.com.br",
        telefone: "(41) 99822-4411",
        regiao: "Curitiba, PR",
        cnpj: "31.654.987/0001-05",
        iniciais: "FC",
        cor: "verde",
        perfil: true,
        acao: "Contratos",
    },
    {
        id: "USR-005",
        nome: "Camila Duarte",
        tipo: "Organizador",
        status: "Ativo",
        empresa: "Summit Brasil Congressos e Feiras Corporativas",
        email: "camila.duarte@summitbrasil.com.br",
        telefone: "(11) 97654-3210",
        regiao: "Campinas, SP",
        cnpj: "12.345.678/0001-56",
        iniciais: "CD",
        cor: "azul",
        perfil: true,
        acao: "Solicitações",
    },
];

const totalUsuariosMock = 1248;
const itensPorPagina = 5;

function Usuarios() {
    const navigate = useNavigate();
    const [busca, setBusca] = useState("");
    const [tipoFiltro, setTipoFiltro] = useState("Todos");
    const [statusFiltro, setStatusFiltro] = useState("Todos");
    const [regiaoFiltro, setRegiaoFiltro] = useState("Todas");
    const [pagina, setPagina] = useState(1);
    const [menuAberto, setMenuAberto] = useState(null);

    // Filtra os dados locais por nome, contato, empresa, tipo, situação e região.
    const usuariosFiltrados = useMemo(() => {
        const termo = busca.trim().toLocaleLowerCase("pt-BR");

        return dadosMock.filter((usuario) => {
            const correspondeBusca = !termo || [
                usuario.nome,
                usuario.empresa,
                usuario.email,
                usuario.cnpj,
            ].some((campo) => campo.toLocaleLowerCase("pt-BR").includes(termo));
            const correspondeTipo = tipoFiltro === "Todos" || usuario.tipo === tipoFiltro;
            const correspondeStatus = statusFiltro === "Todos" || usuario.status === statusFiltro;
            const correspondeRegiao = regiaoFiltro === "Todas" || usuario.regiao.includes(regiaoFiltro);

            return correspondeBusca && correspondeTipo && correspondeStatus && correspondeRegiao;
        });
    }, [busca, regiaoFiltro, statusFiltro, tipoFiltro]);

    // Calcula o trecho da lista visível e evita que a página exceda os resultados.
    const totalPaginas = Math.max(1, Math.ceil(usuariosFiltrados.length / itensPorPagina));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const usuariosVisiveis = usuariosFiltrados.slice(
        (paginaAtual - 1) * itensPorPagina,
        paginaAtual * itensPorPagina,
    );

    // Atualiza um filtro e reinicia a paginação para mostrar os primeiros resultados.
    function atualizarFiltro(acao) {
        acao();
        setPagina(1);
    }

    function executarAcao(usuario) {
        setMenuAberto(null);
        if (usuario.acao === "Analisar Cadastro") {
            navigate("/solicitacoes-cadastro");
        } else if (usuario.perfil) {
            navigate(`/usuarios/${usuario.id}`);
        } else {
            navigate("/solicitacoes-cadastro");
        }
    }

    return (
        <main className="pagina-usuarios">
            <section className="usuarios-container" aria-labelledby="titulo-usuarios">
                <button className="voltar-usuarios" type="button" onClick={() => navigate(-1)}>
                    ← Voltar
                </button>

                <header className="cabecalho-usuarios">
                    <div>
                        <div className="titulo-usuarios-linha">
                            <h1 id="titulo-usuarios">Gestão de Usuários</h1>
                            <span className="selo-corporativo">Módulo Corporativo</span>
                        </div>
                        <p>Gerencie organizadores de eventos e fornecedores cadastrados no ecossistema Troca Ticket.</p>
                    </div>
                    <button className="botao-exportar-usuarios" type="button" onClick={() => window.print()}>
                        ⇩ Exportar Relatório
                    </button>
                </header>

                {/* Indicadores executivos resumem os tipos de contas e pendências. */}
                <section className="indicadores-usuarios" aria-label="Resumo de usuários">
                    <article className="indicador-usuario">
                        <span>Total de usuários</span>
                        <strong>1.248</strong>
                        <small>Cadastros na base</small>
                        <b className="icone-indicador">♧</b>
                    </article>
                    <article className="indicador-usuario">
                        <span>Organizadores</span>
                        <strong>482</strong>
                        <small>Produtoras ativas</small>
                        <b className="icone-indicador">▣</b>
                    </article>
                    <article className="indicador-usuario">
                        <span>Fornecedores</span>
                        <strong>766</strong>
                        <small>Parceiros validados</small>
                        <b className="icone-indicador">▧</b>
                    </article>
                    <article className="indicador-usuario indicador-pendentes">
                        <span>Pendentes</span>
                        <strong>14</strong>
                        <small>Requerem validação</small>
                        <b className="icone-indicador">◷</b>
                    </article>
                </section>

                {/* Barra de pesquisa, categorias rápidas e filtros detalhados. */}
                <section className="filtros-usuarios" aria-label="Filtros de usuários">
                    <label className="busca-usuarios">
                        <span aria-hidden="true">⌕</span>
                        <input
                            aria-label="Buscar usuários"
                            placeholder="Buscar por nome, e-mail, CNPJ ou razão social..."
                            value={busca}
                            onChange={(evento) => atualizarFiltro(() => setBusca(evento.target.value))}
                        />
                        <kbd>Ctrl+K</kbd>
                    </label>

                    <div className="controles-usuarios">
                        <div className="abas-usuarios" aria-label="Filtrar por tipo">
                            {["Todos", "Organizador", "Fornecedor"].map((tipo) => {
                                const total = tipo === "Todos"
                                    ? totalUsuariosMock
                                    : tipo === "Organizador" ? 482 : 766;
                                const texto = tipo === "Todos"
                                    ? "Todos"
                                    : tipo === "Organizador" ? "Organizadores" : "Fornecedores";

                                return (
                                    <button
                                        className={tipoFiltro === tipo ? "aba-usuario ativa" : "aba-usuario"}
                                        type="button"
                                        key={tipo}
                                        onClick={() => atualizarFiltro(() => setTipoFiltro(tipo))}
                                    >
                                        {texto} <span>({total.toLocaleString("pt-BR")})</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="selects-usuarios">
                            <label>
                                <span className="sr-only">Filtrar por status</span>
                                <select value={statusFiltro} onChange={(evento) => atualizarFiltro(() => setStatusFiltro(evento.target.value))}>
                                    <option value="Todos">Status: Todos</option>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Pendente de Documentação">Pendente de Documentação</option>
                                </select>
                            </label>
                            <label>
                                <span className="sr-only">Filtrar por região</span>
                                <select value={regiaoFiltro} onChange={(evento) => atualizarFiltro(() => setRegiaoFiltro(evento.target.value))}>
                                    <option value="Todas">Região: Todas</option>
                                    <option value="São Paulo">São Paulo</option>
                                    <option value="Rio de Janeiro">Rio de Janeiro</option>
                                    <option value="Belo Horizonte">Belo Horizonte</option>
                                    <option value="Curitiba">Curitiba</option>
                                </select>
                            </label>
                            <span className="contagem-usuarios">Exibindo {usuariosVisiveis.length} de {totalUsuariosMock.toLocaleString("pt-BR")}</span>
                        </div>
                    </div>
                </section>

                {/* Lista de usuários com resumo de cadastro e atalhos contextuais. */}
                <section className="lista-usuarios" aria-label="Usuários cadastrados">
                    {usuariosVisiveis.map((usuario) => (
                        <article className={`linha-usuario ${usuario.status !== "Ativo" ? "linha-usuario-pendente" : ""}`} key={usuario.id}>
                            <button
                                className={`avatar-usuario avatar-${usuario.cor}`}
                                type="button"
                                aria-label={`Ver perfil de ${usuario.nome}`}
                                onClick={() => navigate(`/usuarios/${usuario.id}`)}
                            >
                                {usuario.iniciais}
                                <span className={usuario.status === "Ativo" ? "indicador-presenca" : "indicador-ausente"} />
                            </button>

                            <div className="dados-usuario">
                                <div className="nome-usuario-linha">
                                    <h2>{usuario.nome}</h2>
                                    <span className={`tipo-usuario tipo-usuario-${usuario.tipo.toLowerCase()}`}>{usuario.tipo}</span>
                                    <span className={`status-usuario ${usuario.status === "Ativo" ? "status-ativo" : "status-pendente"}`}>● {usuario.status}</span>
                                </div>
                                <p className="empresa-usuario"><span aria-hidden="true">▧</span> {usuario.empresa}</p>
                                <div className="metadados-usuario">
                                    <span>✉ {usuario.email}</span>
                                    <span>♧ {usuario.telefone}</span>
                                    <span>⌖ {usuario.regiao}</span>
                                    <span>▣ CNPJ: {usuario.cnpj}</span>
                                </div>
                            </div>

                            <div className="acoes-usuario">
                                <button type="button" onClick={() => navigate(`/usuarios/${usuario.id}`)}>Ver Perfil</button>
                                <button
                                    className={usuario.status === "Ativo" ? "acao-secundaria" : "acao-analisar"}
                                    type="button"
                                    onClick={() => executarAcao(usuario)}
                                >
                                    {usuario.acao}
                                </button>
                                <div className="menu-usuario-container">
                                    <button
                                        className="botao-menu-usuario"
                                        type="button"
                                        aria-label={`Mais ações para ${usuario.nome}`}
                                        aria-expanded={menuAberto === usuario.id}
                                        onClick={() => setMenuAberto(menuAberto === usuario.id ? null : usuario.id)}
                                    >
                                        ⋮
                                    </button>
                                    {menuAberto === usuario.id && (
                                        <div className="menu-usuario">
                                            <button type="button" onClick={() => navigate(`/usuarios/${usuario.id}`)}>Abrir perfil</button>
                                            <button type="button" onClick={() => navigate("/contato")}>Entrar em contato</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                    {usuariosVisiveis.length === 0 && (
                        <p className="estado-vazio-usuarios">Nenhum usuário corresponde aos filtros selecionados.</p>
                    )}
                </section>

                {/* Navegação pelas páginas dos resultados filtrados. */}
                <footer className="rodape-usuarios">
                    <div className="controle-itens-pagina">
                        <label htmlFor="itens-pagina">Itens por página:</label>
                        <select id="itens-pagina" value={itensPorPagina} disabled>
                            <option value="5">5</option>
                        </select>
                        <span>
                            Mostrando {usuariosVisiveis.length ? (paginaAtual - 1) * itensPorPagina + 1 : 0}
                            –{(paginaAtual - 1) * itensPorPagina + usuariosVisiveis.length} de {totalUsuariosMock.toLocaleString("pt-BR")}
                        </span>
                    </div>
                    <nav className="paginacao-usuarios" aria-label="Paginação de usuários">
                        <button type="button" disabled={paginaAtual === 1} onClick={() => setPagina(paginaAtual - 1)}>‹ Anterior</button>
                        <button className="pagina-usuario-atual" type="button" aria-current="page">{paginaAtual}</button>
                        <span>2</span><span>3</span><span>…</span><span>21</span>
                        <button type="button" disabled={paginaAtual === totalPaginas} onClick={() => setPagina(paginaAtual + 1)}>Próximo ›</button>
                    </nav>
                </footer>
            </section>
        </main>
    );
}

export default Usuarios;
