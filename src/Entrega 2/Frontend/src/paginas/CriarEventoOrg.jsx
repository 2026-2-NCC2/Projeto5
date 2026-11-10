import { useState } from "react";
import BotaoVoltar from "../components/BotaoVoltar";
import "../styles/CriarEventoOrg.css";

// Opções de categorias mostradas no formulário de contratação do evento.
const dadosMock = [
    { id: "palco", nome: "Palco, Som & Iluminação", descricao: "PA line-array, rider, grids e consoles" },
    { id: "seguranca", nome: "Segurança Privada", descricao: "Vigilância e credenciamento PJB privado" },
    { id: "limpeza", nome: "Limpeza & Gestão de Resíduos", descricao: "Coleta seletiva, caçambas e sanitários" },
    { id: "acesso", nome: "Controle de Acesso & Catracas", descricao: "Leitores ópticos, validação e pulseiras" },
    { id: "abs", nome: "A&B (Alimentos e Bebidas)", descricao: "Operação de bar, catering e food trucks" },
];

function CriarEventoOrg() {
    // Guarda as categorias e anexos selecionados na interface local.
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState(["palco", "seguranca"]);
    const [arquivos, setArquivos] = useState([]);
    const [mensagem, setMensagem] = useState("");

    // Alterna uma categoria sem enviar os dados para um serviço externo.
    function alternarCategoria(idCategoria) {
        setCategoriasSelecionadas((selecionadas) =>
            selecionadas.includes(idCategoria)
                ? selecionadas.filter((id) => id !== idCategoria)
                : [...selecionadas, idCategoria],
        );
    }

    // Atualiza a lista de nomes dos documentos escolhidos pelo usuário.
    function selecionarArquivos(event) {
        setArquivos(Array.from(event.target.files ?? []));
    }

    // Simula o envio do formulário e apresenta uma confirmação local.
    function publicarEvento(event) {
        event.preventDefault();
        setMensagem("Demanda publicada neste protótipo. Nenhum dado foi enviado.");
    }

    return (
        <main className="criar-evento-org-pagina">
            <div className="criar-evento-org-container">
                {/* Cabeçalho da página com retorno e indicação do ambiente demonstrativo. */}
                <BotaoVoltar className="criar-evento-org-voltar" />
                <header className="criar-evento-org-cabecalho">
                    <div>
                        <h1>Publicar Novo Evento</h1>
                        <p>
                            Cadastre as informações, escopo e requisitos técnicos para receber propostas comerciais de fornecedores homologados.
                        </p>
                    </div>
                    <span className="criar-evento-org-selo"><i aria-hidden="true">✓</i> Ambiente Homologado &amp; Auditável</span>
                </header>

                <form className="criar-evento-org-formulario" onSubmit={publicarEvento}>
                    {/* Seção 1: informações básicas, datas e descrição do evento. */}
                    <section className="criar-evento-org-secao">
                        <header className="criar-evento-org-secao-cabecalho">
                            <span className="criar-evento-org-numero">1</span>
                            <div>
                                <h2>Informações Gerais do Evento</h2>
                                <p>Dados que identificam o evento e a localização da produção</p>
                            </div>
                            <span className="criar-evento-org-etiqueta">Obrigatório</span>
                        </header>

                        <div className="criar-evento-org-secao-conteudo">
                            <label className="criar-evento-org-campo">
                                Nome do evento <em>*</em>
                                <input name="nome" required placeholder="Ex.: Arena GastroFest Experience 2026 / Summit TechBR" />
                            </label>

                            <div className="criar-evento-org-grade-campos">
                                <label className="criar-evento-org-campo">
                                    Data de início <em>*</em>
                                    <input name="dataInicio" type="date" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Data de término <em>*</em>
                                    <input name="dataTermino" type="date" required />
                                </label>
                                <label className="criar-evento-org-campo">
                                    Público estimado (por dia) <em>*</em>
                                    <span className="criar-evento-org-input-sufixo">
                                        <input name="publico" type="number" min="1" required placeholder="Ex.: 8500" />
                                        <small>pessoas</small>
                                    </span>
                                </label>
                            </div>

                            <label className="criar-evento-org-campo">
                                Local / venue <em>*</em>
                                <span className="criar-evento-org-input-icone">
                                    <span aria-hidden="true">⌖</span>
                                    <input name="local" required placeholder="Ex.: Pavilhão de Exposições Anhembi - São Paulo, SP" />
                                </span>
                            </label>

                            <label className="criar-evento-org-campo">
                                Detalhes do evento <em>*</em>
                                <span className="criar-evento-org-ajuda">Visível gratuitamente para os fornecedores</span>
                                <textarea
                                    name="detalhes"
                                    rows="3"
                                    required
                                    placeholder="Descreva a temática do evento, perfil do público, volume de áreas, horários de funcionamento e aspectos que valorizem a parceria técnica e comercial..."
                                />
                            </label>
                        </div>
                    </section>

                    {/* Seção 2: orçamento previsto e condições comerciais. */}
                    <section className="criar-evento-org-secao">
                        <header className="criar-evento-org-secao-cabecalho">
                            <span className="criar-evento-org-numero">2</span>
                            <div>
                                <h2>Escopo e Orçamento Comercial</h2>
                                <p>Parâmetros financeiros, modelo contratual e limites de custo</p>
                            </div>
                            <span className="criar-evento-org-etiqueta">Comercial</span>
                        </header>

                        <div className="criar-evento-org-secao-conteudo">
                            <label className="criar-evento-org-campo criar-evento-org-orcamento-campo">
                                Orçamento teto estimado (R$) <em>*</em>
                                <span className="criar-evento-org-input-sufixo">
                                    <span className="criar-evento-org-moeda">R$</span>
                                    <input name="orcamento" type="number" min="0" step="0.01" required placeholder="480.000,00" />
                                    <small>Valor máximo</small>
                                </span>
                                <small className="criar-evento-org-nota">Valor de referência para triagem das propostas comerciais. Não impede negociação por lotes fracionados.</small>
                            </label>

                            <label className="criar-evento-org-campo">
                                Escopo comercial <em>*</em>
                                <span className="criar-evento-org-ajuda">Condições e contrapartidas</span>
                                <textarea
                                    name="escopo"
                                    rows="3"
                                    required
                                    placeholder="Detalhamento do modelo de negócio, condições de pagamento (ex: 30% sinal, 70% D+5 pós-evento), faturamento direto, cessão de credenciais VIP ou contrapartidas de marca para fornecedores..."
                                />
                            </label>
                        </div>
                    </section>

                    {/* Seção 3: categorias, requisitos técnicos e documentos de apoio. */}
                    <section className="criar-evento-org-secao">
                        <header className="criar-evento-org-secao-cabecalho">
                            <span className="criar-evento-org-numero">3</span>
                            <div>
                                <h2>Requisitos Técnicos e Demandas</h2>
                                <p>Categorias de contratação e especificações de engenharia e anexos</p>
                            </div>
                            <span className="criar-evento-org-etiqueta operacional">Operacional</span>
                        </header>

                        <div className="criar-evento-org-secao-conteudo">
                            <fieldset className="criar-evento-org-categorias">
                                <legend>Categorias necessárias para cotação <em>*</em></legend>
                                <p>Selecione todas as frentes de fornecimento que participarão desta RFP</p>
                                <div className="criar-evento-org-grade-categorias">
                                    {dadosMock.map((categoria) => (
                                        <label className="criar-evento-org-categoria" key={categoria.id}>
                                            <input
                                                type="checkbox"
                                                checked={categoriasSelecionadas.includes(categoria.id)}
                                                onChange={() => alternarCategoria(categoria.id)}
                                            />
                                            <span className="criar-evento-org-checkbox" aria-hidden="true" />
                                            <span>
                                                <strong>{categoria.nome}</strong>
                                                <small>{categoria.descricao}</small>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <label className="criar-evento-org-campo">
                                Descrição de requisitos técnicos específicos
                                <span className="criar-evento-org-ajuda">Normas &amp; conformidades</span>
                                <textarea
                                    name="requisitos"
                                    rows="3"
                                    placeholder="Ex.: Obrigatório apresentação de ART de montagem elétrica, laudo acústico calibrado para emissão máxima de 85dB nos limites perimetrais, conformidade com NR-10 e NR-35 para equipe técnica, seguros de responsabilidade civil..."
                                />
                            </label>

                            <fieldset className="criar-evento-org-upload">
                                <legend>Anexar plantas baixas, rider técnico ou briefing (PDF)</legend>
                                <label className="criar-evento-org-dropzone">
                                    <input type="file" accept=".pdf,.docx,.zip,application/pdf" multiple onChange={selecionarArquivos} />
                                    <span className="criar-evento-org-upload-icone" aria-hidden="true">⇧</span>
                                    <strong><u>Clique para selecionar arquivos ou arraste e solte aqui</u></strong>
                                    <small>Formatos aceitos: PDF, DOCX, ZIP (Tamanho máximo por arquivo: 50MB por arquivo)</small>
                                </label>
                                {arquivos.length > 0 && (
                                    <ul className="criar-evento-org-arquivos">
                                        {arquivos.map((arquivo) => (
                                            <li key={`${arquivo.name}-${arquivo.lastModified}`}>
                                                <span aria-hidden="true">{arquivo.name.split(".").pop().toUpperCase()}</span>
                                                <strong>{arquivo.name}</strong>
                                                <small>{(arquivo.size / (1024 * 1024)).toFixed(2)} MB</small>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </fieldset>
                        </div>
                    </section>

                    {/* Ações finais do formulário e mensagem local de confirmação. */}
                    <footer className="criar-evento-org-rodape-formulario">
                        <p><span aria-hidden="true">ⓘ</span> As informações cadastradas serão submetidas à verificação de compliance antes da abertura das cotações.</p>
                        {mensagem && <span className="criar-evento-org-feedback" role="status">{mensagem}</span>}
                        <div>
                            <button
                                className="criar-evento-org-salvar"
                                type="button"
                                onClick={() => setMensagem("Rascunho salvo apenas nesta demonstração.")}
                            >
                                Salvar Rascunho
                            </button>
                            <button className="criar-evento-org-publicar-demanda" type="submit">
                                <span aria-hidden="true">♧</span> Publicar Demanda para Fornecedores
                            </button>
                        </div>
                    </footer>
                </form>
            </div>
        </main>
    );
}

export default CriarEventoOrg;
