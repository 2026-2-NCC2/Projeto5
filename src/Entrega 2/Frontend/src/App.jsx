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
import Perfil from './paginas/Perfil';
import RotaNaoEncontrada from './paginas/RotaNaoEncontrada';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './contextos/useAuth';
import './App.css';

// Centraliza a verificação de perfil para manter cada regra junto à respectiva rota.
// Este bloqueio é apenas visual; autorização real precisa ser validada no servidor.
function RotaProtegida({ perfil, perfisPermitidos, children }) {
  if (perfisPermitidos.includes(perfil)) {
    return children;
  }

  return <Navigate to={perfil ? "/dashboard" : "/login"} replace />;
}

function App() {

  const { perfil } = useAuth();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Cabecalho/>
        {/* Define as rotas para navegação na plataforma */}
        <Routes>
          {/* Rotas públicas: podem ser acessadas sem considerar o perfil selecionado. */}
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/cadastro' element={<Cadastro/> } />
          <Route path='/cadastro-pendente' element={<CadastroPendente/> } />
          <Route path='/contato' element={<Contato/>} />
          
          {/* O dashboard é compartilhado, mas os cards dependem do perfil selecionado. */}
          <Route path='/dashboard' element={
            perfil
              ? <Dashboard perfil={perfil}/>
              : <Navigate to="/login" replace/>
          } />

          {/* Página de perfil compartilhada pelos três perfis simulados. */}
          <Route path='/perfil' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <Perfil perfil={perfil}/>
            </RotaProtegida>
          } />
          
          {/* Eventos gerais são compartilhados entre administração e organização. */}
          <Route path='/eventos' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador']}>
              <Eventos/>
            </RotaProtegida>
          } />
          <Route path='/eventos/:id' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador']}>
              <DetalheEventoOrg/>
            </RotaProtegida>
          } />
          <Route path='/meus-eventos-org' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['organizador']}>
              <MeusEventosOrg/>
            </RotaProtegida>
          } />
          <Route path='/criar-evento-org' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['organizador']}>
              <CriarEventoOrg/>
            </RotaProtegida>
          } />
          <Route path='/propostas/:id' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['organizador']}>
              <DetalhePropostaOrg/>
            </RotaProtegida>
          } />
          <Route path='/comparacao-proposta-org' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['organizador']}>
              <ComparacaoPropostaOrg/>
            </RotaProtegida>
          } />

          {/* Área do fornecedor: eventos, detalhes, envio e acompanhamento de propostas. */}
          <Route path='/fornecedor' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <EventosFor/>
            </RotaProtegida>
          } />
          <Route path='/fornecedor/eventos' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <EventosFor/>
            </RotaProtegida>
          } />
          <Route path='/fornecedor/eventos/:id' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <DetalhePropostaFor/>
            </RotaProtegida>
          } />
          <Route path='/fornecedor/eventos/:id/proposta' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <EnvioPropostaFor/>
            </RotaProtegida>
          } />
          <Route path='/fornecedor/propostas' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <MinhasPropostasFor/>
            </RotaProtegida>
          } />

          {/* Administração exclusiva: inclui a visualização detalhada de usuários. */}
          <Route path='/solicitacoes-cadastro' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin']}>
              <SolicitacoesCadastro/>
            </RotaProtegida>
          } />
          <Route path='/relatorios' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin']}>
              <Relatorios/>
            </RotaProtegida>
          } />
          <Route path='/usuarios' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin']}>
              <Usuarios/>
            </RotaProtegida>
          } />
          <Route path='/usuarios/:id' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin']}>
              <PerfilUsuario/>
            </RotaProtegida>
          } />

          {/* Mantém a página de rota inexistente acessível a qualquer perfil. */}
          <Route path='*' element={<RotaNaoEncontrada/>} />
        </Routes>
        <Rodape/>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App;