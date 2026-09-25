import "../styles/Erro.css";

function RotaNaoEncontrada() {
    return (
        <main className="pagina-erro" role="alert">
            <section className="conteudo-erro">
                <h1>Página não encontrada</h1>
                <p>A rota acessada não existe ou foi removida.</p>
                <a href="/">Voltar para o início</a>
            </section>
        </main>
    );
}

export default RotaNaoEncontrada;
