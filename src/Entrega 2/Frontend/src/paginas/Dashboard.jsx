
import CardDashboard from "../components/CardDashboard";
import eventoIcone from "../assets/icone-eventos.png";
import solicitacaoIcone from "../assets/icone-solicitacoes.png";
import usuarioIcone from "../assets/icone-usuarios.png";
import relatorioIcone from "../assets/icone-relatorios.png";
import contatoIcone from "../assets/icone-contatos.png";
import "../styles/Dashboard.css";

// Cada lista contém os atalhos que devem aparecer para um tipo de usuário.
const cardsAdmin = [
    {
        titulo: "Eventos",
        descricao: "Veja os eventos cadastrados.",
        status: "Ativos",
        icone: eventoIcone,
        acao: { texto: "Ver eventos", href: "/eventos" },
    },
    {
        titulo: "Solicitações",
        descricao: "Revise os cadastros pendentes.",
        status: "Pendentes",
        icone: solicitacaoIcone,
        acao: { texto: "Revisar", href: "/solicitacoes-cadastro" },
    },
    {
        titulo: "Usuários",
        descricao: "Gerencie as contas.",
        status: "Contas",
        icone: usuarioIcone,
        acao: { texto: "Gerenciar", href: "/usuarios" },
    },
    {
        titulo: "Relatórios",
        descricao: "Consulte as métricas.",
        status: "Dados",
        icone: relatorioIcone,
        acao: { texto: "Ver relatórios", href: "/relatorios" },
    },
];

const cardsOrganizador = [
    {
        titulo: "Meus Eventos",
        descricao: "Gerencie seus eventos.",
        status: "Eventos",
        icone: eventoIcone,
        acao: { texto: "Ver eventos", href: "/meus-eventos-org" },
    },
    {
        titulo: "Minhas Cotações",
        descricao: "Compare as propostas recebidas.",
        status: "Propostas",
        icone: solicitacaoIcone,
        acao: { texto: "Comparar", href: "/comparacao-proposta-org" },
    },
];

const cardsFornecedor = [
    {
        titulo: "Buscar Eventos",
        descricao: "Encontre eventos disponíveis.",
        status: "Eventos",
        icone: eventoIcone,
        acao: { texto: "Ver eventos", href: "/fornecedor/eventos" },
    },
    {
        titulo: "Propostas Enviadas",
        descricao: "Acompanhe suas propostas.",
        status: "Propostas",
        icone: solicitacaoIcone,
        acao: { texto: "Acompanhar", href: "/fornecedor/propostas" },
    },
];

const cardContato = {
    titulo: "Contatar",
    descricao: "Tire suas dúvidas.",
    status: "Contato",
    icone: contatoIcone,
    acao: { texto: "Contatar", href: "/contato" },
};

const cardsPorPerfil = {
    admin: [...cardsAdmin, cardContato],
    organizador: [...cardsOrganizador, cardContato],
    fornecedor: [...cardsFornecedor, cardContato],
};

function Dashboard({ perfil }) {
    const cards = cardsPorPerfil[perfil] ?? [];

    return (
        <main className="pagina-dashboard">
            <section className="dashboard-conteudo" aria-labelledby="titulo-dashboard">
                <h1 id="titulo-dashboard">Painel de controle</h1>
                <p className="descricao-dashboard">Gestão operacional e acesso rápido aos módulos.</p>
                <div className="grade-dashboard">
                    {/* O mesmo componente apresenta cada opção com os dados do perfil. */}
                    {cards.map((card) => <CardDashboard key={card.titulo} {...card} />)}
                </div>
            </section>
        </main>
    );
}
export default Dashboard;