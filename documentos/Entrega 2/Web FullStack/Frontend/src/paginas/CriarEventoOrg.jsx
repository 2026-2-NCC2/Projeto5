import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import { useAuth } from "../contextos/useAuth";
import { criarEvento } from "../servicos/eventosServico";
import "../styles/CriarEventoOrg.css";

const ITEM_CUSTO_VAZIO = {
    categoria: "",
    quantidade: "",
    informacao_geral: "",
};

function CriarEventoOrg() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [itensCusto, setItensCusto] = useState([{ ...ITEM_CUSTO_VAZIO }]);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    function atualizarItem(indice, campo, valor) {
        setItensCusto((itensAtuais) =>
            itensAtuais.map((item, posicao) =>
                posicao === indice ? { ...item, [campo]: valor } : item,
            ),
        );
    }

    function adicionarItem() {
        setItensCusto((itensAtuais) => [...itensAtuais, { ...ITEM_CUSTO_VAZIO }]);
    }

    function removerItem(indice) {
        setItensCusto((itensAtuais) => itensAtuais.filter((_, posicao) => posicao !== indice));
    }

    async function publicarEvento(event) {
        event.preventDefault();
        setErro("");
        setEnviando(true);

        const formulario = new FormData(event.currentTarget);
        const dadosEvento = Object.fromEntries(formulario.entries());

        try {
            const eventoCriado = await criarEvento(
                { evento: dadosEvento, itensCusto },
                token,
            );
            navigate(`/eventos/${eventoCriado.codEvento}/detalhes`);
        } catch (erroEnvio) {
            setErro(erroEnvio.message || "Não foi possível cadastrar o evento.");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="criar-evento-org-pagina">
            <div className="criar-evento-org-container">
                <BotaoVoltar className="criar-evento-org-voltar" />
                <header className="criar-evento-org-cabecalho">
                    <div>
                        <h1>Criar Novo Evento</h1>
                        <p>
                            Informe os dados do evento e seus itens de custo. O evento será criado
                            em planejamento para receber propostas de fornecedores.
                        </p>
                    </div>
                    <span className="criar-evento-org-selo">
                        <i aria-hidden="true">✓</i> Cadastro integrado ao banco de dados
                    </span>
                </header>

                <form className="criar-evento-org-formulario" onSubmit={publicarEvento}>
                    <section className="criar-evento-org-secao">
                        <header className="criar-evento-org-secao-cabecalho">
                            <span className="criar-evento-org-numero">1</span>
                            <div>
                                <h2>Dados do Evento</h2>
                                <p>Identificação, datas, localização e público</p>
                            </div>
                            <span className="criar-evento-org-etiqueta">Obrigatório</span>
                        </header>

                        <div className="criar-evento-org-secao-conteudo">
                            <label className="criar-evento-org-campo">
                                Nome do evento <em>*</em>
                                <input
                                    name="nome"
                                    maxLength="150"
                                    required
                                    placeholder="Ex.: Festival de Música"
                                />
                            </label>

                            <div className="criar-evento-org-grade-campos">
                                <label className="criar-evento-org-campo">
                                    Data de início <em>*</em>
                                    <input name="data_inicio" type="date" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Data final <em>*</em>
                                    <input name="data_final" type="date" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Horário de início <em>*</em>
                                    <input name="horario_inicio" type="time" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Horário final <em>*</em>
                                    <input name="horario_final" type="time" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Montagem (data e horário) <em>*</em>
                                    <input name="data_montagem" type="datetime-local" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Desmontagem (data e horário) <em>*</em>
                                    <input name="data_desmontagem" type="datetime-local" required />
                                </label>
                            </div>

                            <label className="criar-evento-org-campo">
                                Local do evento <em>*</em>
                                <input
                                    name="local_evento"
                                    maxLength="150"
                                    required
                                    placeholder="Nome do espaço ou local"
                                />
                            </label>

                            <div className="criar-evento-org-grade-campos">
                                <label className="criar-evento-org-campo">
                                    CEP <em>*</em>
                                    <input
                                        name="cep"
                                        maxLength="10"
                                        required
                                        placeholder="00000-000"
                                    />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Logradouro <em>*</em>
                                    <input name="logradouro" maxLength="150" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Número <em>*</em>
                                    <input name="numero_end" maxLength="20" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Bairro <em>*</em>
                                    <input name="bairro" maxLength="100" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Cidade <em>*</em>
                                    <input name="cidade" maxLength="100" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    UF <em>*</em>
                                    <input
                                        name="uf_estado"
                                        maxLength="2"
                                        required
                                        pattern="[A-Za-z]{2}"
                                        title="Informe a sigla de duas letras da UF."
                                        placeholder="SP"
                                    />
                                </label>
                            </div>

                            <div className="criar-evento-org-grade-campos">
                                <label className="criar-evento-org-campo">
                                    Público mínimo <em>*</em>
                                    <input name="pub_minimo" type="number" min="0" max="2147483647" step="1" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Público esperado <em>*</em>
                                    <input name="pub_esperado" type="number" min="0" max="2147483647" step="1" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Público máximo <em>*</em>
                                    <input name="pub_maximo" type="number" min="0" max="2147483647" step="1" required />
                                </label>
                            </div>

                            <label className="criar-evento-org-campo">
                                Descrição do evento <em>*</em>
                                <textarea
                                    name="descricao"
                                    maxLength="255"
                                    rows="3"
                                    required
                                    placeholder="Apresente as informações principais do evento."
                                />
                            </label>
                        </div>
                    </section>

                    <section className="criar-evento-org-secao">
                        <header className="criar-evento-org-secao-cabecalho">
                            <span className="criar-evento-org-numero">2</span>
                            <div>
                                <h2>Custos e Margem</h2>
                                <p>Valores usados nos cenários de estimativa do ingresso</p>
                            </div>
                            <span className="criar-evento-org-etiqueta">Financeiro</span>
                        </header>
                        <div className="criar-evento-org-secao-conteudo criar-evento-org-grade-campos">
                            <label className="criar-evento-org-campo">
                                Outros custos (R$) <em>*</em>
                                <input
                                    name="outros_custos"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    placeholder="0,00"
                                />
                            </label>
                            <label className="criar-evento-org-campo">
                                Margem de lucro (%) <em>*</em>
                                <input
                                    name="margem_lucro"
                                    type="number"
                                    min="0"
                                    max="40"
                                    step="0.01"
                                    required
                                    defaultValue="0"
                                />
                            </label>
                            <p className="criar-evento-org-nota">
                                A margem aceita valores de 0 a 40%. Ingressos de equilíbrio e médio
                                não são solicitados nesta etapa; o sistema calcula as estimativas
                                ao consultar os detalhes do evento.
                            </p>
                        </div>
                    </section>

                    <section className="criar-evento-org-secao">
                        <header className="criar-evento-org-secao-cabecalho">
                            <span className="criar-evento-org-numero">3</span>
                            <div>
                                <h2>Itens de Custo</h2>
                                <p>Cadastre cada demanda que poderá receber propostas</p>
                            </div>
                            <span className="criar-evento-org-etiqueta operacional">Obrigatório</span>
                        </header>
                        <div className="criar-evento-org-secao-conteudo">
                            {itensCusto.map((item, indice) => (
                                <fieldset className="criar-evento-org-item-custo" key={indice}>
                                    <legend>Item de custo {indice + 1}</legend>
                                    <div className="criar-evento-org-grade-campos">
                                        <label className="criar-evento-org-campo">
                                            Categoria <em>*</em>
                                            <input
                                                value={item.categoria}
                                                maxLength="100"
                                                required
                                                onChange={(event) =>
                                                    atualizarItem(indice, "categoria", event.target.value)
                                                }
                                                placeholder="Ex.: Segurança"
                                            />
                                        </label>
                                        <label className="criar-evento-org-campo">
                                            Quantidade <em>*</em>
                                            <input
                                                type="number"
                                                min="0.0000000001"
                                                step="any"
                                                value={item.quantidade}
                                                required
                                                onChange={(event) =>
                                                    atualizarItem(indice, "quantidade", event.target.value)
                                                }
                                            />
                                        </label>
                                    </div>
                                    <label className="criar-evento-org-campo">
                                        Descrição do item <em>*</em>
                                        <textarea
                                            value={item.informacao_geral}
                                            maxLength="255"
                                            rows="2"
                                            required
                                            onChange={(event) =>
                                                atualizarItem(indice, "informacao_geral", event.target.value)
                                            }
                                            placeholder="Detalhe o serviço, material ou requisito esperado."
                                        />
                                    </label>
                                    {itensCusto.length > 1 && (
                                        <button
                                            className="criar-evento-org-remover-item"
                                            type="button"
                                            onClick={() => removerItem(indice)}
                                        >
                                            Remover item
                                        </button>
                                    )}
                                </fieldset>
                            ))}
                            <button
                                className="criar-evento-org-adicionar-item"
                                type="button"
                                onClick={adicionarItem}
                            >
                                + Adicionar item de custo
                            </button>
                        </div>
                    </section>

                    <footer className="criar-evento-org-rodape-formulario">
                        <p>
                            <span aria-hidden="true">ⓘ</span>
                            O evento e todos os itens serão salvos juntos. Se algum item não puder
                            ser cadastrado, nenhuma parte da operação será persistida.
                        </p>
                        {erro && (
                            <span className="criar-evento-org-erro" role="alert">
                                {erro}
                            </span>
                        )}
                        <div>
                            <button
                                className="criar-evento-org-publicar-demanda"
                                type="submit"
                                disabled={enviando}
                            >
                                {enviando ? "Salvando evento..." : "Criar Evento"}
                            </button>
                        </div>
                    </footer>
                </form>
            </div>
        </main>
    );
}

export default CriarEventoOrg;
