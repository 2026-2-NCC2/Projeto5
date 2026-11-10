import pool from "../bancoDados.js";

const CONSULTA_PROPOSTAS = `
  SELECT
    p.cod_item AS "codItem",
    p.id_fornecedor AS "idFornecedor",
    p.validade,
    p.valor,
    p.status,
    p.descricao,
    fornecedor.nome_fantasia AS "nomeFantasia",
    e.cod_evento AS "codEvento",
    e.nome AS "nomeEvento",
    ic.categoria
  FROM proposta p
  JOIN item_custo ic ON ic.cod_item = p.cod_item
  JOIN evento e ON e.cod_evento = ic.id_evento
  JOIN cliente fornecedor ON fornecedor.id_cliente = p.id_fornecedor
`;

export async function listarPropostasOrganizador(idOrganizador, codItem = null) {
  const resultado = await pool.query(
    `${CONSULTA_PROPOSTAS}
     WHERE e.id_organizador = $1
       AND ($2::INT IS NULL OR p.cod_item = $2)
     ORDER BY p.criado_em DESC, p.cod_item`,
    [idOrganizador, codItem]
  );

  return resultado.rows;
}

export async function listarPropostasFornecedor(idFornecedor) {
  const resultado = await pool.query(
    `${CONSULTA_PROPOSTAS}
     WHERE p.id_fornecedor = $1
     ORDER BY p.criado_em DESC, p.cod_item`,
    [idFornecedor]
  );

  return resultado.rows;
}

export async function listarTodasPropostas(codItem = null) {
  const resultado = await pool.query(
    `${CONSULTA_PROPOSTAS}
     WHERE ($1::INT IS NULL OR p.cod_item = $1)
     ORDER BY p.criado_em DESC, p.cod_item`,
    [codItem]
  );

  return resultado.rows;
}

export async function buscarPropostaPorId(codItem, idFornecedor, perfil, idCliente) {
  const resultado = await pool.query(
    `SELECT
       p.cod_item AS "codItem",
       p.id_fornecedor AS "idFornecedor",
       p.validade,
       p.valor,
       p.descricao,
       p.status,
       fornecedor.nome_fantasia AS "nomeFantasia",
       ic.categoria,
       ic.informacao_geral AS "informacaoGeral",
       ic.status AS "statusItem",
       e.cod_evento AS "codEvento",
       e.nome AS "nomeEvento",
       e.cidade,
       e.uf_estado AS "ufEstado",
       e.data_inicio AS "dataInicio",
       e.data_final AS "dataFinal",
       e.descricao AS "descricaoEvento"
     FROM proposta p
     JOIN item_custo ic ON ic.cod_item = p.cod_item
     JOIN evento e ON e.cod_evento = ic.id_evento
     JOIN cliente fornecedor ON fornecedor.id_cliente = p.id_fornecedor
     WHERE p.cod_item = $1
       AND p.id_fornecedor = $2
       AND (
         $3 = 'admin'
         OR ($3 = 'organizador' AND e.id_organizador = $4)
         OR ($3 = 'fornecedor' AND p.id_fornecedor = $4)
       )`,
    [codItem, idFornecedor, perfil, idCliente]
  );

  return resultado.rows[0] ?? null;
}
