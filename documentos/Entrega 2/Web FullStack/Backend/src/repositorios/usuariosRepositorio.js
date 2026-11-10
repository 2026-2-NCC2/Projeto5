import pool from "../bancoDados.js";

export async function buscarUsuarioPorEmail(email) {
  const resultado = await pool.query(
    `SELECT
       u.id_usuario,
       u.status,
       u.nome,
       u.email,
       u.senha_hash,
       a.id_adm,
       c.id_cliente,
       c.tipo_perfil
     FROM usuario u
     LEFT JOIN administrador a ON a.id_usuario = u.id_usuario
     LEFT JOIN cliente c ON c.id_usuario = u.id_usuario
     WHERE LOWER(u.email) = LOWER($1)`,
    [email]
  );

  return resultado.rows[0] ?? null;
}

async function inserirUsuario(client, dados) {
  const { nome, email, telefone, senha_hash, cpf } = dados;

  const resultado = await client.query(
    `INSERT INTO usuario (nome, email, telefone, senha_hash, cpf)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_usuario, status, nome, email, telefone, cpf, criado_em, atualizado_em`,
    [nome, email, telefone, senha_hash, cpf]
  );

  return resultado.rows[0];
}

async function inserirCliente(client, dados) {
  const {
    id_usuario,
    tipo_perfil,
    cep,
    logradouro,
    numero_end,
    bairro,
    cidade,
    uf_estado,
    cnpj,
    razao_social,
    nome_fantasia,
    categoria,
  } = dados;

  const resultado = await client.query(
    `INSERT INTO cliente (
       id_usuario, tipo_perfil, cep, logradouro, numero_end, bairro,
       cidade, uf_estado, cnpj, razao_social, nome_fantasia, categoria
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *`,
    [
      id_usuario,
      tipo_perfil,
      cep,
      logradouro,
      numero_end,
      bairro,
      cidade,
      uf_estado,
      cnpj,
      razao_social,
      nome_fantasia,
      categoria,
    ]
  );

  return resultado.rows[0];
}

export async function cadastrarUsuarioComCliente(dadosUsuario, dadosCliente) {
  const client = await pool.connect();
  let transacaoIniciada = false;

  try {
    await client.query("BEGIN");
    transacaoIniciada = true;

    const usuario = await inserirUsuario(client, dadosUsuario);
    const cliente = await inserirCliente(client, {
      ...dadosCliente,
      id_usuario: usuario.id_usuario,
    });

    await client.query("COMMIT");
    transacaoIniciada = false;

    return { usuario, cliente };
  } catch (erro) {
    if (transacaoIniciada) {
      try {
        await client.query("ROLLBACK");
      } catch (erroRollback) {
        throw new AggregateError(
          [erro, erroRollback],
          "Falha ao cadastrar usuário e cliente e ao reverter a transação."
        );
      }
    }

    throw erro;
  } finally {
    client.release();
  }
}
