import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/DetalhePropostaOrg.css";

// Dados locais que alimentam a tela neste protótipo, sem chamadas a um backend.
const dadosMock = [
    {
        id: "EVT-8942",
        status: "Recebida",
        evento: "Festival Sunset Sound 2025",
        titulo: "Proposta: Sonorização Completa",
        fornecedor: "AudioPro Brasil Soluções Acústicas Ltda.",
        recebidoEm: "04/11/2025 às 14:32",
        lote: "Lote Técnico 01/04",
        valor: 158000,
        descricao:
            "Fornecimento, transporte logístico, montagem, operação técnica in loco e desmontagem de infraestrutura completa de sonorização profissional de alta fidelidade dimensionada para o Pavilhão Anhembi (área estimada de 18.000 m² e público diário de até 15.000 pessoas).",
        especificacoes: [
            "Sistema Principal (PA Line Array): 24x caixas Line Array d&b Audiotechnik / L-Acoustics K2 (12 por lado) com amplificação dedicada e processamento DSP digital redundante via rede Dante.",
            "Subwoofers & Front-Fill: 16x Subs duplos de 18” dispostos em configuração cardioide com alinhamento de fase em tempo real e caixas front-fill de cobertura frontal.",
            "Mesas de Operação (FOH & Monitor): 2x Consoles Digitais Digico SD12 / Yamaha Rivage PM com suporte nativo a 48 Canais Digitais, splitters óticos e cabeamento redundante.",
            "Sistemas Sem Fio & Microfonação: Kit rider rico completo Shure Axient Digital com microfones para headliners, baterias, percussão e 12 canais de in-ear monitoring (IEM).",
            "Cronograma Operacional: Montagem técnica e alinhamento acústico iniciando com antecedência estrita de 48 horas antes da abertura dos portões, incluindo passagem de som com os técnicos de todas as atrações principais.",
        ],
        equipe:
            "A equipe operacional designada é composta por 1 Coordenador Geral de Áudio, 2 Engenheiros de Sistema (PA/FOH), 2 Técnicos de Monitor, 1 Painel de Headloads, todos com equipamentos de proteção individual (EPI) certificados.",
        condicaoPagamento: "30% de adiantamento, 70% pós-evento via Smart Contract",
        garantia: "Pagamento retido no cofre TrocaTicket Escrow",
        validade: "10/11/2025",
        arquivos: [
            { nome: "Rider_Tecnico.pdf", tamanho: "4.2 MB", detalhe: "Diagrama de Patch e Cargas de Potência" },
            { nome: "Apolice_Seguro_RC.pdf", tamanho: "1.8 MB", detalhe: "Cobertura R$ 2.000.000 (Porto Seguro Cia)" },
            { nome: "ART_Montagem_Eletrica_CREA.pdf", tamanho: "940 KB", detalhe: "Registro Oficial CREA-SP homologado" },
        ],
    },
];

// Converte o valor numérico em moeda brasileira para exibição na tela.
const formatarMoeda = (valor) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(valor);

function DetalhePropostaOrg() {
    const navigate = useNavigate();
    // O ID vem da rota /propostas/:id e identifica a proposta exibida.
    const { id } = useParams();
    const proposta = dadosMock.find((item) => item.id === id);

    // Estes estados simulam o resultado das ações sem persistência externa.
    const [status, setStatus] = useState(proposta?.status ?? "Aguardando análise");
    const [mensagem, setMensagem] = useState("");

    // Registra no estado local o resultado de uma ação feita pelo usuário.
    const atualizarStatus = (novoStatus, textoFeedback) => {
        setStatus(novoStatus);
        setMensagem(textoFeedback);
    };

    // Informa quando o ID da URL não corresponde a nenhum dado simulado.
    if (!proposta) {
        return (
            <main className="detalhe-proposta-pagina">
                <div className="detalhe-proposta-container">
                    {/* Retorna à página anterior, como nas demais telas do sistema. */}
                    <BotaoVoltar className="proposta-voltar" />
                    <section className="proposta-nao-encontrada">
                        <h1>Proposta não encontrada</h1>
                        <p>Não há dados simulados para esta proposta.</p>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="detalhe-proposta-pagina">
            <div className="detalhe-proposta-container">
                {/* Mantém o mesmo padrão de navegação das outras páginas. */}
                <BotaoVoltar className="proposta-voltar" />

                {/* Identificação da proposta e informações de envio. */}
                <header className="proposta-cabecalho">
                    <div>
                        <p className="proposta-identificador">
                            RFP #{proposta.id} • {proposta.evento}
                        </p>
                        <h1>{proposta.titulo}</h1>
                        <p className="proposta-fornecedor">Enviado por: {proposta.fornecedor}</p>
                    </div>
                    <span className="proposta-data">◷ Recebida em {proposta.recebidoEm}</span>
                </header>
                <button
                    className="proposta-acao-comparar"
                    type="button"
                    onClick={() => navigate("/comparacao-proposta-org")}
                >
                    Comparar propostas
                </button>

                <div className="proposta-grade">
                    <div className="proposta-coluna-principal">
                        {/* Escopo do serviço e especificações informados pelo fornecedor. */}
                        <section className="proposta-painel">
                            <div className="proposta-painel-cabecalho">
                                <h2><span className="proposta-icone">♫</span>Descrição dos Serviços</h2>
                                <span className="proposta-lote">{proposta.lote}</span>
                            </div>
                            <p className="proposta-descricao">{proposta.descricao}</p>
                            <div className="proposta-especificacoes">
                                <h3>Especificação detalhada de equipamentos:</h3>
                                <ul>
                                    {proposta.especificacoes.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className="proposta-equipe">{proposta.equipe}</p>
                        </section>

                        {/* Lista de documentos anexados à proposta. */}
                        <section className="proposta-painel proposta-arquivos-painel">
                            <div className="proposta-painel-cabecalho">
                                <h2><span className="proposta-icone">↗</span>Arquivos Anexados</h2>
                                <span className="proposta-total-arquivos">{proposta.arquivos.length} arquivos auditados (PDF)</span>
                            </div>
                            <ul className="proposta-arquivos">
                                {proposta.arquivos.map((arquivo) => (
                                    <li className="proposta-arquivo" key={arquivo.nome}>
                                        <span className="proposta-pdf-icone" aria-hidden="true">▰</span>
                                        <span className="proposta-arquivo-info">
                                            <strong>{arquivo.nome}</strong>
                                            <small>{arquivo.tamanho} <span>•</span> {arquivo.detalhe}</small>
                                        </span>
                                        <button className="proposta-baixar" type="button" aria-label={`Baixar ${arquivo.nome}`}>
                                            ↓ <span>Baixar</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Resumo comercial e ações de análise da proposta. */}
                    <aside className="proposta-resumo">
                        <span className="proposta-rotulo">Valor total da proposta</span>
                        <strong className="proposta-valor">{formatarMoeda(proposta.valor)}</strong>
                        <p className="proposta-subtexto">Impostos incidentes e transporte logístico inclusos</p>

                        <div className="proposta-divisor" />
                        <section className="proposta-dado">
                            <h3>Condição de pagamento</h3>
                            <p><span aria-hidden="true">◉</span>{proposta.condicaoPagamento}</p>
                        </section>
                        <section className="proposta-dado">
                            <h3>Garantia &amp; custódia</h3>
                            <p><span aria-hidden="true">♧</span>{proposta.garantia}</p>
                        </section>
                        <section className="proposta-dado">
                            <h3>Validade</h3>
                            <p className="proposta-validade"><span aria-hidden="true">◷</span>Proposta válida até {proposta.validade}</p>
                        </section>

                        <div className="proposta-acoes">
                            <button
                                className="proposta-acao-aprovar"
                                type="button"
                                onClick={() => atualizarStatus("Aprovada", "Proposta aprovada neste protótipo.")}
                            >
                                Aprovar Proposta <span aria-hidden="true">→</span>
                            </button>
                            <button
                                className="proposta-acao-ajuste"
                                type="button"
                                onClick={() => atualizarStatus("Ajuste solicitado", "Solicitação de ajuste registrada neste protótipo.")}
                            >
                                ◉ Solicitar Ajuste
                            </button>
                            <button
                                className="proposta-acao-descartar"
                                type="button"
                                onClick={() => atualizarStatus("Descartada", "Proposta descartada neste protótipo.")}
                            >
                                ♧ Descartar Proposta
                            </button>
                        </div>
                        {/* Feedback visual e status atualizado após uma ação. */}
                        {mensagem && <p className="proposta-feedback" role="status">{mensagem}</p>}

                        <div className="proposta-seguranca">
                            <span aria-hidden="true">◆</span>
                            <span>Ambiente com assinatura digital e auditoria jurídica</span>
                        </div>
                        <span className="proposta-status" aria-live="polite">Status: {status}</span>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default DetalhePropostaOrg;
