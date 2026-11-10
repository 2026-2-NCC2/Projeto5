import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import CardProposta from "../components/cardProposta";
import { useAuth } from "../contextos/useAuth";
import { listarPropostas } from "../servicos/propostasServico";
import "../styles/ComparacaoPropostaOrg.css";

function ComparacaoPropostaOrg() {
    const { perfil, token } = useAuth();
    const [searchParams] = useSearchParams();
    const itemCusto = searchParams.get("itemCusto");
    const [propostas, setPropostas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [tentativa, setTentativa] = useState(0);
    const perfilFornecedor = perfil === "fornecedor";
    const titulo = perfilFornecedor ? "Propostas Enviadas" : "Minhas Cotações";
    const tituloLista = perfilFornecedor ? "Propostas enviadas" : "Propostas recebidas";

    useEffect(() => {
        let cancelado = false;

        async function carregarPropostas() {
            setCarregando(true);
            setErro("");

            try {
                const resultado = await listarPropostas(
                    token,
                    perfilFornecedor ? null : itemCusto,
                );
                if (!cancelado) setPropostas(resultado);
            } catch (erroRequisicao) {
                if (!cancelado) setErro(erroRequisicao.message);
            } finally {
                if (!cancelado) setCarregando(false);
            }
        }

        carregarPropostas();
        return () => {
            cancelado = true;
        };
    }, [itemCusto, perfilFornecedor, tentativa, token]);

    return (
        <main className="comparacao-proposta-org-pagina">
            <div className="comparacao-proposta-org-container">
                <BotaoVoltar className="comparacao-proposta-org-voltar" />

                <header className="comparacao-proposta-org-cabecalho">
                    <h1>{titulo}</h1>
                    <p>
                        {perfilFornecedor
                            ? "Acompanhe o status e os valores das propostas enviadas aos eventos."
                            : itemCusto
                                ? "Propostas recebidas para o item de custo selecionado."
                                : "Consulte as propostas recebidas para os itens de custo dos seus eventos."}
                    </p>
                </header>

                <section className="comparacao-proposta-org-lista" aria-label={tituloLista}>
                    {carregando && (
                        <p className="comparacao-proposta-org-estado" role="status">
                            Carregando propostas...
                        </p>
                    )}
                    {!carregando && erro && (
                        <div className="comparacao-proposta-org-estado comparacao-proposta-org-erro" role="alert">
                            <p>{erro}</p>
                            <button type="button" onClick={() => setTentativa((valor) => valor + 1)}>
                                Tentar novamente
                            </button>
                        </div>
                    )}
                    {!carregando && !erro && propostas.length === 0 && (
                        <p className="comparacao-proposta-org-estado">
                            {itemCusto && !perfilFornecedor
                                ? "Nenhuma proposta recebida para este item de custo."
                                : "Nenhuma proposta cadastrada."}
                        </p>
                    )}
                    {!carregando && !erro && propostas.map((proposta, indice) => (
                        <CardProposta
                            key={`${proposta.codItem}-${proposta.idFornecedor}-${indice}`}
                            proposta={proposta}
                            perfil={perfil}
                        />
                    ))}
                </section>
            </div>
        </main>
    );
}

export default ComparacaoPropostaOrg;
