import React from 'react';
import '../styles/Contato.css'; // Importe o arquivo CSS para estilização

export default function Contato() {
  return (
   <main className="container-contato">

    // Botão de voltar
    <div classname="area-voltar">
        <button className="botao-voltar"> Voltar </button>
    </div>

    // Card branco principal
    <div className="card-formulario">
      // Cabeçalho do card
      <div className="cabeçalho-form">
        <div className="icone-mensagem">
            /* Por agora usamos um emoji, depois podemos trocar pelo ícone exato do Figma */
            💬
        </div>
        <div className="textos-cabeçalho">
            <h2>DESCREVA A SUA DÚVIDA</h2>
            <p>Preencha as informações abaixo para enviar uma mensagem direta ao utilizador ou registar um chamado formal de suporte e compliance corporativo.</p>
      </div>
      
      </div>
    </div>
   </main>
  );
}