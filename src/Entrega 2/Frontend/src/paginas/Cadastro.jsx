
import "../styles/Cadastro.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../servicos/authServico";

function Cadastro() {
    const navigate = useNavigate();
    const [erroSenha, setErroSenha] = useState("");
    const [erroCadastro, setErroCadastro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const dados = new FormData(event.currentTarget);
        if (dados.get("senha") !== dados.get("confirmarSenha")) {
            setErroSenha("As senhas não coincidem.");
            return;
        }

        setErroSenha("");
        setErroCadastro("");
        setCarregando(true);

        const dadosCadastro = Object.fromEntries(dados.entries());
        delete dadosCadastro.confirmarSenha;

        try {
            const resultado = await cadastrarUsuario(dadosCadastro);
            if (resultado.status !== "pendente") {
                throw new Error("O servidor retornou uma resposta inesperada.");
            }
            navigate(resultado.redirecionarPara || "/cadastro-pendente");
        } catch (erro) {
            setErroCadastro(erro.message || "Não foi possível concluir o cadastro.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="pagina-cadastro">
            <section className="cadastro-conteudo" aria-labelledby="titulo-cadastro">
                <h1 id="titulo-cadastro">Cadastre a sua empresa</h1>
                <p className="observacao-obrigatorios">Todos os campos são obrigatórios.</p>

                <form className="formulario-cadastro" onSubmit={handleSubmit}>
                    <fieldset className="etapa-cadastro">
                        <legend><span>Passo 1</span>Tipo de Atuação no Mercado</legend>
                        <div className="opcoes-atuacao">
                            <label className="opcao-atuacao">
                                <input type="radio" name="tipo_perfil" value="organizador" defaultChecked required />
                                <span><strong>Organizador de Eventos</strong><small>Produtoras de shows, congressos, eventos corporativos e feiras de negócios.</small></span>
                            </label>
                            <label className="opcao-atuacao">
                                <input type="radio" name="tipo_perfil" value="fornecedor" required />
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
                                <input id="razao-social" name="razao_social" type="text" placeholder="Razão Social completa" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="nome-fantasia">Nome fantasia <em>*</em></label>
                                <input id="nome-fantasia" name="nome_fantasia" type="text" placeholder="Nome comercial da empresa" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="categoria">Categoria <em>*</em></label>
                                <input id="categoria" name="categoria" type="text" placeholder="Ex.: Produção de eventos" required />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="etapa-cadastro">
                        <legend><span>Passo 3</span>Localização</legend>
                        <div className="grade-campos grade-endereco">
                            <div className="campo-cadastro campo-cep">
                                <label htmlFor="cep">CEP <em>*</em></label>
                                <input id="cep" name="cep" type="text" inputMode="numeric" placeholder="00000-000" required />
                            </div>
                            <div className="campo-cadastro campo-endereco">
                                <label htmlFor="endereco">Endereço / logradouro <em>*</em></label>
                                <input id="endereco" name="logradouro" type="text" placeholder="Avenida, Rua, Alameda..." required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="numero">Número <em>*</em></label>
                                <input id="numero" name="numero_end" type="text" placeholder="Ex.: 1040" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="bairro">Bairro <em>*</em></label>
                                <input id="bairro" name="bairro" type="text" placeholder="Nome do bairro" required />
                            </div>
                            <div className="campo-cadastro campo-cidade">
                                <label htmlFor="cidade">Cidade <em>*</em></label>
                                <input id="cidade" name="cidade" type="text" placeholder="Ex.: São Paulo" required />
                            </div>
                            <div className="campo-cadastro campo-uf">
                                <label htmlFor="uf">UF <em>*</em></label>
                                <input id="uf" name="uf_estado" type="text" maxLength="2" placeholder="SP" autoCapitalize="characters" required />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="etapa-cadastro">
                        <legend><span>Passo 4</span>Responsável Legal ou Operacional</legend>
                        <div className="grade-campos">
                            <div className="campo-cadastro">
                                <label htmlFor="nome-completo">Nome Completo <em>*</em></label>
                                <input id="nome-completo" name="nome" type="text" autoComplete="name" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="cpf">CPF <em>*</em></label>
                                <input id="cpf" name="cpf" type="text" inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="telefone-responsavel">Telefone <em>*</em></label>
                                <input id="telefone-responsavel" name="telefone" type="tel" autoComplete="tel" placeholder="(11) 98765-4321" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="email-responsavel">E-mail <em>*</em></label>
                                <input id="email-responsavel" name="email" type="email" autoComplete="email" required />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="senha">Definir senha de acesso <em>*</em></label>
                                <input id="senha" name="senha" type="password" autoComplete="new-password" required onInput={() => setErroSenha("")} />
                            </div>
                            <div className="campo-cadastro">
                                <label htmlFor="confirmar-senha">Confirmar senha <em>*</em></label>
                                <input id="confirmar-senha" name="confirmarSenha" type="password" autoComplete="new-password" required onInput={() => setErroSenha("")} />
                            </div>
                        </div>
                    </fieldset>

                    {erroSenha && <p className="erro-cadastro" role="alert">{erroSenha}</p>}
                    {erroCadastro && <p className="erro-cadastro" role="alert">{erroCadastro}</p>}

                    <div className="acoes-cadastro">
                        <a href="/login">Já possui cadastro homologado? Fazer login</a>
                        <button className="botao-cadastrar" type="submit" disabled={carregando}>
                            {carregando ? "Enviando cadastro..." : "Concluir solicitação de cadastro"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Cadastro