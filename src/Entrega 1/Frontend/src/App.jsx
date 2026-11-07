import { useState } from 'react'; 
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import Contato from './paginas/Contato';
import CadastroPendente from './paginas/CadastroPendente';
import Dashboard from './paginas/Dashboard';
import Eventos from './paginas/Eventos';
import MeusEventosOrg from './paginas/MeusEventosOrg';
import DetalheEventoOrg from './paginas/DetalheEventoOrg';
import CriarEventoOrg from './paginas/CriarEventoOrg';
import DetalhePropostaOrg from './paginas/DetalhePropostaOrg';
import ComparacaoPropostaOrg from './paginas/ComparacaoPropostaOrg';
import EventosFor from './paginas/EventosFor';
import DetalhePropostaFor from './paginas/DetalhePropostaFor';
import EnvioPropostaFor from './paginas/EnvioPropostaFor';
import MinhasPropostasFor from './paginas/MinhasPropostasFor';
import SolicitacoesCadastro from './paginas/SolicitacoesCadastro';
import Relatorios from './paginas/Relatorios';
import Usuarios from './paginas/Usuarios';
import PerfilUsuario from './paginas/PerfilUsuario';
import RotaNaoEncontrada from './paginas/RotaNaoEncontrada';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {

  // Define o estado do perfil do usuário (Temporario, para simular o login)
  const [perfil, setPerfil] = useState('admin');
  
 
  
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Cabecalho/>
        {/* Define as rotas para navegação na plataforma */}
        <Routes>
          <Route path='/' element={<Home/> } />
          <Route path='/login' element={<Login/> } />
          <Route path='/cadastro' element={<Cadastro/> } />
          <Route path='/cadastro-pendente' element={<CadastroPendente/> } />
          
          {/* PASSEI A PROP PERFIL AQUI DENTRO DA ROTA DO DASHBOARD */}
          <Route path='/dashboard' element={<Dashboard perfil={perfil} /> } /> 
          
          <Route path='/eventos' element={<Eventos/> } />
          <Route path='/meus-eventos-org' element={<MeusEventosOrg/> } />
          <Route path='/eventos/:id' element={<DetalheEventoOrg/> } />
          <Route path='/criar-evento-org' element={<CriarEventoOrg/> } />
          <Route path='/propostas/:id' element={<DetalhePropostaOrg/> } />
          <Route path='/comparacao-proposta-org' element={<ComparacaoPropostaOrg/> } />
          {/* Área do fornecedor: eventos, detalhes, envio e acompanhamento de propostas. */}
          <Route path='/fornecedor' element={<EventosFor/> } />
          <Route path='/fornecedor/eventos' element={<EventosFor/> } />
          <Route path='/fornecedor/eventos/:id' element={<DetalhePropostaFor/> } />
          <Route path='/fornecedor/eventos/:id/proposta' element={<EnvioPropostaFor/> } />
          <Route path='/fornecedor/propostas' element={<MinhasPropostasFor/> } />
          <Route path='/solicitacoes-cadastro' element={<SolicitacoesCadastro/> } />
          <Route path='/relatorios' element={<Relatorios/> } />
          <Route path='/usuarios' element={<Usuarios/> } />
          <Route path='/usuarios/:id' element={<PerfilUsuario/> } />
          <Route path='/contato' element={<Contato/> } />
          <Route path='*' element={<RotaNaoEncontrada/> } />

        </Routes>
        <Rodape/>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App;