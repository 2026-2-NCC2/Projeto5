import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Home from './paginas/Home';
import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import Dashboard from './paginas/Dashboard';
import Eventos from './paginas/Eventos';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <Cabecalho/>
      {/* Define as rotas para navegação na plataforma */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/> } />
          <Route path='/login' element={<Login/> } />
          <Route path='/cadastro' element={<Cadastro/> } />
          <Route path='/dashboard' element={<Dashboard/> } />
          <Route path='/eventos' element={<Eventos/> } />
        </Routes>
      </BrowserRouter>
      <Rodape/>
    </>
  )
}

export default App
