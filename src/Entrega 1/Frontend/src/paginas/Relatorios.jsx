import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Relatorios.css";

// Dados estáticos para ilustrar o relatório enquanto a aplicação não possui API.
const dadosMock = {
    indicadores: [
        { rotulo: "Volume Financeiro", valor: "R$ 14.820.450", variacao: "▲ 14,2% vs. mês anterior" },
        { rotulo: "Total de Permutas", valor: "280.412 unid.", variacao: "● 98,4% liquidação" },
        { rotulo: "Score Compliance", valor: "99,8%", variacao: "✓ Auditoria verificada" },
    ],
    modulos: [
        { id: "eventos", letra: "E", titulo: "Eventos & Festivais", detalhe: "34 eventos ativos • 98,4% ocupação média • 12 categorias", etiqueta: "Principal" },
        { id: "usuarios", letra: "U", titulo: "Usuários & Credenciados", detalhe: "1.420 usuários cadastrados • 98% ativos • 42 novos", etiqueta: "Controle B2B" },
        { id: "tickets", letra: "T", titulo: "Tickets & Permutas B2B", detalhe: "280.000 ingressos transacionados • R$ 14,8M volume", etiqueta: "Volume Alto" },
        { id: "fornecedores", letra: "F", titulo: "Fornecedores & Infraestrutura", detalhe: "86 empresas homologadas • 9 cotações vigentes", etiqueta: "SLA 99,4%" },
        { id: "organizadores", letra: "O", titulo: "Organizadores & Promotores", detalhe: "58 produtoras ativas • 100% aderência contratual", etiqueta: "Compliance A+" },
    ],
    semanas: [
        { nome: "Semana 01 (Consolidado)", eventos: 42, usuarios: 28, fornecedores: 18 },
        { nome: "Semana 02 (Consolidado)", eventos: 56, usuarios: 39, fornecedores: 29 },
        { nome: "Semana 03 (Consolidado)", eventos: 64, usuarios: 48, fornecedores: 37 },
        { nome: "Semana 04 (Projetada)", eventos: 76, usuarios: 63, fornecedores: 48 },
    ],
    linhas: [
        { modulo: "Eventos", entidade: "Festival Arena São Paulo 2025", volume: "45.000 tkt / R$ 3,8M", status: "Homologado" },
        { modulo: "Usuários", entidade: "Corporate Pass Brasil Ltda (Matriz)", volume: "320 credenciados ativos", status: "Verificado" },
        { modulo: "Tickets", entidade: "Lote VIP Corporate - Etapa 02", volume: "12.500 permutas / R$ 1,2M", status: "Concluído" },
        { modulo: "Fornecedores", entidade: "Logística Express & Acessos S/A", volume: "100% Catracas integradas", status: "Ativo" },
        { modulo: "Organizadores", entidade: "Produtora Horizonte Cultural", volume: "8 eventos consolidados", status: "Verificado" },
    ],
};

const periodoPadrao = "30";
const modulosPadrao = dadosMock.modulos.map((modulo) => modulo.id);

function Relatorios() {
    const navigate = useNavigate();
    const [modulosSelecionados, setModulosSelecionados] = useState(modulosPadrao);
    const [periodo, setPeriodo] = useState(periodoPadrao);
    const [formato, setFormato] = useState("pdf");
    const [mensagem, setMensagem] = useState("");
    const [previaAberta, setPreviaAberta] = useState(false);

    // Alterna a inclusão de um módulo no consolidado.
    function alternarModulo(id) {
        setModulosSelecionados((selecionados) => (
            selecionados.includes(id)
                ? selecionados.filter((item) => item !== id)
                : [...selecionados, id]
        ));
        setMensagem("");
    }

    // Marca ou desmarca todos os módulos disponíveis.
    function alternarTodosModulos() {
        setModulosSelecionados((selecionados) => (
            selecionados.length === dadosMock.modulos.length ? [] : modulosPadrao
        ));
        setMensagem("");
    }

    // No MVP, apresenta confirmação local; a geração e exportação serão conectadas ao backend.
    function gerarRelatorio() {
        if (modulosSelecionados.length === 0) {
            setMensagem("Selecione ao menos um módulo para gerar o relatório.");
            return;
        }

        setMensagem(`Relatório preparado em ${formato.toUpperCase()} com ${modulosSelecionados.length} módulo(s).`);
    }

    // Apresenta no gráfico apenas os dados correspondentes aos módulos selecionados.
    const exibeEventos = modulosSelecionados.includes("eventos") || modulosSelecionados.includes("tickets");
    const exibeUsuarios = modulosSelecionados.includes("usuarios");
    const exibeFornecedores = modulosSelecionados.includes("fornecedores") || modulosSelecionados.includes("organizadores");
    const linhasVisiveis = dadosMock.linhas.filter((linha) => (
        modulosSelecionados.includes(
            linha.modulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        )
    ));

    return (
        <main className="pagina-relatorios">
            <div className="relatorios-container">
                <button className="voltar-relatorios" type="button" onClick={() => navigate(-1)}>
                    ← Voltar
                </button>

                <section className="relatorios-painel" aria-labelledby="titulo-relatorios">
                    {/* Título da página e parâmetros de período/formato do relatório. */}
                    <header className="cabecalho-relatorios">
                        <div>
                            <h1 id="titulo-relatorios">Central de Relatórios &amp; Exportação Executiva</h1>
                            <p>Selecione as categorias no painel abaixo para compor a consolidação analítica e emitir o dossiê executivo auditável.</p>
                        </div>
                        <div className="configuracoes-relatorio">
                            <label>
                                Período de análise
                                <select value={periodo} onChange={(evento) => setPeriodo(evento.target.value)}>
                                    <option value="7">Últimos 7 dias</option>
                                    <option value="30">Últimos 30 dias (Mês vigente)</option>
                                    <option value="90">Últimos 90 dias</option>
                                    <option value="365">Último ano</option>
                                </select>
                            </label>
                            <label>
                                Formato padrão
                                <select value={formato} onChange={(evento) => setFormato(evento.target.value)}>
                                    <option value="pdf">Dossiê Executivo (PDF + Hash)</option>
                                    <option value="xlsx">Planilha de Dados (XLSX)</option>
                                    <option value="csv">Dados Consolidados (CSV)</option>
                                </select>
                            </label>
                        </div>
                    </header>

                    {/* Corpo da página: seleção dos módulos e visualização consolidada. */}
                    <div className="conteudo-relatorios">
                        <aside className="seletor-modulos">
                            <div className="titulo-modulos">
                                <h2>Módulos selecionáveis (esboço 8A)</h2>
                                <button type="button" onClick={alternarTodosModulos}>
                                    {modulosSelecionados.length === dadosMock.modulos.length ? "Desmarcar todos" : "Selecionar todos"}
                                </button>
                            </div>

                            <div className="lista-modulos">
                                {dadosMock.modulos.map((modulo) => {
                                    const selecionado = modulosSelecionados.includes(modulo.id);

                                    return (
                                        <button
                                            className={`modulo-relatorio ${selecionado ? "selecionado" : ""}`}
                                            key={modulo.id}
                                            type="button"
                                            aria-pressed={selecionado}
                                            onClick={() => alternarModulo(modulo.id)}
                                        >
                                            <span className={`icone-modulo icone-${modulo.id}`}>{modulo.letra}</span>
                                            <span className="texto-modulo">
                                                <strong>{modulo.titulo}</strong>
                                                <small>{modulo.detalhe}</small>
                                            </span>
                                            <span className="etiqueta-modulo">{modulo.etiqueta}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="resumo-modulos">
                                Total de {modulosSelecionados.length} módulo(s) selecionado(s) para o lote
                                <strong> Estimativa: ~1,84 MB</strong>
                            </p>
                        </aside>

                        <section className="previa-relatorio" aria-labelledby="titulo-previa">
                            <header className="titulo-previa">
                                <div>
                                    <h2 id="titulo-previa"><span /> Pré-visualização do consolidado analítico</h2>
                                    <p>Consolidação em tempo real dos módulos selecionados.</p>
                                </div>
                                <span className="periodo-previa">Período: 01/05 a 31/05/2025</span>
                            </header>

                            {/* Indicadores executivos apresentados no topo da prévia. */}
                            <div className="indicadores-relatorio">
                                {dadosMock.indicadores.map((indicador) => (
                                    <article className="indicador-relatorio" key={indicador.rotulo}>
                                        <span>{indicador.rotulo}</span>
                                        <strong>{indicador.valor}</strong>
                                        <small>{indicador.variacao}</small>
                                    </article>
                                ))}
                            </div>

                            {/* Gráfico feito com CSS para manter a página independente de bibliotecas externas. */}
                            <section className="grafico-relatorio" aria-label="Distribuição operacional por módulo">
                                <div className="cabecalho-grafico">
                                    <h3>Distribuição operacional por módulo</h3>
                                    <div className="legenda-grafico">
                                        {exibeEventos && <span><i className="legenda-eventos" /> Eventos/Tickets</span>}
                                        {exibeUsuarios && <span><i className="legenda-usuarios" /> Usuários</span>}
                                        {exibeFornecedores && <span><i className="legenda-fornecedores" /> Fornec./Org.</span>}
                                    </div>
                                </div>
                                <div className="barras-grafico">
                                    {dadosMock.semanas.map((semana) => (
                                        <div className="grupo-barras" key={semana.nome}>
                                            <div className="colunas-barras">
                                                {exibeEventos && <i className="barra-eventos" style={{ height: `${semana.eventos}%` }} />}
                                                {exibeUsuarios && <i className="barra-usuarios" style={{ height: `${semana.usuarios}%` }} />}
                                                {exibeFornecedores && <i className="barra-fornecedores" style={{ height: `${semana.fornecedores}%` }} />}
                                            </div>
                                            <span>{semana.nome}</span>
                                        </div>
                                    ))}
                                    {!exibeEventos && !exibeUsuarios && !exibeFornecedores && (
                                        <p className="aviso-grafico">Selecione Eventos, Usuários ou Fornecedores para exibir as séries do gráfico.</p>
                                    )}
                                </div>
                            </section>

                            {/* Tabela com uma amostra dos dados que integrarão a exportação. */}
                            <section className="amostra-relatorio">
                                <div className="cabecalho-amostra">
                                    <h3>Amostra estruturada de saída</h3>
                                    <span>Exibindo 1–{linhasVisiveis.length} de {linhasVisiveis.length} linhas</span>
                                </div>
                                <div className="tabela-relatorio-wrap">
                                    <table className="tabela-relatorio">
                                        <thead>
                                            <tr>
                                                <th>Origem</th>
                                                <th>Entidade / Descritivo</th>
                                                <th>Volume transacionado</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {linhasVisiveis.map((linha) => (
                                                <tr key={`${linha.modulo}-${linha.entidade}`}>
                                                    <td><strong>[{linha.modulo.charAt(0).toUpperCase()}] {linha.modulo}</strong></td>
                                                    <td>{linha.entidade}</td>
                                                    <td>{linha.volume}</td>
                                                    <td><span className={`status-relatorio status-${linha.status.toLowerCase()}`}>{linha.status}</span></td>
                                                </tr>
                                            ))}
                                            {linhasVisiveis.length === 0 && (
                                                <tr><td className="tabela-vazia" colSpan="4">Selecione módulos para visualizar os registros.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="assinatura-relatorio">
                                    <span>✓ Certificação SHA-256 ativa • Logs de auditoria fiscal e conformidade LGPD</span>
                                    <code>HASH: ab9b2e...e481</code>
                                </div>
                            </section>
                        </section>
                    </div>

                    {/* Ações para gerar a exportação, agendar envio ou abrir uma prévia ampliada. */}
                    <section className="acoes-relatorio">
                        <div className="estado-configuracao">
                            <span>✓ Todos os parâmetros configurados</span>
                            <strong>Tamanho estimado: ~{(0.42 + modulosSelecionados.length * 0.28).toFixed(2)} MB</strong>
                        </div>
                        <button className="botao-gerar-relatorio" type="button" onClick={gerarRelatorio}>
                            <span aria-hidden="true">⇩</span>
                            GERAR RELATÓRIO
                            <small>{formato.toUpperCase()} / XLSX / CSV</small>
                        </button>
                        {mensagem && <p className="mensagem-relatorio" role="status">{mensagem}</p>}
                        <div className="atalhos-relatorio">
                            <button type="button" onClick={() => setMensagem("Agendamento de envio por e-mail disponível em uma próxima versão.")}>
                                ◷ Agendar envio automático por e-mail
                            </button>
                            <button type="button" onClick={() => setPreviaAberta(true)}>
                                ◉ Visualizar prévia em tela cheia
                            </button>
                        </div>
                    </section>
                </section>
            </div>

            {/* Janela de prévia ampliada para leitura da tabela, sem sair da página. */}
            {previaAberta && (
                <div className="sobreposicao-previa" role="presentation" onClick={() => setPreviaAberta(false)}>
                    <section
                        className="modal-previa-relatorio"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-previa"
                        onClick={(evento) => evento.stopPropagation()}
                    >
                        <header>
                            <div>
                                <h2 id="titulo-modal-previa">Prévia do relatório executivo</h2>
                                <p>{modulosSelecionados.length} módulo(s) selecionado(s) • {periodo} dias • {formato.toUpperCase()}</p>
                            </div>
                            <button type="button" aria-label="Fechar prévia" onClick={() => setPreviaAberta(false)}>×</button>
                        </header>
                        <div className="tabela-relatorio-wrap">
                            <table className="tabela-relatorio">
                                <thead>
                                    <tr>
                                        <th>Origem</th>
                                        <th>Entidade / Descritivo</th>
                                        <th>Volume transacionado</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {linhasVisiveis.map((linha) => (
                                        <tr key={`${linha.modulo}-${linha.entidade}`}>
                                            <td>{linha.modulo}</td>
                                            <td>{linha.entidade}</td>
                                            <td>{linha.volume}</td>
                                            <td>{linha.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}

export default Relatorios;
