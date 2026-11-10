import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ErroNaoAutorizado } from "../erros/ErroNaoAutorizado.js";
import { ErroApi } from "../erros/ErroApi.js";
import { cadastrarUsuarioComCliente, buscarUsuarioPorEmail } from "../repositorios/usuariosRepositorio.js";
import { authPerfil } from "../middlewares/auth_perfil.js";
import { validarDadosCadastro } from "../validadores/cadastroValidador.js";

const router = Router();
const TEMPO_EXPIRACAO_SEGUNDOS = 20 * 60;

router.post("/cadastro", async (req, res) => {
  const { dadosUsuario, dadosCliente } = validarDadosCadastro(req.body);
  const senha_hash = await bcrypt.hash(dadosUsuario.senha, 12);
  const usuario = {
    ...dadosUsuario,
    senha_hash,
  };
  delete usuario.senha;

  await cadastrarUsuarioComCliente(usuario, dadosCliente);

  return res.status(201).json({
    status: "pendente",
    redirecionarPara: "/cadastro-pendente",
    mensagem: "Cadastro recebido para análise.",
  });
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body ?? {};

  if (typeof email !== "string" || typeof senha !== "string" || !email.trim() || !senha) {
    throw new ErroNaoAutorizado("E-mail ou senha inválidos.");
  }

  const usuario = await buscarUsuarioPorEmail(email.trim());
  const senhaValida = usuario
    ? await bcrypt.compare(senha, usuario.senha_hash)
    : false;

  if (!usuario || !senhaValida) {
    throw new ErroNaoAutorizado("E-mail ou senha inválidos.");
  }

  const perfil = usuario.id_adm
    ? "admin"
    : usuario.tipo_perfil;

  if (!perfil || !["admin", "organizador", "fornecedor"].includes(perfil)) {
    throw new ErroNaoAutorizado("E-mail ou senha inválidos.");
  }

  if (usuario.status === "pendente" && usuario.id_cliente) {
    return res.status(200).json({
      status: "pendente",
      perfil,
      redirecionarPara: "/cadastro-pendente",
    });
  }

  if (usuario.status !== "ativo") {
    throw new ErroNaoAutorizado("E-mail ou senha inválidos.");
  }

  if (!process.env.JWT_SECRET) {
    throw new ErroApi("JWT_SECRET não está configurada.", 500);
  }

  const payload = {
    perfil,
    ...(usuario.id_cliente ? { id_cliente: usuario.id_cliente } : {}),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    subject: String(usuario.id_usuario),
    expiresIn: TEMPO_EXPIRACAO_SEGUNDOS,
    algorithm: "HS256",
  });

  return res.json({
    status: usuario.status,
    token,
    usuario: {
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      perfil,
      ...(usuario.id_cliente ? { id_cliente: usuario.id_cliente } : {}),
    },
  });
});

router.get("/me", authPerfil(["admin", "organizador", "fornecedor"]), (req, res) => {
  res.json({ usuario: req.usuario });
});

export default router;
