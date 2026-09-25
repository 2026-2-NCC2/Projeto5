import { Component } from "react";
import "../styles/Erro.css";

// Envolve a aplicação para evitar que um erro de renderização deixe a tela vazia.
class ErrorBoundary extends Component {
    // Controla se a tela alternativa de erro deve ser exibida.
    state = { ocorreuErro: false };

    // É executado pelo React quando um componente filho lança um erro.
    static getDerivedStateFromError() {
        return { ocorreuErro: true };
    }

    render() {
        // Mostra uma mensagem amigável e um caminho de retorno para a Home.
        if (this.state.ocorreuErro) {
            return (
                <main className="pagina-erro" role="alert">
                    <section className="conteudo-erro">
                        <h1>Algo deu errado</h1>
                        <p>Não foi possível carregar esta página.</p>
                        <a href="/">Voltar para o início</a>
                    </section>
                </main>
            );
        }

        // Quando não há erro, renderiza normalmente os componentes envolvidos.
        return this.props.children;
    }
}

export default ErrorBoundary;
