import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/DetalhePropostaFor.css";

// Eventos e exigências simulados correspondentes à listagem de EventosFor.
const dadosMock = [
    {
        id: "EVT-2025-01",
        nome: "Festival Brasil Ritmos & Arte 2025 – 8ª Edição",
        chamada: "Convocatoria oficial para contratação de sonorização técnica, palcos modulares e sistemas de iluminação inteligente.",
        descricao:
            "Consolidado em sua 8ª edição no Pavilhão das Artes (Parque Ibirapuera), o festival reúne música instrumental, MPB e artes cênicas. O edital prevê fornecimento integral de sistemas de áudio com mitigação acústica e dois palcos em funcionamento alternado, em total conformidade com a regulamentação do Verde e Meio Ambiente de SP.",
        orcamento: 180000,
        diasRestantes: 5,
        data: "14 a 16 Nov",
        local: "Ibirapuera, SP",
        publico: "45.000 / dia",
        escopo: "2 Palcos Ativos",
        organizador: "Produtora Horizonte Cultural",
        requisitos: [
            { titulo: "Line Array & PA", detalhe: "SPL mín. 98dB regulamentado", icone: "♫" },
            { titulo: "Rider 48 Canais", detalhe: "Consoles digitais e Dante redundante", icone: "▤" },
            { titulo: "NR-10 & NR-35", detalhe: "Equipe certificada para altura e elétrica", icone: "⚡" },
            { titulo: "Seguro RC", detalhe: "Apólice mínima de R$ 500.000,00", icone: "♧" },
        ],
        categoria: "Sonorização Técnica",
    },
    {
        id: "EVT-2025-02",
        nome: "Summit Inovação & Tecnologia SP 2025",
        chamada: "Convocatória para contratação de iluminação, painéis de LED e cenografia modular.",
        descricao: "Encontro de inovação e tecnologia no Transamerica Expo, com painéis, demonstrações e apresentações para público corporativo. A produção busca fornecedores homologados para montagem de estruturas, cenografia e operação técnica.",
        orcamento: 95000,
        diasRestantes: 12,
        data: "02 a 04 Out",
        local: "Transamerica Expo, SP",
        publico: "8.000 / dia",
        escopo: "Auditório e áreas de exposição",
        organizador: "Nexus Tecnologia e Eventos",
        requisitos: [
            { titulo: "Painéis de LED", detalhe: "P2.6 ou resolução superior", icone: "▣" },
            { titulo: "Grid aéreo", detalhe: "Estruturas e pontos de suspensão certificados", icone: "▤" },
            { titulo: "NR-10 & NR-35", detalhe: "Equipe certificada para elétrica e altura", icone: "⚡" },
            { titulo: "Seguro RC", detalhe: "Apólice vigente para montagem e operação", icone: "♧" },
        ],
        categoria: "Iluminação & Cenografia",
    },
    {
        id: "EVT-2025-03",
        nome: "Circuito Gastronômico & Cervejeiro das Montanhas",
        chamada: "Convocatória para infraestrutura, pontos refrigerados e operação de bar.",
        descricao: "Festival gastronômico ao ar livre em Campos do Jordão, com quiosques de madeira, pontos refrigerados e infraestrutura de apoio. As inscrições para envio de propostas estão encerradas.",
        orcamento: 60000,
        diasRestantes: 0,
        data: "22 a 24 Ago",
        local: "Campos do Jordão, SP",
        publico: "6.000 / dia",
        escopo: "Quiosques e área de bar",
        organizador: "Circuito das Montanhas Produções",
        requisitos: [
            { titulo: "Quiosques", detalhe: "Estruturas de madeira tratada", icone: "▤" },
            { titulo: "Refrigeração", detalhe: "Pontos refrigerados para alimentos e bebidas", icone: "❄" },
            { titulo: "Geradores", detalhe: "Equipamentos silenciosos e redundantes", icone: "⚡" },
            { titulo: "Segurança", detalhe: "Operação conforme normas vigentes", icone: "♧" },
        ],
        categoria: "Infraestrutura & Bar",
        encerrado: true,
    },
];

// Exibe os valores monetários no padrão brasileiro.
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(valor);
}

function DetalhePropostaFor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const evento = dadosMock.find((item) => item.id === id);
    const [mensagem, setMensagem] = useState("");

    // Mostra uma resposta clara quando a rota contém um ID não reconhecido.
    if (!evento) {
        return (
            <main className="detalhe-proposta-for-pagina">
                <div className="detalhe-proposta-for-container">
                    <BotaoVoltar className="detalhe-proposta-for-voltar" />
                    <section className="detalhe-proposta-for-painel">
                        <h1>Evento não encontrado</h1>
                        <p>Não há dados simulados para este evento.</p>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="detalhe-proposta-for-pagina">
            <div className="detalhe-proposta-for-container">
                {/* Navegação de retorno no padrão utilizado pelo projeto. */}
                <BotaoVoltar className="detalhe-proposta-for-voltar" />

                {/* Nome e resumo da convocatória. */}
                <header className="detalhe-proposta-for-cabecalho">
                    <h1>{evento.nome}</h1>
                    <p>{evento.chamada}</p>
                </header>

                <div className="detalhe-proposta-for-grade">
                    {/* Capa representativa do evento, composta apenas por CSS. */}
                    <section className="detalhe-proposta-for-capa" aria-label="Imagem ilustrativa do evento">
                        <span className="detalhe-proposta-for-categoria">
                            ♫ {evento.categoria}
                        </span>
                        <span className="detalhe-proposta-for-capa-legenda">
                            ◉ Palco Principal • Pavilhão das Artes
                        </span>
                        <span className="detalhe-proposta-for-capa-selo">Edital Oficial</span>
                    </section>

                    {/* Quadro com orçamento, datas, local e ação de proposta. */}
                    <aside className="detalhe-proposta-for-resumo">
                        <div className="detalhe-proposta-for-orcamento">
                            <span>Teto orçamentário</span>
                            <span className="detalhe-proposta-for-prazo">◷ Faltam {evento.diasRestantes} dias</span>
                            <strong>{formatarMoeda(evento.orcamento)}</strong>
                            <small>(com tributos)</small>
                        </div>

                        <div className="detalhe-proposta-for-informacoes">
                            <div><span>▣</span><small>Datas<strong>{evento.data}</strong></small></div>
                            <div><span>⌖</span><small>Local<strong>{evento.local}</strong></small></div>
                            <div><span>♟</span><small>Público<strong>{evento.publico}</strong></small></div>
                            <div><span>▦</span><small>Escopo<strong>{evento.escopo}</strong></small></div>
                        </div>

                        <div className="detalhe-proposta-for-organizador">
                            <span>Organizador:</span>
                            <strong><i>H</i>{evento.organizador}</strong>
                        </div>

                        <button
                            className="detalhe-proposta-for-apresentar"
                            type="button"
                            disabled={evento.encerrado}
                            onClick={() => navigate(`/fornecedor/eventos/${evento.id}/proposta`)}
                        >
                            {evento.encerrado ? "Inscrições Encerradas" : "◉ Apresentar Proposta Comercial"}
                        </button>
                        <button
                            className="detalhe-proposta-for-edital"
                            type="button"
                            onClick={() => setMensagem("O edital está representado apenas para fins de demonstração.")}
                        >
                            ↓ Edital (PDF)
                        </button>
                    </aside>

                    {/* Descrição do evento e requisitos técnicos da convocatória. */}
                    <section className="detalhe-proposta-for-painel detalhe-proposta-for-sobre">
                        <h2><span aria-hidden="true">ⓘ</span> Sobre o Evento</h2>
                        <p>{evento.descricao}</p>
                    </section>

                    <section className="detalhe-proposta-for-painel detalhe-proposta-for-requisitos">
                        <header>
                            <h2><span aria-hidden="true">☷</span> Requisitos Técnicos</h2>
                            <span>{evento.requisitos.length} exigências</span>
                        </header>
                        <ul>
                            {evento.requisitos.map((requisito) => (
                                <li key={requisito.titulo}>
                                    <span aria-hidden="true">{requisito.icone}</span>
                                    <div>
                                        <strong>{requisito.titulo}</strong>
                                        <small>{requisito.detalhe}</small>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Mensagem acessível para ações demonstrativas sem backend. */}
                {mensagem && <p className="detalhe-proposta-for-feedback" role="status">{mensagem}</p>}
            </div>
        </main>
    );
}

export default DetalhePropostaFor;
