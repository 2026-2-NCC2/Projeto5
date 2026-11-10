
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextos/useAuth";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const dados = new FormData(event.currentTarget);
        const email = String(dados.get("email")).trim();
        const senha = String(dados.get("senha"));
        setErro("");
        setCarregando(true);

        try {
            const resultado = await login({ email, senha });
            if (resultado.status === "pendente") {
                navigate("/cadastro-pendente");
                return;
            }

            navigate("/dashboard");
        } catch (erroLogin) {
            setErro(erroLogin.message || "Não foi possível entrar. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="pagina-login">
            <section className="login-conteudo" aria-labelledby="titulo-login">
                <h1 id="titulo-login">Acesse sua conta</h1>

                <form className="formulario-login" onSubmit={handleSubmit} noValidate>
                    <div className="campo-login">
                        <label htmlFor="email-login">E-mail <em>*</em></label>
                        <input id="email-login" name="email" type="email" placeholder="ex: seu.email@empresa.com.br" autoComplete="username" required aria-invalid={Boolean(erro)} />
                    </div>

                    <div className="campo-login">
                        <label htmlFor="senha-login">Senha <em>*</em></label>
                        <input id="senha-login" name="senha" type="password" placeholder="••••••••" autoComplete="current-password" required aria-invalid={Boolean(erro)} />
                    </div>

                    <div className="opcoes-login">
                        <label className="lembrar-login">
                            <input type="checkbox" name="lembrar" />
                            <span>Lembrar deste dispositivo</span>
                        </label>
                        <a href="#recuperar-senha">Esqueceu a senha?</a>
                    </div>

                    <button className="botao-entrar" type="submit" disabled={carregando}>
                        {carregando ? "Verificando..." : "Entrar na plataforma"}
                    </button>

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