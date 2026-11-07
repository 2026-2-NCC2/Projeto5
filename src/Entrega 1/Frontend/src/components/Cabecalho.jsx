import IconePerfil from "./IconePerfil";
import "../styles/Cabecalho.css";
import { Link, useLocation } from "react-router-dom";
import overlay from "../assets/Overlay.png";
import house from "../assets/House.png";

function Cabecalho() {
    const { pathname } = useLocation();
    const exibeVoltar = ["/login", "/cadastro", "/cadastro-pendente"].includes(pathname);
    const exibeDashboard = pathname !== "/" && !exibeVoltar;
    const estadoCabecalho = pathname === "/" ? "cabecalho-home" : exibeVoltar ? "cabecalho-login" : "cabecalho-dashboard";

    return (
        <header className={`cabecalho ${estadoCabecalho}`}>
            {/* Links internos mantêm a navegação no React Router e preservam o estado do perfil. */}
            <Link className="logo-cabecalho" to="/" aria-label="Ir para a página inicial"><img className="logo" src="src/assets/símbolo).svg" alt="Nome da Empresa"/></Link>

            {/* adicionar componentes de acessibilidade aqui, após implementação dos mesmos*/}

            <nav className="nav-cabecalho">
                {exibeVoltar && <a className="link-inicio" href="/">Voltar para o início</a>}
                {exibeDashboard && <Link className="link-dashboard" to="/dashboard"><img src={house} alt="" aria-hidden="true"/>Dashboard</Link>}
                <IconePerfil imagem={overlay}/>
            </nav>          
        </header>
    );
}

export default Cabecalho;