
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login({ perfil, setPerfil }) {
    const navigate = useNavigate();
    const [erro, setErro] = useState("");

    function handleSubmit(event) {
        // Impede o recarregamento enquanto a autenticação ainda é realizada na plataforma.
        event.preventDefault();

        // Lê os valores enviados pelo formulário para validar as entradas.
        // FormData acessa os dados do formulário, podendo selecionar os campos pelo atributo name.
        const dados = new FormData(event.currentTarget);
        const email = String(dados.get("email")).trim();
        const senha = String(dados.get("senha"));
        const perfilSelecionado = String(dados.get("perfil"));

        // Exige o formato básico de um endereço de e-mail com usuário@domínio.
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

        // Interrompe o envio e informa o problema quando o e-mail não atende ao padrão regex.
        if (!emailValido) {
            setErro("Informe um e-mail válido.");
            return;
        }

        // A senha precisa ter pelo menos oito caracteres antes de liberar o acesso.
        if (senha.length < 8) {
            setErro("A senha deve ter no mínimo 8 caracteres.");
            return;
        }

        // Valida o valor do seletor antes de atualizar o perfil usado pelo RBAC.
        if (!["admin", "organizador", "fornecedor"].includes(perfilSelecionado)) {
            setErro("Selecione um perfil válido.");
            return;
        }

        // Em modo demonstrativo, o perfil escolhido controla os acessos e cards.
        setPerfil(perfilSelecionado);
        setErro("");
        navigate("/dashboard");
    }

    return (
        <main className="pagina-login">
            <section className="login-conteudo" aria-labelledby="titulo-login">
                <h1 id="titulo-login">Acesse sua conta</h1>

                <form className="formulario-login" onSubmit={handleSubmit} noValidate>
                    <div className="campo-login">
                        <label htmlFor="email-login">E-mail ou usuário <em>*</em></label>
                        <input id="email-login" name="email" type="email" placeholder="ex: seu.email@empresa.com.br" autoComplete="username" required aria-invalid={Boolean(erro)} />
                    </div>

                    <div className="campo-login">
                        <label htmlFor="senha-login">Senha <em>*</em></label>
                        <input id="senha-login" name="senha" type="password" placeholder="••••••••" autoComplete="current-password" minLength="8" required aria-invalid={Boolean(erro)} />
                    </div>

                    <div className="campo-login">
                        <label htmlFor="perfil-login">Perfil de demonstração</label>
                        {/* O seletor representa a escolha de perfil, não autentica credenciais. */}
                        <select id="perfil-login" name="perfil" defaultValue={perfil}>
                            <option value="admin">Administrador</option>
                            <option value="organizador">Organizador</option>
                            <option value="fornecedor">Fornecedor</option>
                        </select>
                    </div>

                    <div className="opcoes-login">
                        <label className="lembrar-login">
                            <input type="checkbox" name="lembrar" />
                            <span>Lembrar deste dispositivo</span>
                        </label>
                        <a href="#recuperar-senha">Esqueceu a senha?</a>
                    </div>

                    <button className="botao-entrar" type="submit">Entrar na plataforma</button>

                    {erro && <p className="erro-login" role="alert">{erro}</p>}

                    <div className="separador-login" aria-hidden="true"><span>Novo na TrocaTicket?</span></div>

                    <button className="botao-criar-conta" type="button" onClick={() => navigate("/cadastro")}>
                        Criar nova conta
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Login;