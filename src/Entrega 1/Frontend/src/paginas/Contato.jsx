import React from 'react';
import '../styles/Contato.css'; {/* Importe o arquivo CSS para estilização */}

export default function Contato() {

  {/* informações do destinatário (Enquanto não vem o banco de dados) */}
const destinatario = {
    iniciais: "MA",
    nome: "Nome da Pessoa", 
    cargo: "Organizador Homologado",
    empresa: "Nome da Empresa S.A.",
    status: "Online"
  };

  return (
    
   <main className="container-contato">

    {/* Botão de voltar */}
    <div classname="area-voltar">
        <button className="botao-voltar"> Voltar </button>
    </div>

    {/* Card branco principal */}
    <div className="card-formulario">
      {/* Cabeçalho do card */}
      <div className="cabeçalho-form">
        <div className="icone-mensagem">
            {/* Depois trocar pelo ícone exato do Figma 💬 */}
          
        </div>
        <div className="textos-cabeçalho">
            <h2>DESCREVA A SUA DÚVIDA</h2>
            <p>Preencha as informações abaixo para enviar uma mensagem direta ao utilizador ou registar um chamado formal de suporte e compliance corporativo.</p>
      </div>
      </div>

    {/* Bloco do Destinatário */}
    <div className="info-destinatario"> 
      <div className="avatar">{destinatario.iniciais}</div>

      <div className="dados-destinatario">
        <strong>{destinatario.nome}</strong>
            <span className="tag-organizador">{destinatario.cargo}</span>
            <span className="empresa">{destinatario.empresa}</span>

            <div className="status-online"></div>
      </div>
    </div>

    {/* O Formulário começa aqui */}

    <form className="formulario"> 

      <div className="label-topo"> 
        <label htmlFor="assunto"> ASSUNTO: </label>
        <span className="obrigatorio"> * Obrigatório</span>
      </div>

      {/* Campo onde o utilizador escreve */}
      <div className="caixa-input">
        <span className="icone-input"> 🏷️{/* Ícone do Figma */} </span>
      <input 
        type="text"
        id="assunto"
        placeholder="Ex: Ajuste de lote de ingressos ou dúvida cadastral..."
        />
      </div>

      {/* Texto pequeno em baixo */}
      <small className="texto-ajuda">Defina um título objetivo para acelerar a resolução e o arquivamento.
      </small>

      {/* NOVO CAMPO: Descrição */}
      <div className="label-topo">
        <label htmlFor="descricao"> DESCRIÇÃO: </label>
        <span className="contador">0/2000 caracteres</span>
        <textarea 
        id="descricao"
        placeholder="Descreva detalhadamente a sua dúvida ou solicitação..."
        > </textarea>
      </div>

    {/* Rodapé do Formulário */}
          <div className="rodape-form">
            
            {/* Lado esquerdo: Anexos */}
            <div className="anexo-info">
              <button type="button" className="botao-anexo">📎 Anexar Arquivo (PDF, PNG, JPG)</button>
              <span className="limite-tamanho">Máx. 15MB</span>
            </div>
            
            {/* Lado direito: Ações finais */}
            <div className="acoes-finais">
              <span className="criptografia">🔒 Criptografia ativa ponta a ponta</span>
              <div className="botoes-acao">
                <button type="button" className="botao-cancelar">Cancelar</button>
                <button type="submit" className="botao-enviar">ENVIAR →</button>
              </div>
            </div>

          </div>

    </form>

    </div>
   </main>
  );
}