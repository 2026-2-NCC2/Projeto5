import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import CadastroPendente from './paginas/CadastroPendente';
import Dashboard from './paginas/Dashboard';
import Eventos from './paginas/Eventos';
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
          <Route path='*' element={<RotaNaoEncontrada/> } />
        </Routes>
        <Rodape/>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
