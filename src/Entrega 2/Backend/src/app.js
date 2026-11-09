import 'dotenv/config';
import express from 'express';
import cors from 'cors';

export function criarApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ mensagem: "API da Plataforma TrocaTicket_Tic-tic-boom funcionando." });
  });

  // Implementar 'app.use' para iniciar rotas genericas da API aqui
  // que então apontarão para os controllers de cada rota


  app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada." });
  });

  // Implementar um Error handler central para que 
  // toda rota (síncrona ou async) que lançar um erro caia aqui

  return app;
}