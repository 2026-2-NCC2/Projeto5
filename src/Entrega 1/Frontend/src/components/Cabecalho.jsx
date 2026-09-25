import IconePerfil from "./IconePerfil";
import "../styles/Cabecalho.css";

function Cabecalho() {
    

    // Define cabeçalho da aplicação com logo, links de navegação para dashboard e acesso ao perfil de usuário
    return (
        <header className="cabecalho">
            <a className="logo-cabecalho" href="/" aria-label="Ir para a página inicial"><img className="logo" src="src/assets/símbolo).svg" alt="Nome da Empresa"/></a>

            {/* adicionar componentes de acessibilidade aqui, após implementação */}

            <nav className="nav-cabecalho">
                <a className="link-dashboard" href="/dashboard"><img src="src/assets/House.png"/> Dashboard</a>
                <IconePerfil/>
            </nav>          
        </header>
    );
}

export default Cabecalho;