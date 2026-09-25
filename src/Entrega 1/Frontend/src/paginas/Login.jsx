
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        // A validação de credenciais será adicionada quando o backend estiver disponível.
        event.preventDefault();
        navigate("/dashboard");
    }

    return (
        <main className="pagina-login">
            <section className="login-conteudo" aria-labelledby="titulo-login">
                <h1 id="titulo-login">Acesse sua conta</h1>

                <form className="formulario-login" onSubmit={handleSubmit}>
                    <div className="campo-login">
                        <label htmlFor="email-login">E-mail ou usuário <em>*</em></label>
                        <input id="email-login" name="email" type="email" placeholder="ex: seu.email@empresa.com.br" autoComplete="username" required />
                    </div>

                    <div className="campo-login">
                        <label htmlFor="senha-login">Senha <em>*</em></label>
                        <input id="senha-login" name="senha" type="password" placeholder="••••••••" autoComplete="current-password" required />
                    </div>

                    <div className="opcoes-login">
                        <label className="lembrar-login">
                            <input type="checkbox" name="lembrar" />
                            <span>Lembrar deste dispositivo</span>
                        </label>
                        <a href="#recuperar-senha">Esqueceu a senha?</a>
                    </div>

                    <button className="botao-entrar" type="submit">Entrar na plataforma</button>

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