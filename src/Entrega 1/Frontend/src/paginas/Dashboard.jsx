
import { useEffect, useState } from "react";
import CardDashboard from "../components/CardDashboard";
import eventoIcone from "../assets/icone-eventos.png";
import solicitacaoIcone from "../assets/icone-solicitacoes.png";
import usuarioIcone from "../assets/icone-usuarios.png";
import relatorioIcone from "../assets/icone-relatorios.png";
import contatoIcone from "../assets/icone-contatos.png";
import "../styles/Dashboard.css";

function Dashboard() {
    const [usuarios, setUsuarios] = useState([]);
    const [eventos, setEventos] = useState([]);

    // busca dados de forma assincrona e atualiza o estado do componente com os dados recebidos
    useEffect(() => {
        async function carregarDados() {
            const [respostaUsuarios, respostaEventos] = await Promise.all([
                fetch("/dados/usuarios.json"),
                fetch("/dados/eventos.json")
            ]);

            setUsuarios(await respostaUsuarios.json());
            setEventos(await respostaEventos.json());
        }

        carregarDados();
    }, []);

    // filtra os eventos ativos e conta o número de organizadores e fornecedores
    // usados para compor os cards do dashboard
    const eventosAtivos = eventos.filter((evento) => evento.status !== "rascunho").length;
    const organizadores = usuarios.filter((usuario) => usuario.tipo === "organizador").length;
    const fornecedores = usuarios.filter((usuario) => usuario.tipo === "fornecedor").length;

    // define os cards do dashboard com base nos dados carregados
    const cards = [
        {
            titulo: "Eventos",
            valor: eventosAtivos,
            legenda: "ativos",
            status: "Ativo",
            icone: eventoIcone,
            acao: { texto: "Acessar", href: "/eventos" }
        },
        {
            titulo: "Solicitações",
            valor: usuarios.filter((usuario) => !usuario.ativo).length,
            legenda: "pendentes",
            status: "Pendente",
            icone: solicitacaoIcone,
            acao: { texto: "Revisar", href: "#solicitacoes-usuarios" }
        },
        {
            titulo: "Usuários",
            status: `${usuarios.length} Contas`,
            tags: [`${fornecedores} Fornecedores`, `${organizadores} Organizadores`],
            icone: usuarioIcone,
            acao: { texto: "Gerenciar", href: "#usuarios" }
        },
        {
            titulo: "Relatórios",
            descricao: "Métricas & Balanço",
            status: "Exportável",
            icone: relatorioIcone,
            acao: { texto: "Visualizar", href: "#relatorios" }
        },
        {
            titulo: "Contato",
            descricao: "Suporte & Ouvidoria",
            status: "Online",
            icone: contatoIcone,
            acao: { texto: "Abrir", href: "#contato" }
        },
    ];

    return (
        <main className="pagina-dashboard">
            <section className="dashboard-conteudo" aria-labelledby="titulo-dashboard">
                <h1 id="titulo-dashboard">Painel de controle</h1>
                <p className="descricao-dashboard">Gestão operacional e acesso rápido aos módulos.</p>
                <div className="grade-dashboard">
                    {/* Transmite as informações dos cards para apresentação conforme o componente CardDashboard */}
                    {cards.map((card) => <CardDashboard key={card.titulo} {...card} />)}
                </div>
            </section>
        </main>
    );
}
export default Dashboard;