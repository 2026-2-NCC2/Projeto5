import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DetalheEventoOrg.css";

// Informações de demonstração indexadas pelo mesmo ID recebido na rota /eventos/:id.
const dadosMock = [
    {
        id: "EVT-001",
        nome: "Festival Aurora Sound 2025",
        status: "Em cotação",
        criadoEm: "14/09/2025 às 09:30",
        orcamentoEstimado: 480000,
        periodo: "15 a 17 de Novembro de 2025",
        cronograma: "10/11 a 19/11 de 2025",
        local: "Pavilhão Anhembi",
        endereco: "São Paulo, SP",
        organizadora: "Horizon Eventos e Entretenimento Brasil",
        detalhesCronograma: "Check-in de equipamentos técnicos homologados",
        publicoMinimo: "12.000 pessoas",
        publicoEsperado: "25.000 pessoas",
        lotacaoMaxima: "30.000 pessoas",
        alvara: "Homologado Corpo Bombeiros",
        margemOperacional: 69600,
        taxaIntermediacao: 13440,
        custos: [
            { categoria: "Sonorização & Iluminação Cênica", fornecedor: "Som & Impacto Acústica Pro", valor: 185000, status: "Aprovada" },
            { categoria: "Cenografia, Pórticos & Stands", fornecedor: "Vértice Cenografia EPP", valor: 120000, status: "Aprovada" },
            { categoria: "Segurança Privada & Controle de Portaria", fornecedor: "AlphaShield Serviços Táticos", valor: 75000, status: "Em Análise" },
            { categoria: "Equipe de Apoio e Credenciamento B2B", fornecedor: "Nexus Produtora & Staff", valor: 55000, status: "Em Análise" },
            { categoria: "Geradores de Energia & Elétrica Auxiliar", fornecedor: "Aguardando cotação final (3 pendentes)", valor: 45000, status: "Pendente" },
        ],
    },
    {
        id: "EVT-002",
        nome: "Summit Corporativo TechBR 2025",
        status: "Confirmado",
        criadoEm: "22/10/2025 às 11:15",
        orcamentoEstimado: 215000,
        periodo: "04 e 05 de Dezembro de 2025",
        cronograma: "02/12 a 06/12 de 2025",
        local: "Royal Palm Hall",
        endereco: "Campinas, SP",
        organizadora: "Nexus B2B Conferences & Media",
        detalhesCronograma: "Montagem e teste de equipamentos audiovisuais",
        publicoMinimo: "2.500 pessoas",
        publicoEsperado: "4.000 pessoas",
        lotacaoMaxima: "5.000 pessoas",
        alvara: "Homologado Corpo Bombeiros",
        margemOperacional: 31175,
        taxaIntermediacao: 6020,
        custos: [
            { categoria: "Audiovisual e transmissão", fornecedor: "TechStage Produções", valor: 82000, status: "Aprovada" },
            { categoria: "Montagem de estandes", fornecedor: "Expo Cenografia", valor: 54000, status: "Aprovada" },
            { categoria: "Alimentação e coffee break", fornecedor: "Sabor & Companhia", valor: 39000, status: "Aprovada" },
            { categoria: "Equipe de apoio", fornecedor: "Nexus Staff", valor: 25000, status: "Aprovada" },
            { categoria: "Segurança e recepção", fornecedor: "CampSeg Serviços", valor: 15000, status: "Aprovada" },
        ],
    },
    {
        id: "EVT-003",
        nome: "Arena GastroFest Experience 2026",
        status: "Em aberto",
        criadoEm: "03/11/2025 às 14:40",
        orcamentoEstimado: 340000,
        periodo: "18 a 21 de Janeiro de 2026",
        cronograma: "15/01 a 22/01 de 2026",
        local: "ExpoMinas",
        endereco: "Belo Horizonte, MG",
        organizadora: "Minas Gastronomia & Shows Ltda.",
        detalhesCronograma: "Preparação de área gastronômica e montagem dos palcos",
        publicoMinimo: "8.000 pessoas",
        publicoEsperado: "16.000 pessoas",
        lotacaoMaxima: "20.000 pessoas",
        alvara: "Em análise pelo Corpo de Bombeiros",
        margemOperacional: 49300,
        taxaIntermediacao: 9520,
        custos: [
            { categoria: "Palcos e estrutura", fornecedor: "Minas Eventos", valor: 115000, status: "Em Análise" },
            { categoria: "Equipamentos de cozinha", fornecedor: "GastroPro Locações", valor: 78000, status: "Aprovada" },
            { categoria: "Sonorização e iluminação", fornecedor: "Luz & Som BH", valor: 65000, status: "Em Análise" },
            { categoria: "Segurança e atendimento", fornecedor: "Minas Staff", valor: 47000, status: "Pendente" },
            { categoria: "Limpeza e logística", fornecedor: "EcoServ Gerais", valor: 35000, status: "Pendente" },
        ],
    },
];

// Formata os valores financeiros exibidos no resumo e na tabela de custos.
const formatarMoeda = (valor) => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
}).format(valor);

function DetalheEventoOrg() {
    const navigate = useNavigate();
    // O ID da URL determina qual evento será carregado a partir dos dados locais.
    const { id } = useParams();

    // Estados locais que representam dados e estados de operação da página.
    const [dados, setDados] = useState(dadosMock);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const evento = dados.find((item) => item.id === id);

    // Exclui o evento no MVP e retorna à listagem; na integração, este é o ponto
    // para substituir a atualização local por uma requisição DELETE à API.
    const handleExcluir = async () => {
        setCarregando(true);
        setErro(null);

        try {
            // TODO BACKEND: Substituir pela chamada await api.delete(`/api/eventos/${id}`)
            setDados((eventosAtuais) => eventosAtuais.filter((item) => item.id !== id));
            navigate("/eventos", { replace: true });
        } catch {
            setErro("Não foi possível excluir o evento. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    // Feedback visual durante uma operação que poderá ser assíncrona com o backend.
    if (carregando) {
        return (
            <main className="detalhe-evento-pagina">
                <div className="detalhe-evento-container">
                    <button className="detalhe-voltar" type="button" onClick={() => navigate(-1)}>← Voltar</button>
                    <section className="detalhe-estado-api" role="status">Processando solicitação...</section>
                </div>
            </main>
        );
    }

    // Erro da operação com opção de repetir a ação.
    if (erro) {
        return (
            <main className="detalhe-evento-pagina">
                <div className="detalhe-evento-container">
                    <button className="detalhe-voltar" type="button" onClick={() => navigate(-1)}>← Voltar</button>
                    <section className="detalhe-estado-api detalhe-estado-erro" role="alert">
                        <p>{erro}</p>
                        <button type="button" onClick={handleExcluir}>Tentar novamente</button>
                    </section>
                </div>
            </main>
        );
    }

    // Protege a página contra IDs inválidos ou que não existam nos dados disponíveis.
    if (!evento) {
        return (
            <main className="detalhe-evento-pagina">
                <div className="detalhe-evento-container">
                    <button className="detalhe-voltar" type="button" onClick={() => navigate(-1)}>← Voltar</button>
                    <section className="detalhe-nao-encontrado">
                        <h1>Evento não encontrado</h1>
                        <p>Não foi possível localizar os detalhes deste evento.</p>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="detalhe-evento-pagina">
            <div className="detalhe-evento-container">
                <button className="detalhe-voltar" type="button" onClick={() => navigate(-1)}>← Voltar</button>

                {/* Banner de identificação: status, ID, data de criação e informações principais. */}
                <section className="banner-evento">
                    <div className="banner-identificadores">
                        <span className="banner-status"><i /> {evento.status}</span>
                        <span className="banner-id">ID: #{evento.id}</span>
                        <span className="banner-criacao">◷ Criado em {evento.criadoEm}</span>
                    </div>
                    <div className="banner-titulo">
                        <h1>{evento.nome}</h1>
                        <div className="banner-metadados">
                            <span>▣ {evento.periodo}</span>
                            <span>⌖ {evento.local} - {evento.endereco}</span>
                            <span>▤ {evento.organizadora}</span>
                        </div>
                    </div>
                </section>

                {/* Painéis organizados em grade para informações, capacidade e custos. */}
                <div className="detalhe-evento-grade">
                    {/* Dados gerais e cronograma operacional do evento. */}
                    <section className="painel-evento painel-informacoes">
                        <div className="painel-cabecalho">
                            <h2><span className="icone-painel">▣</span> Informações Gerais &amp; Cronograma Operacional</h2>
                            <span className="estado-planejamento">Planejamento Confirmado</span>
                        </div>
                        <div className="informacoes-grade">
                            <article className="informacao-item">
                                <span>Período de Realização</span>
                                <strong>{evento.periodo}</strong>
                                <small>Sexta, Sábado e Domingo · 14:00 às 04:00</small>
                            </article>
                            <article className="informacao-item">
                                <span>Montagem e Desmontagem</span>
                                <strong>{evento.cronograma}</strong>
                                <small>{evento.detalhesCronograma}</small>
                            </article>
                            <article className="informacao-item">
                                <span>Local e Endereço</span>
                                <strong>{evento.local}</strong>
                                <small>{evento.endereco}</small>
                            </article>
                            <article className="informacao-item">
                                <span>Empresa Organizadora Responsável</span>
                                <strong>{evento.organizadora} S/A</strong>
                            </article>
                        </div>
                    </section>

                    {/* Indicadores de público esperado e situação do alvará. */}
                    <section className="painel-evento painel-publico">
                        <div className="painel-cabecalho">
                            <h2><span className="icone-painel">♟</span> Público &amp; Capacidade</h2>
                        </div>
                        <div className="medidor-publico">
                            <div><span>Público Mínimo Garantido</span><strong>{evento.publicoMinimo}</strong></div>
                            <span className="medidor-trilho"><i className="medidor-minimo" /></span>
                        </div>
                        <div className="medidor-publico">
                            <div><span>Público Esperado (Target)</span><strong>{evento.publicoEsperado}</strong></div>
                            <span className="medidor-trilho"><i className="medidor-esperado" /></span>
                        </div>
                        <div className="medidor-publico">
                            <div><span>Lotação Máxima Permitida (Alvará)</span><strong>{evento.lotacaoMaxima}</strong></div>
                            <span className="medidor-trilho"><i className="medidor-maximo" /></span>
                        </div>
                        <p className="situacao-alvara">Alvará de Segurança: <strong>✓ {evento.alvara}</strong></p>
                    </section>

                    {/* Custos cotados, status de cada fornecedor e totais operacionais. */}
                    <section className="painel-evento painel-custos">
                        <div className="painel-cabecalho">
                            <h2><span className="icone-painel">◉</span> Composição de Custos &amp; Parâmetros Financeiros</h2>
                            <div className="total-orcamento">
                                <span>Orçamento Total Previsto</span>
                                <strong>{formatarMoeda(evento.orcamentoEstimado)}</strong>
                            </div>
                        </div>
                        <div className="tabela-custos-wrap">
                            <table className="tabela-custos">
                                <thead>
                                    <tr>
                                        <th>Categoria / Pacote Técnico</th>
                                        <th>Fornecedor Cotado</th>
                                        <th>Valor Estimado</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {evento.custos.map((custo) => (
                                        <tr key={custo.categoria}>
                                            <td>{custo.categoria}</td>
                                            <td>{custo.fornecedor}</td>
                                            <td>{formatarMoeda(custo.valor)}</td>
                                            <td><span className={`status-custo status-${custo.status.toLowerCase().replace(" ", "-")}`}>{custo.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="resumo-financeiro">
                            <div><span>Margem Operacional Alvo (14,5%):</span><strong>{formatarMoeda(evento.margemOperacional)}</strong></div>
                            <div><span>Taxa de Intermediação Operacional:</span><strong>2.8% ({formatarMoeda(evento.taxaIntermediacao)})</strong></div>
                        </div>
                    </section>
                </div>

                {/* Área de controle do evento e ação de exclusão. */}
                <section className="controle-evento">
                    <div>
                        <h2>CONTROLE DE OPERAÇÃO DO EVENTO</h2>
                        <p>Ações de decisão e governança corporativa sobre a cotação #{evento.id}.</p>
                    </div>
                    <button
                        type="button"
                        className="botao-excluir-evento"
                        disabled={carregando}
                        onClick={handleExcluir}
                    >
                        {carregando ? "Excluindo..." : "▤ Excluir Evento"}
                    </button>
                </section>
            </div>
        </main>
    );
}

export default DetalheEventoOrg;
