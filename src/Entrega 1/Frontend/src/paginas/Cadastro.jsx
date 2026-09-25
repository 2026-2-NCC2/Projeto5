
import "../styles/Cadastro.css";
import { useNavigate } from "react-router-dom";

function Cadastro() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        // A validação nativa impede este ponto quando um campo obrigatório está vazio.
        navigate("/cadastro-pendente");
    }

    return (
        <main className="pagina-cadastro">
            <section className="cadastro-conteudo" aria-labelledby="titulo-cadastro">
                <h1 id="titulo-cadastro">Cadastre a sua empresa</h1>
                <p className="observacao-obrigatorios">Os campos marcados com <strong>*</strong> são obrigatórios.</p>

                <form className="formulario-cadastro" onSubmit={handleSubmit}>
                    <fieldset className="etapa-cadastro">
                        <legend><span>Passo 1</span>Tipo de Atuação no Mercado</legend>
                        <div className="opcoes-atuacao">
                            <label className="opcao-atuacao">
                                <input type="radio" name="atuacao" value="organizador" defaultChecked />
                                <span><strong>Organizador de Eventos</strong><small>Produtoras de shows, congressos, eventos corporativos e feiras de negócios.</small></span>
                            </label>
                            <label className="opcao-atuacao">
                                <input type="radio" name="atuacao" value="fornecedor" />
                                <span><strong>Fornecedor de Serviços</strong><small>Sonorização, iluminação, cenografia, segurança privada, catering e estruturas.</small></span>
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className="etapa-cadastro">
                        <legend><span>Passo 2</span>Dados Jurídicos da Empresa</legend>
                        <div className="campo-cadastro campo-cnpj">
                            <label htmlFor="cnpj">CNPJ <em>*</em></label>
                            <input id="cnpj" name="cnpj" type="text" inputMode="numeric" placeholder="00.000.000/0000-00" required />
                        </div>
                        <div className="grade-campos">
                            <div className="campo-cadastro">
                                <label htmlFor="razao-social">Razão social <em>*</em></label>
                                <input id="razao-social" name="razaoSocial" type="text" placeholder="Razão Social completa" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="nome-fantasia">Nome fantasia <small>(opcional)</small></label>
                                <input id="nome-fantasia" name="nomeFantasia" type="text" placeholder="Nome comercial da empresa" />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="inscricao-estadual">Inscrição estadual</label>
                                <input id="inscricao-estadual" name="inscricaoEstadual" type="text" placeholder="Isento ou nº da inscrição" />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="inscricao-municipal">Inscrição municipal</label>
                                <input id="inscricao-municipal" name="inscricaoMunicipal" type="text" placeholder="Número da inscrição no município" />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="etapa-cadastro">
                        <legend><span>Passo 3</span>Contato Institucional &amp; Localização</legend>
                        <div className="grade-campos grade-endereco">
                            <div className="campo-cadastro campo-cep">
                                <label htmlFor="cep">CEP <em>*</em></label>
                                <input id="cep" name="cep" type="text" inputMode="numeric" placeholder="00000-000" required />
                            </div>
                            <div className="campo-cadastro campo-endereco">
                                <label htmlFor="endereco">Endereço / logradouro <em>*</em></label>
                                <input id="endereco" name="endereco" type="text" placeholder="Avenida, Rua, Alameda..." required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="numero">Número <em>*</em></label>
                                <input id="numero" name="numero" type="text" placeholder="Ex: 1040" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="complemento">Complemento</label>
                                <input id="complemento" name="complemento" type="text" placeholder="Sala, Andar, Bloco" />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="bairro">Bairro <em>*</em></label>
                                <input id="bairro" name="bairro" type="text" placeholder="Nome do bairro" required />
                            </div>
                            <div className="campo-cadastro campo-cidade">
                                <label htmlFor="cidade">Cidade <em>*</em></label>
                                <input id="cidade" name="cidade" type="text" placeholder="Ex: São Paulo" required />
                            </div>
                            <div className="campo-cadastro campo-uf">
                                <label htmlFor="uf">UF <em>*</em></label>
                                <select id="uf" name="uf" defaultValue="" required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="SP">SP</option>
                                    <option value="RJ">RJ</option>
                                    <option value="MG">MG</option>
                                    <option value="BA">BA</option>
                                    <option value="PR">PR</option>
                                </select>
                            </div>
                            <div className="campo-cadastro campo-email">
                                <label htmlFor="email-empresa">E-mail corporativo oficial <em>*</em></label>
                                <input id="email-empresa" name="emailEmpresa" type="email" placeholder="contato@empresa.com.br" required />
                            </div>
                            <div className="campo-cadastro campo-telefone">
                                <label htmlFor="telefone-empresa">Telefone da empresa <em>*</em></label>
                                <input id="telefone-empresa" name="telefoneEmpresa" type="tel" placeholder="(11) 3000-0000" required />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="etapa-cadastro">
                        <legend><span>Passo 4</span>Responsável Legal ou Operacional</legend>
                        <div className="grade-campos">
                            <div className="campo-cadastro">
                                <label htmlFor="responsavel">Nome completo do responsável <em>*</em></label>
                                <input id="responsavel" name="responsavel" type="text" placeholder="Ex: Roberto Mendes da Silva" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="cargo">Cargo / função <em>*</em></label>
                                <input id="cargo" name="cargo" type="text" placeholder="Ex: Diretor de Operações / Sócio" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="telefone-responsavel">Telefone celular / WhatsApp <em>*</em></label>
                                <input id="telefone-responsavel" name="telefoneResponsavel" type="tel" placeholder="(11) 98765-4321" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="email-responsavel">E-mail direto do responsável <em>*</em></label>
                                <input id="email-responsavel" name="emailResponsavel" type="email" placeholder="roberto@empresa.com.br" required />
                            </div>
                        </div>
                    </fieldset>

                    <label className="declaracao-cadastro">
                        <input type="checkbox" name="declaracao" />
                        <span>Declaro sob as penas da lei a veracidade dos dados corporativos fornecidos e manifesto concordância com os <a href="#termos">Termos de Homologação</a> e com a <a href="#privacidade">Política de Privacidade</a> da plataforma TrocaTicket.</span>
                    </label>

                    <div className="acoes-cadastro">
                        <a href="/login">Já possui cadastro homologado? Fazer login</a>
                        <button className="botao-cadastrar" type="submit">Concluir solicitação de cadastro</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Cadastro