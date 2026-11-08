import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";

// Dados locais de demonstração: cada perfil mostra informações próprias,
// sem consultar ou enviar dados a um servidor.
const dadosMock = [
    {
        perfil: "admin",
        situacao: "Administrador ativo",
        atuacao: "Administração da Plataforma",
        categoria: "Gestão TrocaTicket",
        nivelConta: "Administrador",
        membroDesde: "Janeiro de 2024",
        escopo: "Gestão de eventos, cadastros, usuários e relatórios da plataforma.",
        cnpj: "12.345.678/0001-90",
        razaoSocial: "TrocaTicket Tecnologia e Eventos Ltda.",
        nomeFantasia: "TrocaTicket",
        inscricaoEstadual: "123.456.789.112",
        inscricaoMunicipal: "8.765.432-1",
        regime: "Simples Nacional",
        cnae: "82.30-0-01",
        cep: "01310-100",
        uf: "SP",
        endereco: "Avenida Paulista",
        numero: "1000",
        complemento: "10º andar",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        emailEmpresa: "administracao@trocaticket.com.br",
        telefoneEmpresa: "(11) 3000-1000",
        nomeResponsavel: "Alexandre Martins",
        cargoResponsavel: "Administrador da Plataforma",
        celularResponsavel: "(11) 98721-4509",
        emailResponsavel: "alexandre@trocaticket.com.br",
        poderes: "Administração da plataforma",
    },
    {
        perfil: "organizador",
        situacao: "Homologado e ativo",
        atuacao: "Organizador de Eventos",
        categoria: "Eventos e produção",
        nivelConta: "Corporativo",
        membroDesde: "Março de 2023",
        escopo: "Festivais, congressos corporativos e eventos culturais.",
        cnpj: "28.491.032/0001-85",
        razaoSocial: "Horizonte Produções e Eventos Brasil S.A.",
        nomeFantasia: "Horizonte Live Experience",
        inscricaoEstadual: "114.892.304.110",
        inscricaoMunicipal: "5.842.190-8",
        regime: "Lucro Presumido",
        cnae: "82.30-0-01",
        cep: "04543-011",
        uf: "SP",
        endereco: "Avenida Brigadeiro Faria Lima",
        numero: "3477",
        complemento: "Torre Sul - 14º andar, cj 142",
        bairro: "Itaim Bibi",
        cidade: "São Paulo",
        emailEmpresa: "contato@horizontelive.com.br",
        telefoneEmpresa: "(11) 3195-8800",
        nomeResponsavel: "Rodrigo Munhoz de Albuquerque",
        cargoResponsavel: "Diretor Executivo de Operações",
        celularResponsavel: "(11) 98721-4509",
        emailResponsavel: "rodrigo.munhoz@horizontelive.com.br",
        poderes: "Representação legal ampla",
    },
    {
        perfil: "fornecedor",
        situacao: "Homologado e ativo",
        atuacao: "Fornecedor de Serviços",
        categoria: "Serviços para eventos",
        nivelConta: "Corporativo",
        membroDesde: "Junho de 2024",
        escopo: "Infraestrutura, equipamentos e serviços técnicos para eventos.",
        cnpj: "41.827.630/0001-42",
        razaoSocial: "Ativa Soluções para Eventos Ltda.",
        nomeFantasia: "Ativa Eventos",
        inscricaoEstadual: "132.456.789.010",
        inscricaoMunicipal: "7.321.654-2",
        regime: "Simples Nacional",
        cnae: "77.39-0-03",
        cep: "13083-852",
        uf: "SP",
        endereco: "Rua das Acácias",
        numero: "240",
        complemento: "Galpão 3",
        bairro: "Barão Geraldo",
        cidade: "Campinas",
        emailEmpresa: "contato@ativaeventos.com.br",
        telefoneEmpresa: "(19) 3256-4400",
        nomeResponsavel: "Camila Ferreira Costa",
        cargoResponsavel: "Diretora Comercial",
        celularResponsavel: "(19) 99214-3058",
        emailResponsavel: "camila@ativaeventos.com.br",
        poderes: "Representação comercial",
    },
];

// Campo reutilizável para manter os dados legíveis e permitir edição local.
function CampoPerfil({ nome, rotulo, valor, modoEdicao, aoAlterar, multiline = false }) {
    const Campo = multiline ? "textarea" : "input";

    return (
        <label className={`campo-perfil${multiline ? " campo-perfil-amplo" : ""}`}>
            <span>{rotulo}</span>
            <Campo
                name={nome}
                value={valor}
                readOnly={!modoEdicao}
                rows={multiline ? 2 : undefined}
                onChange={(evento) => aoAlterar(nome, evento.target.value)}
            />
        </label>
    );
}

// Cabeçalho comum dos quatro blocos cadastrais da página.
function BlocoPerfil({ numero, icone, titulo, descricao, children, rodape }) {
    return (
        <section className="bloco-perfil">
            <header className="bloco-perfil-cabecalho">
                <span className="bloco-perfil-icone" aria-hidden="true">{icone}</span>
                <div>
                    <h2>{titulo}</h2>
                    <p>{descricao}</p>
                </div>
                <span className="bloco-perfil-numero">Bloco {numero}</span>
            </header>
            <div className="bloco-perfil-conteudo">{children}</div>
            {rodape && <footer className="bloco-perfil-rodape">{rodape}</footer>}
        </section>
    );
}

function Perfil({ perfil = "admin" }) {
    const navigate = useNavigate();
    const dadosIniciais = dadosMock.find((item) => item.perfil === perfil) || dadosMock[0];
    const [dados, setDados] = useState(dadosIniciais);
    const [modoEdicao, setModoEdicao] = useState(false);

    // Atualiza somente o estado local da demonstração; não persiste no servidor.
    function atualizarCampo(nome, valor) {
        setDados((dadosAtuais) => ({ ...dadosAtuais, [nome]: valor }));
    }

    return (
        <main className="pagina-perfil">
            <div className="perfil-conteudo">
                <button className="voltar-perfil" type="button" onClick={() => navigate(-1)}>
                    ← Voltar
                </button>

                <header className="perfil-topo">
                    <div>
                        <div className="perfil-titulo-linha">
                            <h1>Meu Perfil</h1>
                            <span className="perfil-situacao"><span aria-hidden="true">●</span>{dados.situacao}</span>
                        </div>
                        <p>Visualize e confira os dados da sua empresa na TrocaTicket.</p>
                    </div>
                    <span className={`perfil-modo${modoEdicao ? " perfil-modo-edicao" : ""}`}>
                        <span aria-hidden="true">{modoEdicao ? "✎" : "▣"}</span>
                        {modoEdicao ? "Edição local" : "Somente leitura"}
                    </span>
                </header>

                <div className="grade-perfil">
                    <BlocoPerfil
                        numero="01"
                        icone="▦"
                        titulo="Atuação no Mercado"
                        descricao="Segmento e categoria de credenciamento"
                        rodape={<><span>Verificação de Compliance B2B</span><strong>✓ Auditado e validado</strong></>}
                    >
                        <div className="perfil-subtitulo">Perfil de atuação</div>
                        <div className="perfil-etiquetas">
                            <span className="perfil-etiqueta perfil-etiqueta-ativa">● {dados.atuacao} <b>✓</b></span>
                            <span className="perfil-etiqueta">○ {dados.categoria}</span>
                        </div>
                        <div className="perfil-campos perfil-campos-duplo">
                            <CampoPerfil nome="nivelConta" rotulo="Nível de conta" valor={dados.nivelConta} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <CampoPerfil nome="membroDesde" rotulo="Membro desde" valor={dados.membroDesde} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <CampoPerfil nome="escopo" rotulo="Escopo de produção" valor={dados.escopo} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} multiline />
                        </div>
                    </BlocoPerfil>

                    <BlocoPerfil
                        numero="02"
                        icone="▤"
                        titulo="Dados Jurídicos da Empresa"
                        descricao="Informações societárias e fiscais homologadas"
                        rodape={<><span>Regime: {dados.regime}</span><span>CNAE: {dados.cnae}</span></>}
                    >
                        <div className="perfil-campos">
                            <CampoPerfil nome="cnpj" rotulo="CNPJ" valor={dados.cnpj} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <CampoPerfil nome="razaoSocial" rotulo="Razão Social" valor={dados.razaoSocial} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <CampoPerfil nome="nomeFantasia" rotulo="Nome Fantasia" valor={dados.nomeFantasia} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <div className="perfil-campos perfil-campos-duplo">
                                <CampoPerfil nome="inscricaoEstadual" rotulo="Inscrição Estadual" valor={dados.inscricaoEstadual} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                                <CampoPerfil nome="inscricaoMunicipal" rotulo="Inscrição Municipal" valor={dados.inscricaoMunicipal} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            </div>
                        </div>
                    </BlocoPerfil>

                    <BlocoPerfil
                        numero="03"
                        icone="⌖"
                        titulo="Contato Institucional & Localização"
                        descricao="Endereço comercial e canais da empresa"
                        rodape={<><span>País: Brasil</span><span>Fuso horário: GMT-3</span></>}
                    >
                        <div className="perfil-campos">
                            <div className="perfil-campos perfil-campos-cep">
                                <CampoPerfil nome="cep" rotulo="CEP" valor={dados.cep} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                                <CampoPerfil nome="uf" rotulo="UF" valor={dados.uf} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            </div>
                            <div className="perfil-campos perfil-campos-endereco">
                                <CampoPerfil nome="endereco" rotulo="Endereço" valor={dados.endereco} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                                <CampoPerfil nome="numero" rotulo="Número" valor={dados.numero} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            </div>
                            <div className="perfil-campos perfil-campos-duplo">
                                <CampoPerfil nome="complemento" rotulo="Complemento" valor={dados.complemento} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                                <CampoPerfil nome="bairro" rotulo="Bairro" valor={dados.bairro} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            </div>
                            <CampoPerfil nome="cidade" rotulo="Cidade" valor={dados.cidade} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <div className="perfil-campos perfil-campos-duplo">
                                <CampoPerfil nome="emailEmpresa" rotulo="E-mail Corporativo" valor={dados.emailEmpresa} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                                <CampoPerfil nome="telefoneEmpresa" rotulo="Telefone da Empresa" valor={dados.telefoneEmpresa} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            </div>
                        </div>
                    </BlocoPerfil>

                    <BlocoPerfil
                        numero="04"
                        icone="♙"
                        titulo="Responsável Legal"
                        descricao="Signatário contratual e contato autorizado"
                        rodape={<><span>Poderes: {dados.poderes}</span><strong>Assinatura digital ativa</strong></>}
                    >
                        <div className="perfil-campos">
                            <CampoPerfil nome="nomeResponsavel" rotulo="Nome Completo" valor={dados.nomeResponsavel} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <CampoPerfil nome="cargoResponsavel" rotulo="Cargo / Função" valor={dados.cargoResponsavel} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <CampoPerfil nome="celularResponsavel" rotulo="Celular / WhatsApp" valor={dados.celularResponsavel} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                            <CampoPerfil nome="emailResponsavel" rotulo="E-mail Direto" valor={dados.emailResponsavel} modoEdicao={modoEdicao} aoAlterar={atualizarCampo} />
                        </div>
                    </BlocoPerfil>
                </div>

                <footer className="perfil-acoes">
                    <p><span aria-hidden="true">ⓘ</span> Alterações em dados fiscais podem exigir nova validação documental.</p>
                    <button type="button" onClick={() => setModoEdicao((estadoAtual) => !estadoAtual)}>
                        <span aria-hidden="true">{modoEdicao ? "✓" : "✎"}</span>
                        {modoEdicao ? "Salvar Perfil" : "Editar Perfil"}
                    </button>
                </footer>
            </div>
        </main>
    );
}

export default Perfil;
