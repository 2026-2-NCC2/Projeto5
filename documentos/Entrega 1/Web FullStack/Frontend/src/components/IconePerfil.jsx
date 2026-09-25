
function IconePerfil({ imagem }) {
    return (
        <a className="link-perfil" href="#perfil" aria-label="Acessar perfil do usuário">
            <img src={imagem} alt="" aria-hidden="true" />
            <span>Perfil</span>
        </a>
    );
}

export default IconePerfil;