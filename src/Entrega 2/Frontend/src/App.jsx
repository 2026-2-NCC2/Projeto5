import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import Contato from './paginas/Contato';
import CadastroPendente from './paginas/CadastroPendente';
import Dashboard from './paginas/Dashboard';
import Eventos from './paginas/Eventos';
import DetalheEventoOrg from './paginas/DetalheEventoOrg';
import DetalheEvento from './paginas/DetalheEvento';
import CriarEventoOrg from './paginas/CriarEventoOrg';
import DetalheProposta from './paginas/DetalheProposta';
import ComparacaoPropostaOrg from './paginas/ComparacaoPropostaOrg';
import EnvioPropostaFor from './paginas/EnvioPropostaFor';
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
  const perfisValidos = ['admin', 'organizador', 'fornecedor'];
  if (perfisValidos.includes(perfil) && perfisPermitidos.includes(perfil)) {
    return children;
  }

  return <Navigate to={perfisValidos.includes(perfil) ? "/dashboard" : "/login"} replace />;
}

function App() {

  const { perfil, carregando } = useAuth();

  if (carregando) {
    return <main aria-live="polite">Verificando sessão...</main>;
  }

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
          <Route path='/contato' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <Contato/>
            </RotaProtegida>
          } />
          
          <Route path='/dashboard' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <Dashboard perfil={perfil}/>
            </RotaProtegida>
          } />

          {/* Página de perfil compartilhada pelos três perfis simulados. */}
          <Route path='/perfil' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <Perfil perfil={perfil}/>
            </RotaProtegida>
          } />
          
          {/* A listagem unificada escolhe eventos conforme o perfil autenticado. */}
          <Route path='/eventos' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <Eventos perfil={perfil}/>
            </RotaProtegida>
          } />
          <Route path='/eventos/:id' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador']}>
              <DetalheEventoOrg/>
            </RotaProtegida>
          } />
          <Route path='/eventos/:id/detalhes' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <DetalheEvento/>
            </RotaProtegida>
          } />
          <Route path='/meus-eventos-org' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['organizador']}>
              <Eventos perfil={perfil}/>
            </RotaProtegida>
          } />
          <Route path='/criar-evento-org' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['organizador']}>
              <CriarEventoOrg/>
            </RotaProtegida>
          } />
          <Route path='/propostas/:codItem/:idFornecedor' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <DetalheProposta/>
            </RotaProtegida>
          } />
          <Route path='/comparacao-proposta-org' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <ComparacaoPropostaOrg/>
            </RotaProtegida>
          } />

          {/* Área do fornecedor: eventos, detalhes, envio e acompanhamento de propostas. */}
          <Route path='/fornecedor' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <Eventos perfil={perfil}/>
            </RotaProtegida>
          } />
          <Route path='/fornecedor/eventos' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <Eventos perfil={perfil}/>
            </RotaProtegida>
          } />
          <Route path='/fornecedor/eventos/:id' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <DetalheEvento/>
            </RotaProtegida>
          } />
          <Route path='/fornecedor/eventos/:id/proposta' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <EnvioPropostaFor/>
            </RotaProtegida>
          } />
          <Route path='/fornecedor/propostas' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['fornecedor']}>
              <ComparacaoPropostaOrg/>
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

          <Route path='*' element={
            <RotaProtegida perfil={perfil} perfisPermitidos={['admin', 'organizador', 'fornecedor']}>
              <RotaNaoEncontrada/>
            </RotaProtegida>
          } />
        </Routes>
        <Rodape/>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App;