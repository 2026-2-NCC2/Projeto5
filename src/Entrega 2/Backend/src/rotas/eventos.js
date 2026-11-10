import { Router } from "express";
import { authPerfil } from "../middlewares/auth_perfil.js";
import {
  buscarEventoPorId,
  buscarEventosPlan,
  buscarEventosPorIdOrg,
  listarEventos,
} from "../repositorios/eventosRepositorio.js";
import { ErroApi } from "../erros/ErroApi.js";
import { ErroNaoEncontrado } from "../erros/ErroNaoEncontrado.js";

const router = Router();

router.get(
  "/:id",
  authPerfil(["admin", "organizador", "fornecedor"]),
  async (req, res) => {
    const idEvento = Number(req.params.id);
    if (!Number.isSafeInteger(idEvento) || idEvento < 1) {
      throw new ErroApi("Informe um identificador de evento válido.", 400);
    }

    const evento = await buscarEventoPorId(
      idEvento,
      req.usuario.perfil,
      req.usuario.id_cliente ?? null
    );

    if (!evento) {
      throw new ErroNaoEncontrado("Evento não encontrado ou sem permissão para acessá-lo.");
    }

    return res.json({ evento });
  }
);

router.get(
  "/",
  authPerfil(["admin", "organizador", "fornecedor"]),
  async (req, res) => {
    let eventos;

    if (req.usuario.perfil === "admin") {
      eventos = await listarEventos();
    } else if (req.usuario.perfil === "organizador") {
      eventos = await buscarEventosPorIdOrg(req.usuario.id_cliente);
    } else {
      eventos = await buscarEventosPlan();
    }

    return res.json({ eventos });
  }
);

export default router;
