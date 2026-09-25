
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    // Traz as informações iniciais da plataforma e direciona para as páginas de login e cadastro

    return (
        <main className="container">
            <h1 className="titulo-principal">TrocaTicket</h1>
            <h2 className='subtitulo-principal'>A ponte ágil e segura entre <strong>organizadores</strong> e <strong>fornecedores</strong> no planejamento de eventos.</h2>
            <div className="container-introducao">
                <div className="introducao">
                    <h1>Conexão direta para quem faz o evento acontecer.</h1>
                    <p>Simplifique contratações, orçamentos e demandas operacionais com segurança em uma só plataforma.</p>
                </div>
                <aside className='conexao'>
                    <div className='conexao-org'>
                        <h3>ORGANIZADORES</h3>
                    </div>
                    <img src='src/assets/icone-setas.png' alt='' aria-hidden='true'/>
                    <div className='conexao-org'>
                        <h3>FORNECEDORES</h3>
                    </div>
                </aside>
            </div>
            <div className='botoes-acesso'>

                <button className="botao-login" onClick={() => navigate("/login")}><img src='src/assets/icone-login.png' alt='' aria-hidden="true"/>Login</button>
                <button className="botao-cadastro" onClick={() => navigate("/cadastro")}><img src='src/assets/icone-cadastro.png' alt='' aria-hidden="true"/>Cadastro</button>
            </div>
        </main>
    )
}

export default Home;