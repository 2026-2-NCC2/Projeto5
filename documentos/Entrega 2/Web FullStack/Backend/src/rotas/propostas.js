import { Router } from "express";
import { ErroApi } from "../erros/ErroApi.js";
import { authPerfil } from "../middlewares/auth_perfil.js";
import {
  listarPropostasFornecedor,
  listarPropostasOrganizador,
  listarTodasPropostas,
  buscarPropostaPorId,
} from "../repositorios/propostasRepositorio.js";

const router = Router();

router.get(
  "/",
  authPerfil(["admin", "organizador", "fornecedor"]),
  async (req, res) => {
    const codItemInformado = req.query.itemCusto;
    let codItem = null;

    if (codItemInformado !== undefined) {
      codItem = Number(codItemInformado);
      if (!Number.isSafeInteger(codItem) || codItem < 1) {
        throw new ErroApi("Informe um identificador de item de custo válido.", 400);
      }
    }

    let propostas;
    if (req.usuario.perfil === "organizador") {
      propostas = await listarPropostasOrganizador(req.usuario.id_cliente, codItem);
    } else if (req.usuario.perfil === "fornecedor") {
      propostas = await listarPropostasFornecedor(req.usuario.id_cliente);
    } else {
      propostas = await listarTodasPropostas(codItem);
    }

    return res.json({ propostas });
  }
);

router.get(
  "/:codItem/:idFornecedor",
  authPerfil(["admin", "organizador", "fornecedor"]),
  async (req, res) => {
    const codItem = Number(req.params.codItem);
    const idFornecedor = Number(req.params.idFornecedor);
    if (
      !Number.isSafeInteger(codItem)
      || codItem < 1
      || !Number.isSafeInteger(idFornecedor)
      || idFornecedor < 1
    ) {
      throw new ErroApi("Informe identificadores válidos para a proposta.", 400);
    }

    const proposta = await buscarPropostaPorId(
      codItem,
      idFornecedor,
      req.usuario.perfil,
      req.usuario.id_cliente ?? null
    );

    if (!proposta) {
      throw new ErroApi("Proposta não encontrada ou sem permissão para acessá-la.", 404);
    }

    return res.json({ proposta });
  }
);

export default router;
