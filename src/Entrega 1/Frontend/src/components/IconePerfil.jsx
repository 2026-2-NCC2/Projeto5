
import { Link } from "react-router-dom";

function IconePerfil({ imagem }) {
    return (
        <Link className="link-perfil" to="/perfil" aria-label="Acessar perfil do usuário">
            <img src={imagem} alt="" aria-hidden="true" />
            <span>Perfil</span>
        </Link>
    );
}

export default IconePerfil;