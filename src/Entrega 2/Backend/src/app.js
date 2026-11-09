import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './rotas/auth.js';
import { ErroApi } from './erros/ErroApi.js';
import { ErroConflito } from './erros/ErroConflito.js';

export function criarApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ mensagem: "API da Plataforma TrocaTicket_Tic-tic-boom funcionando." });
  });

  app.use("/auth", authRouter);

  app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada." });
  });

  app.use((erro, req, res, next) => {
    if (res.headersSent) {
      return next(erro);
    }

    if (erro.code === "23505") {
      const mensagensPorRestricao = {
        usuario_email_key: "Este e-mail já está cadastrado.",
        usuario_cpf_key: "Este CPF já está cadastrado.",
      };
      const mensagem = mensagensPorRestricao[erro.constraint]
        || "Já existe um cadastro com um dos dados informados.";
      erro = new ErroConflito(mensagem);
    }

    if (erro instanceof ErroApi) {
      return res.status(erro.statusCode).json({
        erro: erro.message,
        ...(erro.campo ? { campo: erro.campo } : {}),
      });
    }

    console.error("Erro interno da API:", erro);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  });

  return app;
}