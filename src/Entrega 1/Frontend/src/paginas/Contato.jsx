import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Contato.css'; 
import iconemensagem from '../assets/icone-mensagem.png';
import iconeanexo from '../assets/icone-anexo.png'; 
import iconeassunto from '../assets/icone-assunto.png';


export default function Contato() {
  const navigate = useNavigate();

  {/* Preparado para o BackEnd */}
 const [textoDescricao, setTextoDescricao] = useState(""); {/* Estado para armazenar o texto da descrição */}
  const [assunto, setAssunto] = useState(""); {/* NOVO: Estado para armazenar o texto do assunto */}
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
    <div className="area-voltar">
       <button type="button" className="botao-voltar" onClick={() => navigate(-1)}> ← Voltar </button>
    </div>

    {/* Card branco principal */}
    <div className="card-formulario">
      {/* Cabeçalho do card */}
      <div className="cabeçalho-form">
        <div className="icone-mensagem">
            <img src={iconemensagem} alt="Ícone de Mensagem" style={{ width: '24px', height: '24px' }} />
        </div>
        <div className="textos-cabeçalho">
            <h2>DESCREVA A SUA DÚVIDA</h2>
            <p>Preencha as informações abaixo para enviar uma mensagem direta ao utilizador ou registrar um chamado formal de suporte e compliance corporativo.</p>
      </div>
      </div>

   {/* Bloco do Destinatário */}
    <div className="info-destinatario"> 
      <div className="avatar">{destinatario.iniciais}</div>

      <div className="dados-destinatario">
        <div className="linha-nome">
          <strong>{destinatario.nome}</strong>
          <span className="tag-organizador">{destinatario.cargo}</span>
        </div>
        <span className="empresa">{destinatario.empresa}</span>
      </div>

      <div className="status-online">
        <span className="bolinha-verde"></span> {destinatario.status}
      </div>
    </div>

    {/* O Formulário começa aqui */}

    <form> 

      <div className="label-topo"> 
        <label htmlFor="assunto"> ASSUNTO: </label>
        <span className="obrigatorio"> Obrigatório</span>
      </div>

      {/* Campo onde o utilizador escreve */}
      <div className="caixa-input">
        <span className="icone-input">
          <img src={iconeassunto} alt="Ícone de Assunto" style={{ width: '18px', height: '18px' }} />
        </span>
      <input 
        type="text"
        id="assunto"
        placeholder="Ex: Ajuste de lote de ingressos ou dúvida cadastral..."
        value={assunto}
        onChange={(evento) => setAssunto(evento.target.value)}
      />
      </div>

      {/* Texto pequeno em baixo */}
      <small className="texto-ajuda">Defina um título objetivo para acelerar a resolução e o arquivamento.
      </small>


     {/* NOVO CAMPO: Descrição */}
      <div className="label-topo">
        <label htmlFor="descricao"> DESCRIÇÃO: </label>
        {/* O contador agora mostra o tamanho exato do texto guardado na memória */}
        <span className="contador">{textoDescricao.length}/2000 caracteres</span>
      </div>

      <textarea 
        id="descricao"
        placeholder="Descreva detalhadamente a sua dúvida ou solicitação..."
        value={textoDescricao}
        onChange={(evento) => setTextoDescricao(evento.target.value)}
        maxLength={2000}
      ></textarea>
    

    {/* Rodapé do Formulário */}
          <div className="rodape-form">
            
            {/* Lado esquerdo: Anexos */}
            <div className="anexo-info">
              <button type="button" className="botao-anexo">
                <img src={iconeanexo} alt="Ícone de Anexo" style={{ width: '14px', height: '14px' }} />
                Anexar Arquivo (PDF, PNG, JPG)
              </button>
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