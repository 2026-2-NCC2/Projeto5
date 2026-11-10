import React, { useState } from 'react';
import '../styles/Contato.css'; 
import BotaoVoltar from '../components/BotaoVoltar';
import iconemensagem from '../assets/icone-mensagem.png';
import iconeanexo from '../assets/icone-anexo.png'; 
import iconeassunto from '../assets/icone-assunto.png';

export default function Contato() {
  // Mantém os campos controlados pelo React e atualiza o contador da descrição.
  const [textoDescricao, setTextoDescricao] = useState("");
  const [assunto, setAssunto] = useState("");

  // Dados demonstrativos do contato; futuramente podem vir do perfil selecionado.
  const destinatario = {
    iniciais: "MA",
    nome: "Nome da Pessoa", 
    cargo: "Organizador Homologado",
    empresa: "Nome da Empresa S.A.",
    status: "Online"
  };

  return (
    <main className="container-contato">
      {/* Retorna à página anterior sem fixar um destino específico. */}
      <div className="area-voltar">
        <BotaoVoltar className="botao-voltar" />
      </div>

      {/* Cartão que reúne o destinatário e os campos da mensagem. */}
      <div className="card-formulario">
        <div className="cabeçalho-form">
          <div className="icone-mensagem">
            <img src={iconemensagem} alt="Ícone de Mensagem" style={{ width: '24px', height: '24px' }} />
          </div>
          <div className="textos-cabeçalho">
            <h2>DESCREVA A SUA DÚVIDA</h2>
            <p>Preencha as informações abaixo para enviar uma mensagem direta ao utilizador ou registrar um chamado formal de suporte e compliance corporativo.</p>
          </div>
        </div>

        {/* Resumo visual da pessoa ou empresa que receberá a mensagem. */}
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

        {/* Formulário visual: os valores são mantidos localmente nesta versão. */}
        <form>
          <div className="label-topo">
            <label htmlFor="assunto"> ASSUNTO: </label>
            <span className="obrigatorio"> Obrigatório</span>
          </div>

          {/* Campo de assunto controlado pelo estado `assunto`. */}
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

          <small className="texto-ajuda">
            Defina um título objetivo para acelerar a resolução e o arquivamento.
          </small>

          {/* Campo de descrição com limite e contador sincronizado com o estado. */}
          <div className="label-topo">
            <label htmlFor="descricao"> DESCRIÇÃO: </label>
            <span className="contador">{textoDescricao.length}/2000 caracteres</span>
          </div>

          <textarea
            id="descricao"
            placeholder="Descreva detalhadamente a sua dúvida ou solicitação..."
            value={textoDescricao}
            onChange={(evento) => setTextoDescricao(evento.target.value)}
            maxLength={2000}
          />

          {/* Ações finais e indicação visual de anexo/segurança. */}
          <div className="rodape-form">
            <div className="anexo-info">
              <button type="button" className="botao-anexo">
                <img src={iconeanexo} alt="Ícone de Anexo" style={{ width: '14px', height: '14px' }} />
                Anexar Arquivo (PDF, PNG, JPG)
              </button>
              <span className="limite-tamanho">Máx. 15MB</span>
            </div>

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