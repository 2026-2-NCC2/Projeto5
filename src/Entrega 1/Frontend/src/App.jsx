import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import Contato from './paginas/Contato';
import CadastroPendente from './paginas/CadastroPendente';
import Dashboard from './paginas/Dashboard';
import Eventos from './paginas/Eventos';
import DetalheEvento from './paginas/DetalheEvento';
import SolicitacoesCadastro from './paginas/SolicitacoesCadastro';
import Relatorios from './paginas/Relatorios';
import Usuarios from './paginas/Usuarios';
import PerfilUsuario from './paginas/PerfilUsuario';
import RotaNaoEncontrada from './paginas/RotaNaoEncontrada';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
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
          <Route path='/dashboard' element={<Dashboard/> } />
          <Route path='/eventos' element={<Eventos/> } />
          <Route path='/eventos/:id' element={<DetalheEvento/> } />
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

export default App
