import { Router } from "express";
import { authPerfil } from "../middlewares/auth_perfil.js";
import {
  cancelarEventoPorId,
  buscarEventoPorId,
  buscarEventosPlan,
  buscarEventosPorIdOrg,
  listarEventos,
} from "../repositorios/eventosRepositorio.js";
import { ErroApi } from "../erros/ErroApi.js";
import { ErroNaoEncontrado } from "../erros/ErroNaoEncontrado.js";
import { calcularTicket } from "../utilitarios/calcularTicket.js";

const router = Router();

function criarEstimativaTicket(evento) {
  const custoTotal = Number(evento.custoTotal);
  const margem = Number(evento.margemLucro) / 100;
  const calcularCenario = (rotulo, publico, margemCenario) => {
    const publicoNumerico = Number(publico);
    const ticket = Number.isFinite(custoTotal)
      && publico !== null
      && publico !== undefined
      && Number.isFinite(publicoNumerico)
      && publicoNumerico > 0
      ? calcularTicket(custoTotal, publicoNumerico, margemCenario)
      : null;

    return { rotulo, publico: publico ?? null, margem: margemCenario, ticket };
  };

  return {
    custoTotal,
    cenarios: [
      calcularCenario("Público mínimo", evento.pubMinimo, margem),
      calcularCenario("Público esperado", evento.pubEsperado, margem),
      calcularCenario("Público máximo", evento.pubMaximo, margem),
      calcularCenario("Ticket de Equilíbrio", evento.pubMinimo, 0),
    ],
  };
}

router.patch(
  "/:id/cancelar",
  authPerfil(["admin", "organizador"]),
  async (req, res) => {
    const idEvento = Number(req.params.id);
    if (!Number.isSafeInteger(idEvento) || idEvento < 1) {
      throw new ErroApi("Informe um identificador de evento válido.", 400);
    }

    const evento = await cancelarEventoPorId(
      idEvento,
      req.usuario.perfil,
      req.usuario.id_cliente ?? null
    );

    if (!evento) {
      throw new ErroNaoEncontrado("Evento não encontrado ou sem permissão para cancelá-lo.");
    }

    return res.json({ evento, mensagem: "Evento cancelado com sucesso." });
  }
);

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

    const respostaEvento = req.usuario.perfil === "admin" || req.usuario.perfil === "organizador"
      ? { ...evento, estimativaTicket: criarEstimativaTicket(evento) }
      : evento;

    return res.json({ evento: respostaEvento });
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
