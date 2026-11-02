import { useNavigate, useParams } from "react-router-dom";
import "../styles/DetalheEvento.css";

const dadosMock = [
    {
        id: "EVT-001",
        nome: "Festival Aurora Sound 2025",
        status: "Em cotação",
        criadoEm: "14/09/2025 às 09:30",
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
        orcamento: 480000,
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
];

const formatarMoeda = (valor) => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
}).format(valor);

function DetalheEvento() {
    const navigate = useNavigate();
    const { id } = useParams();
    const evento = dadosMock.find((item) => item.id === id);

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

                <div className="detalhe-evento-grade">
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

                    <section className="painel-evento painel-custos">
                        <div className="painel-cabecalho">
                            <h2><span className="icone-painel">◉</span> Composição de Custos &amp; Parâmetros Financeiros</h2>
                            <div className="total-orcamento">
                                <span>Orçamento Total Previsto</span>
                                <strong>{formatarMoeda(evento.orcamento)}</strong>
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

                <section className="controle-evento">
                    <div>
                        <h2>CONTROLE DE OPERAÇÃO DO EVENTO</h2>
                        <p>Ações de decisão e governança corporativa sobre a cotação #{evento.id}.</p>
                    </div>
                    <button type="button" className="botao-excluir-evento">▤ Excluir Evento</button>
                </section>
            </div>
        </main>
    );
}

export default DetalheEvento;
