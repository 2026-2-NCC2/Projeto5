import "../styles/CadastroPendente.css";

function CadastroPendente() {
    return (
        <main className="pagina-cadastro-pendente">
            <section className="cadastro-pendente-conteudo" aria-labelledby="titulo-cadastro-pendente">
                <h1 id="titulo-cadastro-pendente">Cadastro em processo de análise</h1>
                <p className="descricao-status">Estamos analisando a documentação da sua empresa para liberação do acesso operacional.</p>

                <div className="painel-status">
                    <section className="resumo-cadastro" aria-labelledby="titulo-resumo">
                        <div className="cabecalho-resumo">
                            <h2 id="titulo-resumo">Resumo da submissão cadastral</h2>
                            <span>Organizador e Fornecedor B2B</span>
                        </div>
                        <div className="dados-resumo">
                            <p><small>Razão social / Nome</small><strong>Dados enviados no cadastro</strong></p>
                            <p><small>CNPJ informado</small><strong>Em validação</strong></p>
                            <p><small>Perfil selecionado</small><strong>Perfil empresarial</strong></p>
                            <p><small>Responsável legal</small><strong>Responsável informado</strong></p>
                        </div>
                        <div className="rodape-resumo">
                            <span>Cadastro recebido para análise</span>
                            <span>Documentação em conferência</span>
                        </div>
                    </section>

                    <section className="etapas-status" aria-labelledby="titulo-etapas">
                        <h2 id="titulo-etapas">Etapas do processo de credenciamento</h2>
                        <div className="lista-etapas">
                            <article className="etapa-status concluida">
                                <span className="numero-etapa">1</span>
                                <h3>Envio dos dados</h3>
                                <p>Formulário cadastral e dados jurídicos submetidos com sucesso.</p>
                                <span className="etiqueta-etapa">Concluído</span>
                            </article>
                            <article className="etapa-status atual">
                                <span className="numero-etapa">2</span>
                                <h3>Auditoria da equipe</h3>
                                <p>Verificação das informações e documentos enviados.</p>
                                <span className="etiqueta-etapa">Em andamento agora</span>
                            </article>
                            <article className="etapa-status">
                                <span className="numero-etapa">3</span>
                                <h3>Liberação total</h3>
                                <p>Acesso completo às funcionalidades da plataforma.</p>
                                <span className="etiqueta-etapa">Aguardando etapa 2</span>
                            </article>
                        </div>
                    </section>

                    <div className="ajuda-status">
                        <button type="button">Atualizar status</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default CadastroPendente;