import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import CardBanner from "../components/cardBanner";
import { useAuth } from "../contextos/useAuth";
import { listarEventos } from "../servicos/eventosServico";
import "../styles/Eventos.css";

const FILTROS = [
    { id: "todos", texto: "Todos" },
    { id: "abertos", texto: "Abertos" },
    { id: "encerrados", texto: "Encerrados" },
];

function estaEncerrado(evento) {
    return ["cancelado", "realizado"].includes(evento.status);
}

function Eventos({ perfil: perfilProp }) {
    const { perfil: perfilSessao, token } = useAuth();
    const perfil = perfilProp || perfilSessao;
    const [eventos, setEventos] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        let cancelado = false;

        async function carregarEventos() {
            setCarregando(true);
            setErro("");

            try {
                const resultado = await listarEventos(token);
                if (!cancelado) setEventos(resultado);
            } catch (erroRequisicao) {
                if (!cancelado) {
                    setErro(erroRequisicao.message);
                    setEventos([]);
                }
            } finally {
                if (!cancelado) setCarregando(false);
            }
        }

        carregarEventos();

        return () => {
            cancelado = true;
        };
    }, [token, tentativa]);

    const eventosVisiveis = useMemo(() => {
        const termo = busca.trim().toLocaleLowerCase("pt-BR");

        return eventos.filter((evento) => {
            const statusEncerrado = estaEncerrado(evento);
            const correspondeFiltro = filtro === "todos"
                || (filtro === "abertos" && !statusEncerrado)
                || (filtro === "encerrados" && statusEncerrado);
            const correspondeBusca = !termo || [
                evento.nome,
                evento.nomeFantasia,
                evento.cidade,
                evento.ufEstado,
                evento.localEvento,
            ].some((campo) => String(campo || "").toLocaleLowerCase("pt-BR").includes(termo));

            return correspondeFiltro && correspondeBusca;
        });
    }, [busca, eventos, filtro]);

    const contagens = {
        todos: eventos.length,
        abertos: eventos.filter((evento) => !estaEncerrado(evento)).length,
        encerrados: eventos.filter(estaEncerrado).length,
    };

    const titulo = perfil === "fornecedor"
        ? "Eventos Disponíveis"
        : perfil === "organizador"
            ? "Meus Eventos"
            : "Eventos Cadastrados";

    return (
        <main className="pagina-lista-eventos">
            <section className="lista-eventos-conteudo" aria-labelledby="titulo-lista-eventos">
                <BotaoVoltar className="lista-eventos-voltar" />

                <header className="lista-eventos-cabecalho">
                    <h1 id="titulo-lista-eventos">{titulo}</h1>
                    <div className="lista-eventos-controles">
                        {perfil === "organizador" && (
                            <Link className="lista-eventos-botao lista-eventos-novo" to="/criar-evento-org">
                                ＋ Novo Evento
                            </Link>
                        )}
                        {perfil === "fornecedor" && (
                            <Link className="lista-eventos-botao lista-eventos-propostas" to="/fornecedor/propostas">
                                Minhas Propostas
                            </Link>
                        )}
                    </div>
                </header>

                <div className="lista-eventos-ferramentas">
                    <div className="lista-eventos-abas" role="group" aria-label="Filtrar eventos">
                        {FILTROS.map((aba) => (
                            <button
                                className={filtro === aba.id ? "ativa" : ""}
                                key={aba.id}
                                type="button"
                                aria-pressed={filtro === aba.id}
                                onClick={() => setFiltro(aba.id)}
                            >
                                {aba.texto} ({contagens[aba.id]})
                            </button>
                        ))}
                    </div>

                    <label className="lista-eventos-busca">
                        <span aria-hidden="true">⌕</span>
                        <input
                            aria-label="Buscar evento"
                            placeholder="Buscar evento..."
                            value={busca}
                            onChange={(event) => setBusca(event.target.value)}
                        />
                    </label>
                </div>

                {carregando && (
                    <p className="lista-eventos-mensagem" role="status">Carregando eventos...</p>
                )}

                {!carregando && erro && (
                    <div className="lista-eventos-mensagem lista-eventos-erro" role="alert">
                        <p>{erro}</p>
                        <button type="button" onClick={() => setTentativa((valor) => valor + 1)}>
                            Tentar novamente
                        </button>
                    </div>
                )}

                {!carregando && !erro && (
                    <section className="lista-eventos-cards" aria-label={titulo}>
                        {eventosVisiveis.map((evento) => (
                            <CardBanner key={evento.codEvento} evento={evento} perfil={perfil} />
                        ))}
                        {eventosVisiveis.length === 0 && (
                            <p className="lista-eventos-mensagem">
                                Nenhum evento encontrado para esta busca ou filtro.
                            </p>
                        )}
                    </section>
                )}
            </section>
        </main>
    );
}

export default Eventos;
