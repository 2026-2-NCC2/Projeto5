import { useNavigate, useParams } from "react-router-dom";
import "../styles/PerfilUsuario.css";

// Conteúdo de demonstração para a tela de perfil de uma conta cadastrada.
const dadosMock = [
    {
        id: "USR-001",
        nome: "Mariana Albuquerque",
        tipo: "Organizador Homologado",
        status: "Conta Ativa",
        cargo: "Diretora de Operações",
        empresa: "Albuquerque Entretenimento & Festivais Ltda",
        codigo: "#TT-84920",
        criadoEm: "Jan/2023",
        razaoSocial: "Albuquerque Entretenimento & Festivais Ltda",
        cnpj: "23.456.789/0001-12",
        email: "mariana@albuquerqueeventos.com.br",
        telefone: "(11) 98452-1100",
        sede: "São Paulo, SP — Brasil",
        iniciais: "MA",
        apresentacao: "A Albuquerque Entretenimento é uma produtora especializada em festivais de música de grande porte, conferências corporativas de tecnologia e feiras internacionais no estado de São Paulo e região Sudeste. Operamos com capacidade de gestão simultânea de até 80.000 pessoas por dia, integrando infraestrutura física, bilheteria primária e permuta corporativa de lotes corporativos pela plataforma Troca Ticket.",
        solucoes: [
            { icone: "◉", titulo: "Escopo de Serviços:", texto: "Produção executiva de eventos musicais, alocação de camarotes corporativos, repasse formal de lotes B2B e credenciamento de equipes operacionais." },
            { icone: "▣", titulo: "Capacidade & Volume Operacional:", texto: "Média de 34 eventos anuais geridos, com mais de 280.000 ingressos transacionados com conformidade fiscal e antifraude rigorosa." },
            { icone: "♧", titulo: "Garantias & Compliance:", texto: "Certificado digital homologado para emissão de NF-e automatizada, seguro de responsabilidade civil para espetáculos e termo de adesão assinado." },
            { icone: "▤", titulo: "Modalidades Aceitas na Troca Ticket:", texto: "Permuta de cotas corporativas diretas, antecipação de lotes promocionais e compensação financeira via conta escrow vinculada." },
        ],
        metricas: [
            { valor: "34", legenda: "Eventos cadastrados", destaque: false },
            { valor: "99,4%", legenda: "Validação de acesso", destaque: true },
            { valor: "12.450", legenda: "Ingressos trocados", destaque: false },
            { valor: "0", legenda: "Contestações ativas", destaque: true },
        ],
    },
];

function PerfilUsuario() {
    const navigate = useNavigate();
    const { id } = useParams();
    const usuario = dadosMock.find((item) => item.id === id);

    if (!usuario) {
        return (
            <main className="pagina-perfil-usuario">
                <div className="perfil-usuario-container">
                    <button className="voltar-perfil-usuario" type="button" onClick={() => navigate(-1)}>← Voltar</button>
                    <section className="perfil-nao-encontrado">
                        <h1>Usuário não encontrado</h1>
                        <p>Não foi possível localizar esse perfil nos dados disponíveis.</p>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="pagina-perfil-usuario">
            <div className="perfil-usuario-container">
                <button className="voltar-perfil-usuario" type="button" onClick={() => navigate(-1)}>← Voltar</button>

                <div className="grade-perfil-usuario">
                    {/* Apresentação institucional e especialidades do usuário. */}
                    <section className="cartao-identidade-usuario">
                        <header className="cabecalho-identidade">
                            <div className="retrato-usuario">
                                <span>{usuario.iniciais}</span>
                                <i>✓</i>
                            </div>
                            <div className="identificacao-usuario">
                                <div className="etiquetas-perfil">
                                    <span className="tipo-perfil">{usuario.tipo}</span>
                                    <span className="conta-ativa">● {usuario.status}</span>
                                </div>
                                <h1>{usuario.nome}</h1>
                                <p>{usuario.cargo} na {usuario.empresa}</p>
                            </div>
                            <div className="codigo-usuario">
                                <span>Código ID</span>
                                <strong>{usuario.codigo}</strong>
                                <small>Cadastrado em {usuario.criadoEm}</small>
                            </div>
                        </header>

                        <section className="apresentacao-usuario">
                            <h2><i /> Apresentação Institucional &amp; Soluções Oferecidas</h2>
                            <p>{usuario.apresentacao}</p>
                        </section>

                        <div className="lista-solucoes-usuario">
                            {usuario.solucoes.map((solucao) => (
                                <article className="solucao-usuario" key={solucao.titulo}>
                                    <span aria-hidden="true">{solucao.icone}</span>
                                    <p><strong>{solucao.titulo}</strong> {solucao.texto}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <aside className="coluna-lateral-perfil">
                        {/* Dados jurídicos e operacionais da conta verificada. */}
                        <section className="cartao-registro-usuario">
                            <header>
                                <h2>Dados de Registro</h2>
                                <span>Verificado</span>
                            </header>
                            <dl>
                                <div><dt>Razão Social</dt><dd>{usuario.razaoSocial}</dd></div>
                                <div><dt>CNPJ</dt><dd className="texto-monospace">{usuario.cnpj}</dd></div>
                                <div><dt>E-mail Corporativo</dt><dd><a href={`mailto:${usuario.email}`}>{usuario.email}</a></dd></div>
                                <div><dt>Telefone / WhatsApp</dt><dd>{usuario.telefone}</dd></div>
                                <div><dt>Sede Operacional</dt><dd>{usuario.sede}</dd></div>
                            </dl>
                            <button className="botao-contrato-usuario" type="button" onClick={() => window.print()}>
                                ▤ Ver Contrato Social Homologado
                            </button>
                        </section>

                        {/* Resumo de atividade da empresa na plataforma. */}
                        <section className="cartao-desempenho-usuario">
                            <h2>Desempenho no Ecossistema</h2>
                            <div className="metricas-perfil">
                                {usuario.metricas.map((metrica) => (
                                    <article className={metrica.destaque ? "metrica-perfil destacada" : "metrica-perfil"} key={metrica.legenda}>
                                        <strong>{metrica.valor}</strong>
                                        <span>{metrica.legenda}</span>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default PerfilUsuario;
