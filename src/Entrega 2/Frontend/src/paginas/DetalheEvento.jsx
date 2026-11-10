import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AcaoItemCusto from "../components/AcaoItemCusto";
import BotaoVoltar from "../components/BotaoVoltar";
import IndicadorPublico from "../components/IndicadorPublico";
import InformacaoEvento from "../components/InformacaoEvento";
import { useAuth } from "../contextos/useAuth";
import { buscarEventoPorId, cancelarEvento } from "../servicos/eventosServico";
import {
    formatarData,
    formatarDataHora,
    formatarHora,
    formatarMoeda,
    formatarNumero,
    statusLegivel,
} from "../utilitarios/eventoUtil";
import "../styles/DetalheEventoOrg.css";

function DetalheEvento() {
    const { id } = useParams();
    const { perfil, token } = useAuth();
    const [evento, setEvento] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [tentativa, setTentativa] = useState(0);
    const exibirPropostas = perfil === "admin" || perfil === "organizador";
    const podeCancelar = perfil === "admin" || perfil === "organizador";
    const [cancelando, setCancelando] = useState(false);
    const [erroCancelamento, setErroCancelamento] = useState("");
    const [mensagemCancelamento, setMensagemCancelamento] = useState("");
    const endereco = [
        evento?.logradouro,
        evento?.numeroEndereco,
        evento?.bairro,
        evento?.cidade,
        evento?.ufEstado,
        evento?.cep ? `CEP ${evento.cep}` : null,
    ].filter(Boolean).join(", ");

    useEffect(() => {
        let cancelado = false;

        async function carregar() {
            setCarregando(true);
            setErro("");
            setEvento(null);

            try {
                const resultado = await buscarEventoPorId(id, token);
                if (!cancelado) setEvento(resultado);
            } catch (erroRequisicao) {
                if (!cancelado) setErro(erroRequisicao.message);
            } finally {
                if (!cancelado) setCarregando(false);
            }
        }

        carregar();
        return () => {
            cancelado = true;
        };
    }, [id, token, tentativa]);

    async function handleCancelarEvento() {
        setCancelando(true);
        setErroCancelamento("");
        setMensagemCancelamento("");

        try {
            const eventoAtualizado = await cancelarEvento(id, token);
            setEvento((eventoAnterior) => ({ ...eventoAnterior, ...eventoAtualizado }));
            setMensagemCancelamento("Evento cancelado com sucesso.");
        } catch (erroRequisicao) {
            setErroCancelamento(erroRequisicao.message);
        } finally {
            setCancelando(false);
        }
    }

    if (carregando) {
        return (
            <main className="detalhe-evento-pagina">
                <div className="detalhe-evento-container">
                    <BotaoVoltar className="detalhe-voltar" />
                    <section className="detalhe-estado-api" role="status">Carregando detalhes do evento...</section>
                </div>
            </main>
        );
    }

    if (erro || !evento) {
        return (
            <main className="detalhe-evento-pagina">
                <div className="detalhe-evento-container">
                    <BotaoVoltar className="detalhe-voltar" />
                    <section className="detalhe-estado-api detalhe-estado-erro" role="alert">
                        <h1>{erro.includes("não encontrado") || erro.includes("permissão") ? "Evento não encontrado" : "Não foi possível carregar o evento"}</h1>
                        <p>{erro || "Não foi possível localizar este evento ou você não tem permissão para acessá-lo."}</p>
                        {erro && (
                            <button type="button" onClick={() => setTentativa((valor) => valor + 1)}>
                                Tentar novamente
                            </button>
                        )}
                    </section>
                </div>
            </main>
        );
    }

    const itensCusto = Array.isArray(evento.itensCusto) ? evento.itensCusto : [];

    return (
        <main className="detalhe-evento-pagina">
            <div className="detalhe-evento-container">
                <BotaoVoltar className="detalhe-voltar" />

                <section className="banner-evento">
                    <div className="banner-identificadores">
                        <span className="banner-status"><i /> {statusLegivel(evento.status)}</span>
                        <span className="banner-id">ID: #{evento.codEvento}</span>
                        <span className="banner-criacao">◷ Criado em {formatarDataHora(evento.criadoEm)}</span>
                    </div>
                    <div className="banner-titulo">
                        <h1>{evento.nome}</h1>
                        <div className="banner-metadados">
                            <span>▣ {formatarData(evento.dataInicio)} – {formatarData(evento.dataFinal)}</span>
                            <span>⌖ {[evento.localEvento, endereco].filter(Boolean).join(" · ") || "Local não informado"}</span>
                            <span>▤ {evento.nomeFantasia || "Organizador não informado"}</span>
                        </div>
                    </div>
                </section>

                <div className="detalhe-evento-grade">
                    <section className="painel-evento painel-informacoes">
                        <div className="painel-cabecalho">
                            <h2><span className="icone-painel">▣</span> Informações Gerais &amp; Cronograma</h2>
                            <span className="estado-planejamento">{statusLegivel(evento.status)}</span>
                        </div>
                        <div className="informacoes-grade">
                            <InformacaoEvento
                                rotulo="Período de realização"
                                valor={`${formatarData(evento.dataInicio)} – ${formatarData(evento.dataFinal)}`}
                                detalhe={`${formatarHora(evento.horarioInicio)} – ${formatarHora(evento.horarioFinal)}`}
                            />
                            <InformacaoEvento
                                rotulo="Montagem"
                                valor={formatarDataHora(evento.dataMontagem)}
                                detalhe="Data informada no cadastro do evento"
                            />
                            <InformacaoEvento
                                rotulo="Desmontagem"
                                valor={formatarDataHora(evento.dataDesmontagem)}
                                detalhe="Data informada no cadastro do evento"
                            />
                            <InformacaoEvento
                                rotulo="Local e endereço"
                                valor={evento.localEvento || "Local não informado"}
                                detalhe={endereco || "Endereço não informado"}
                            />
                            <InformacaoEvento
                                rotulo="Empresa organizadora responsável"
                                valor={evento.nomeFantasia || "Organizador não informado"}
                            />
                            {evento.descricao && (
                                <InformacaoEvento rotulo="Descrição" valor={evento.descricao} />
                            )}
                        </div>
                    </section>

                    <section className="painel-evento painel-publico">
                        <div className="painel-cabecalho">
                            <h2><span className="icone-painel">♟</span> Público &amp; Capacidade</h2>
                        </div>
                        <IndicadorPublico
                            rotulo="Público mínimo"
                            valor={evento.pubMinimo}
                            maximo={evento.pubMaximo}
                            classe="medidor-minimo"
                        />
                        <IndicadorPublico
                            rotulo="Público esperado"
                            valor={evento.pubEsperado}
                            maximo={evento.pubMaximo}
                            classe="medidor-esperado"
                        />
                        <IndicadorPublico
                            rotulo="Lotação máxima"
                            valor={evento.pubMaximo}
                            maximo={evento.pubMaximo}
                            classe="medidor-maximo"
                        />
                    </section>

                    {exibirPropostas && evento.estimativaTicket && (
                        <aside className="painel-evento painel-estimativa-ticket" aria-labelledby="titulo-estimativa-ticket">
                            <div className="painel-cabecalho">
                                <h2 id="titulo-estimativa-ticket">
                                    <span className="icone-painel">＄</span>
                                    Estimativa de Ticket por Público
                                </h2>
                            </div>
                            <p className="estimativa-ticket-custo">
                                Custo considerado
                                <strong>{formatarMoeda(evento.estimativaTicket.custoTotal)}</strong>
                            </p>
                            <div className="estimativa-ticket-cenarios">
                                {evento.estimativaTicket.cenarios.map((cenario) => (
                                    <article className="estimativa-ticket-cenario" key={cenario.rotulo}>
                                        <div>
                                            <strong>{cenario.rotulo}</strong>
                                            <span>
                                                Público: {formatarNumero(cenario.publico)}
                                                {" · "}Margem: {formatarNumero(Number(cenario.margem) * 100)}%
                                            </span>
                                        </div>
                                        <strong className="estimativa-ticket-valor">
                                            {formatarMoeda(cenario.ticket)}
                                        </strong>
                                    </article>
                                ))}
                            </div>
                        </aside>
                    )}

                    <section className="painel-evento painel-custos">
                        <div className="painel-cabecalho detalhe-custos-cabecalho">
                            <h2><span className="icone-painel">◉</span> Itens de Custo do Evento</h2>
                            {exibirPropostas && (
                                <div className="total-orcamento">
                                    <span>Total de propostas aprovadas</span>
                                    <strong>{formatarMoeda(evento.totalPropostasAprovadas)}</strong>
                                </div>
                            )}
                        </div>
                        <div className="tabela-custos-wrap">
                            <table className="tabela-custos">
                                <thead>
                                    <tr>
                                        <th>Categoria</th>
                                        <th>Quantidade / Informações</th>
                                        {exibirPropostas ? <th>Ações / Propostas recebidas</th> : <th>Status / Ação</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {itensCusto.map((item) => (
                                        <tr key={item.codItem}>
                                            <td>{item.categoria}</td>
                                            <td>
                                                {formatarNumero(item.quantidade)}
                                                {item.informacaoGeral && <small className="detalhe-item-informacao">{item.informacaoGeral}</small>}
                                            </td>
                                            <td>
                                                {exibirPropostas ? (
                                                    <div className="detalhe-acao-item-custo">
                                                        <AcaoItemCusto eventoId={evento.codEvento} item={item} perfil={perfil} />
                                                        <span>{item.propostas?.length ?? 0} recebidas</span>
                                                    </div>
                                                ) : (
                                                    <div className="detalhe-acao-item-custo">
                                                        <span>{statusLegivel(item.status)}</span>
                                                        <AcaoItemCusto eventoId={evento.codEvento} item={item} perfil={perfil} />
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {itensCusto.length === 0 && (
                                        <tr>
                                            <td colSpan="3">Nenhum item de custo cadastrado para este evento.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {exibirPropostas && (
                            <div className="resumo-financeiro">
                                <div>
                                    <span>Outros custos informados</span>
                                    <strong>{formatarMoeda(evento.outrosCustos)}</strong>
                                </div>
                                <div>
                                    <span>Margem de lucro cadastrada</span>
                                    <strong>{evento.margemLucro == null ? "Não informado" : `${evento.margemLucro}%`}</strong>
                                </div>
                                <div>
                                    <span>Ticket de equilíbrio</span>
                                    <strong>{formatarMoeda(evento.ticketEquilibrio)}</strong>
                                </div>
                                <div>
                                    <span>Ticket médio</span>
                                    <strong>{formatarMoeda(evento.ticketMedio)}</strong>
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {podeCancelar && (
                    <section className="controle-evento">
                        <div>
                            <h2>CONTROLE DO EVENTO</h2>
                            <p>
                                {evento.status === "cancelado"
                                    ? "Este evento está cancelado."
                                    : "Cancelar o evento altera seu status e impede novas operações."}
                            </p>
                            {erroCancelamento && <p className="mensagem-cancelamento-erro" role="alert">{erroCancelamento}</p>}
                            {mensagemCancelamento && <p className="mensagem-cancelamento-sucesso" role="status">{mensagemCancelamento}</p>}
                        </div>
                        {evento.status !== "cancelado" && (
                            <button
                                type="button"
                                className="botao-excluir-evento"
                                disabled={cancelando}
                                onClick={handleCancelarEvento}
                            >
                                {cancelando ? "Cancelando..." : "Excluir Evento"}
                            </button>
                        )}
                    </section>
                )}
            </div>
        </main>
    );
}

export default DetalheEvento;
