import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import { useAuth } from "../contextos/useAuth";
import { buscarPropostaPorId } from "../servicos/propostasServico";
import {
    formatarData,
    formatarDataHora,
    formatarMoeda,
    statusLegivel,
} from "../utilitarios/eventoUtil";
import "../styles/DetalheProposta.css";

function DetalheProposta() {
    const { codItem, idFornecedor } = useParams();
    const { perfil, token } = useAuth();
    const navigate = useNavigate();
    const [proposta, setProposta] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        let cancelado = false;

        async function carregarProposta() {
            setCarregando(true);
            setErro("");
            setProposta(null);

            try {
                const resultado = await buscarPropostaPorId(codItem, idFornecedor, token);
                if (!cancelado) setProposta(resultado);
            } catch (erroRequisicao) {
                if (!cancelado) setErro(erroRequisicao.message);
            } finally {
                if (!cancelado) setCarregando(false);
            }
        }

        carregarProposta();
        return () => {
            cancelado = true;
        };
    }, [codItem, idFornecedor, tentativa, token]);

    function enviarPropostaParaFormulario() {
        navigate(`/fornecedor/eventos/${encodeURIComponent(proposta.codEvento)}/proposta`, {
            state: {
                evento: {
                    codEvento: proposta.codEvento,
                    nome: proposta.nomeEvento,
                    cidade: proposta.cidade,
                    ufEstado: proposta.ufEstado,
                    dataInicio: proposta.dataInicio,
                    dataFinal: proposta.dataFinal,
                },
                itemCusto: {
                    codItem: proposta.codItem,
                    categoria: proposta.categoria,
                    informacaoGeral: proposta.informacaoGeral,
                },
            },
        });
    }

    if (carregando || erro || !proposta) {
        return (
            <main className="detalhe-proposta-pagina">
                <div className="detalhe-proposta-container">
                    <BotaoVoltar className="detalhe-proposta-voltar" />
                    {carregando ? (
                        <section className="detalhe-proposta-estado" role="status">
                            Carregando detalhes da proposta...
                        </section>
                    ) : (
                        <section className="detalhe-proposta-estado detalhe-proposta-estado-erro" role="alert">
                            <h1>Não foi possível carregar a proposta</h1>
                            <p>{erro || "Proposta não encontrada ou sem permissão para acessá-la."}</p>
                            {erro && (
                                <button type="button" onClick={() => setTentativa((valor) => valor + 1)}>
                                    Tentar novamente
                                </button>
                            )}
                        </section>
                    )}
                </div>
            </main>
        );
    }

    return (
        <main className="detalhe-proposta-pagina">
            <div className="detalhe-proposta-container">
                <BotaoVoltar className="detalhe-proposta-voltar" />

                <header className="detalhe-proposta-cabecalho">
                    <div>
                        <p className="detalhe-proposta-identificador">
                            Proposta para {proposta.nomeEvento}
                        </p>
                        <h1>{proposta.categoria}</h1>
                        {(perfil === "organizador" || perfil === "admin") && (
                            <p className="detalhe-proposta-fornecedor">
                                Enviada por {proposta.nomeFantasia || "Fornecedor sem nome"}
                            </p>
                        )}
                    </div>
                    <span className={`detalhe-proposta-status status-${proposta.status}`}>
                        {statusLegivel(proposta.status)}
                    </span>
                </header>

                <div className="detalhe-proposta-grade">
                    <div className="detalhe-proposta-coluna">
                        <section className="detalhe-proposta-painel">
                            <h2>Dados da proposta</h2>
                            <dl className="detalhe-proposta-dados">
                                <div>
                                    <dt>Valor</dt>
                                    <dd>{formatarMoeda(proposta.valor)}</dd>
                                </div>
                                <div>
                                    <dt>Validade</dt>
                                    <dd>{formatarDataHora(proposta.validade)}</dd>
                                </div>
                                <div>
                                    <dt>Status</dt>
                                    <dd>{statusLegivel(proposta.status)}</dd>
                                </div>
                                <div className="detalhe-proposta-dado-largo">
                                    <dt>Descrição</dt>
                                    <dd>{proposta.descricao || "Descrição não informada."}</dd>
                                </div>
                            </dl>
                        </section>

                        <section className="detalhe-proposta-painel">
                            <h2>Item de custo</h2>
                            <dl className="detalhe-proposta-dados">
                                <div>
                                    <dt>Categoria</dt>
                                    <dd>{proposta.categoria}</dd>
                                </div>
                                <div>
                                    <dt>Status</dt>
                                    <dd>{statusLegivel(proposta.statusItem)}</dd>
                                </div>
                                <div className="detalhe-proposta-dado-largo">
                                    <dt>Informações gerais</dt>
                                    <dd>{proposta.informacaoGeral || "Informações não informadas."}</dd>
                                </div>
                            </dl>
                        </section>

                        <section className="detalhe-proposta-painel">
                            <h2>Evento</h2>
                            <dl className="detalhe-proposta-dados">
                                <div>
                                    <dt>Nome</dt>
                                    <dd>{proposta.nomeEvento}</dd>
                                </div>
                                <div>
                                    <dt>Localização</dt>
                                    <dd>{[proposta.cidade, proposta.ufEstado].filter(Boolean).join(" / ") || "Não informado"}</dd>
                                </div>
                                <div>
                                    <dt>Data de início</dt>
                                    <dd>{formatarData(proposta.dataInicio)}</dd>
                                </div>
                                <div>
                                    <dt>Data final</dt>
                                    <dd>{formatarData(proposta.dataFinal)}</dd>
                                </div>
                                <div className="detalhe-proposta-dado-largo">
                                    <dt>Descrição</dt>
                                    <dd>{proposta.descricaoEvento || "Descrição não informada."}</dd>
                                </div>
                            </dl>
                        </section>
                    </div>

                    {perfil === "fornecedor" && (
                        <aside className="detalhe-proposta-aside">
                            <span className="detalhe-proposta-aside-icone" aria-hidden="true">↗</span>
                            <h2>Enviar proposta</h2>
                            <p>
                                Use os dados deste evento e do item de custo para preparar sua proposta comercial.
                            </p>
                            <div>
                                <span>Evento</span>
                                <strong>{proposta.nomeEvento}</strong>
                            </div>
                            <div>
                                <span>Item de custo</span>
                                <strong>{proposta.categoria}</strong>
                            </div>
                            <button type="button" onClick={enviarPropostaParaFormulario}>
                                Preparar proposta
                            </button>
                        </aside>
                    )}
                </div>
            </div>
        </main>
    );
}

export default DetalheProposta;
