import jwt from "jsonwebtoken";
import { ErroNaoAutorizado } from "../erros/ErroNaoAutorizado.js";
import { ErroProibido } from "../erros/ErroProibido.js";

const PERFIS_VALIDOS = ["admin", "organizador", "fornecedor"];

export function authPerfil(perfisPermitidos) {
  if (
    !Array.isArray(perfisPermitidos)
    || perfisPermitidos.length === 0
    || perfisPermitidos.some((perfil) => !PERFIS_VALIDOS.includes(perfil))
  ) {
    throw new TypeError(
      "Informe uma lista não vazia contendo apenas perfis autorizados válidos."
    );
  }

  return function validarAutenticacaoEPerfil(req, res, next) {
    const autorizacao = req.get("authorization");
    const correspondencia = autorizacao?.match(/^Bearer\s+(.+)$/i);

    if (!correspondencia) {
      return next(new ErroNaoAutorizado("Token de acesso não informado."));
    }

    if (!process.env.JWT_SECRET) {
      return next(new Error("JWT_SECRET não está configurada."));
    }

    let dadosToken;
    try {
      dadosToken = jwt.verify(correspondencia[1], process.env.JWT_SECRET, {
        algorithms: ["HS256"],
      });
    } catch (erro) {
      if (erro instanceof jwt.JsonWebTokenError || erro instanceof jwt.TokenExpiredError) {
        return next(new ErroNaoAutorizado("Token inválido ou expirado."));
      }
      return next(erro);
    }

    const perfil = dadosToken.perfil;
    const idUsuario = dadosToken.sub;
    const idCliente = dadosToken.id_cliente;

    if (
      typeof dadosToken === "string"
      || !idUsuario
      || !PERFIS_VALIDOS.includes(perfil)
      || (["organizador", "fornecedor"].includes(perfil) && !idCliente)
    ) {
      return next(new ErroNaoAutorizado("Token inválido ou expirado."));
    }

    if (!perfisPermitidos.includes(perfil)) {
      return next(new ErroProibido("Perfil sem permissão para acessar esta rota."));
    }

    req.usuario = {
      id_usuario: Number(idUsuario),
      perfil,
      ...(idCliente ? { id_cliente: Number(idCliente) } : {}),
    };

    return next();
  };
}
