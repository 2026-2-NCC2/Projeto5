import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/EnvioPropostaFor.css";

// Eventos disponíveis para proposta; os IDs correspondem às rotas do fluxo For.
const dadosMock = [
    {
        id: "EVT-2025-01",
        evento: "Festival Brasil Ritmos & Arte 2025 – 8ª Edição",
        organizador: "Produtora Horizonte Cultural",
        data: "14 a 16 Nov 2025",
        local: "Ibirapuera, SP",
        tetoOrcamentario: 180000,
        valorProposta: 28500,
        taxaPlataforma: 3,
        validadeDias: 15,
        pagamento: "30% adiantamento pré-montagem + 70% pós-evento via Smart Contract",
        descricao:
            "Fornecimento integral do sistema de sonorização para palco principal: Line Array ativo de alta pressão sonora (12 elementos/lado), 8 subs duplos 18”, console digital 48 canais, microfonia homologada Anatel, 16 Moving Heads e gerador redundante de 150kVA com operador técnico dedicado durante todo o evento.",
        arquivo: {
            nome: "Proposta_Tecnica_SoundWave_SunsetSound2025.pdf",
            tamanho: "2.8 MB",
        },
    },
    {
        id: "EVT-2025-02",
        evento: "Summit Inovação & Tecnologia SP 2025",
        organizador: "Nexus Tecnologia e Eventos",
        data: "02 a 04 Out 2025",
        local: "Transamerica Expo, SP",
        tetoOrcamentario: 95000,
        valorProposta: 26800,
        taxaPlataforma: 3,
        validadeDias: 12,
        pagamento: "30% na aprovação + 70% após a entrega e validação técnica",
        descricao: "Fornecimento e operação de painéis de LED P2.6, iluminação de palco e cenografia modular, incluindo montagem, testes e equipe técnica durante o evento.",
        arquivo: null,
    },
    {
        id: "EVT-2025-03",
        evento: "Circuito Gastronômico & Cervejeiro das Montanhas",
        organizador: "Circuito das Montanhas Produções",
        data: "22 a 24 Ago 2025",
        local: "Campos do Jordão, SP",
        tetoOrcamentario: 60000,
        valorProposta: 26800,
        taxaPlataforma: 3,
        validadeDias: 10,
        pagamento: "50% na contratação + 50% após a montagem",
        descricao: "Fornecimento de infraestrutura para quiosques, pontos refrigerados e geradores silenciosos, com montagem e suporte técnico durante o evento.",
        arquivo: null,
        encerrado: true,
    },
];

// Formata os números no padrão de moeda brasileira.
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(valor);
}

function EnvioPropostaFor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const evento = dadosMock.find((item) => item.id === id);

    // Protege a página contra IDs inválidos ou eventos encerrados.
    if (!evento || evento.encerrado) {
        return (
            <main className="envio-proposta-for-pagina">
                <div className="envio-proposta-for-container">
                    <BotaoVoltar className="envio-proposta-for-voltar-topo" />
                    <section className="envio-proposta-for-resumo">
                        <h2>{evento ? "Inscrições encerradas" : "Evento não encontrado"}</h2>
                        <p>{evento ? "Este evento não está mais recebendo propostas." : "Não há dados simulados para este evento."}</p>
                        <button type="button" onClick={() => navigate("/fornecedor/eventos")}>Ver eventos disponíveis</button>
                    </section>
                </div>
            </main>
        );
    }

    // A chave recria o formulário ao trocar de evento e reinicia seus campos.
    return <FormularioPropostaFor key={evento.id} evento={evento} />;
}

function FormularioPropostaFor({ evento }) {
    const navigate = useNavigate();

    // Estados locais dos campos editáveis e dos anexos selecionados.
    const [valorProposta, setValorProposta] = useState(evento.valorProposta);
    const [validadeDias, setValidadeDias] = useState(evento.validadeDias);
    const [pagamento, setPagamento] = useState(evento.pagamento);
    const [descricao, setDescricao] = useState(evento.descricao);
    const [arquivos, setArquivos] = useState(evento.arquivo ? [evento.arquivo] : []);
    const [mensagem, setMensagem] = useState("");

    // Calcula taxa e valor líquido localmente para atualizar a simulação financeira.
    const taxa = Number((valorProposta * evento.taxaPlataforma / 100).toFixed(2));
    const valorLiquido = Math.max(0, valorProposta - taxa);

    // Guarda os nomes dos arquivos escolhidos sem fazer upload para servidor.
    function atualizarArquivos(event) {
        const novosArquivos = Array.from(event.target.files ?? []).map((arquivo) => ({
            nome: arquivo.name,
            tamanho: `${(arquivo.size / (1024 * 1024)).toFixed(1)} MB`,
        }));

        setArquivos((atuais) => [...atuais, ...novosArquivos]);
        event.target.value = "";
    }

    // Remove um anexo da lista local.
    function removerArquivo(nomeArquivo) {
        setArquivos((atuais) => atuais.filter((arquivo) => arquivo.nome !== nomeArquivo));
    }

    // Guarda os dados enviados no estado de navegação para a lista de propostas.
    function enviarProposta(event) {
        event.preventDefault();
        navigate("/fornecedor/propostas", {
            state: {
                novaProposta: {
                    id: `PROP-${evento.id}`,
                    eventoId: evento.id,
                    evento: evento.evento,
                    fornecedor: "SoundWave Produções",
                    servico: evento.categoria ?? evento.evento,
                    status: "Em Análise",
                    valor: valorProposta,
                    observacao: `Validade de ${validadeDias} dias`,
                    pagamento,
                    descricao,
                    arquivos,
                    alerta: "",
                    icone: "♫",
                    tipoIcone: "palco",
                },
            },
        });
    }

    return (
        <main className="envio-proposta-for-pagina">
            <div className="envio-proposta-for-container">
                {/* Volta à tela anterior seguindo o padrão de navegação do projeto. */}
                <BotaoVoltar className="envio-proposta-for-voltar-topo" />

                {/* Cabeçalho explica a finalidade do formulário. */}
                <header className="envio-proposta-for-cabecalho">
                    <h1>Formulação e Envio de Proposta Comercial</h1>
                    <p>
                        Preencha a proposta de serviços técnicos para o evento selecionado, especificando composição de custos, validade comercial, escopo executivo e observações regulatórias.
                    </p>
                </header>

                {/* Resumo do evento para contextualizar a proposta sendo preparada. */}
                <section className="envio-proposta-for-evento">
                    <div>
                        <h2>{evento.evento}</h2>
                        <span>• {evento.organizador}</span>
                        <p><span aria-hidden="true">▣</span> {evento.data} <i>•</i> <span aria-hidden="true">⌖</span> {evento.local}</p>
                    </div>
                    <div className="envio-proposta-for-teto">
                        <span>Teto orçamentário</span>
                        <strong>{formatarMoeda(evento.tetoOrcamentario)}</strong>
                    </div>
                </section>

                <form className="envio-proposta-for-formulario" onSubmit={enviarProposta}>
                    <div className="envio-proposta-for-coluna-principal">
                        {/* Seção 1: termos comerciais, preço e liquidação. */}
                        <section className="envio-proposta-for-secao">
                            <header className="envio-proposta-for-secao-cabecalho">
                                <span>1</span>
                                <h2>Condições Comerciais &amp; Liquidação</h2>
                            </header>
                            <div className="envio-proposta-for-secao-conteudo">
                                <div className="envio-proposta-for-grade-campos">
                                    <label className="envio-proposta-for-campo">
                                        <span>Valor da proposta (R$) <em>*</em></span>
                                        <small className="envio-proposta-for-desconto">
                                            {valorProposta <= evento.tetoOrcamentario
                                                ? `${Math.round((1 - valorProposta / evento.tetoOrcamentario) * 100)}% abaixo do teto`
                                                : "Acima do teto"}
                                        </small>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            required
                                            value={valorProposta}
                                            onChange={(event) => setValorProposta(Number(event.target.value))}
                                        />
                                    </label>
                                    <label className="envio-proposta-for-campo">
                                        <span>Validade da proposta <em>*</em></span>
                                        <input
                                            type="number"
                                            min="1"
                                            required
                                            value={validadeDias}
                                            onChange={(event) => setValidadeDias(Number(event.target.value))}
                                        />
                                        <small className="envio-proposta-for-ajuda">dias</small>
                                    </label>
                                </div>
                                <label className="envio-proposta-for-campo envio-proposta-for-campo-pagamento">
                                    <span>Condição de pagamento e liquidação <em>*</em></span>
                                    <input
                                        type="text"
                                        required
                                        value={pagamento}
                                        onChange={(event) => setPagamento(event.target.value)}
                                    />
                                </label>
                            </div>
                        </section>

                        {/* Seção 2: escopo escrito e documentação de apoio. */}
                        <section className="envio-proposta-for-secao">
                            <header className="envio-proposta-for-secao-cabecalho">
                                <span>2</span>
                                <h2>Escopo Técnico &amp; Documentação</h2>
                                <small>{descricao.length} / 2000 caracteres</small>
                            </header>
                            <div className="envio-proposta-for-secao-conteudo">
                                <label className="envio-proposta-for-campo">
                                    <span>Descrição resumida dos serviços e rider <em>*</em></span>
                                    <textarea
                                        rows="5"
                                        maxLength="2000"
                                        required
                                        value={descricao}
                                        onChange={(event) => setDescricao(event.target.value)}
                                    />
                                </label>

                                {/* O input aceita documentos locais e lista seus nomes para revisão. */}
                                <label className="envio-proposta-for-upload">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf"
                                        multiple
                                        onChange={atualizarArquivos}
                                    />
                                    <span className="envio-proposta-for-upload-icone" aria-hidden="true">⇧</span>
                                    <strong>Anexe proposta técnica, planilhas e documentos regulatórios</strong>
                                    <small>Selecione um ou mais arquivos do seu dispositivo.</small>
                                </label>

                                {arquivos.length > 0 && (
                                    <ul className="envio-proposta-for-arquivos">
                                        {arquivos.map((arquivo) => (
                                            <li key={`${arquivo.nome}-${arquivo.tamanho}`}>
                                                <span className="envio-proposta-for-arquivo-icone" aria-hidden="true">PDF</span>
                                                <span className="envio-proposta-for-arquivo-info">
                                                    <strong>{arquivo.nome}</strong>
                                                    <small>{arquivo.tamanho} • Documento anexado localmente</small>
                                                </span>
                                                <button
                                                    type="button"
                                                    aria-label={`Remover ${arquivo.nome}`}
                                                    onClick={() => removerArquivo(arquivo.nome)}
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Resumo financeiro e ações do formulário. */}
                    <aside className="envio-proposta-for-resumo">
                        <h2>Simulação Financeira</h2>
                        <div className="envio-proposta-for-linha-financeira">
                            <span>Valor bruto</span>
                            <strong>{formatarMoeda(valorProposta)}</strong>
                        </div>
                        <div className="envio-proposta-for-linha-financeira">
                            <span>Taxa plataforma ({evento.taxaPlataforma}%)</span>
                            <strong className="envio-proposta-for-taxa">- {formatarMoeda(taxa)}</strong>
                        </div>
                        <div className="envio-proposta-for-liquido">
                            <span>Valor líquido a receber</span>
                            <strong>{formatarMoeda(valorLiquido)}</strong>
                        </div>

                        <button className="envio-proposta-for-submeter" type="submit">
                            <span aria-hidden="true">▷</span> Submeter Proposta
                        </button>
                        <div className="envio-proposta-for-acoes-secundarias">
                            <button
                                type="button"
                                onClick={() => setMensagem("Rascunho salvo apenas nesta demonstração.")}
                            >
                                ▤ Salvar
                            </button>
                            <BotaoVoltar />
                        </div>
                        {mensagem && <p className="envio-proposta-for-feedback" role="status">{mensagem}</p>}
                    </aside>
                </form>
            </div>
        </main>
    );
}

export default EnvioPropostaFor;
