import pool from "../bancoDados.js";

export async function buscarEventoPorId(idEvento, perfil, idCliente) {
  const resultado = await pool.query(
    `SELECT
       e.cod_evento AS "codEvento",
       e.id_organizador AS "idOrganizador",
       e.status,
       e.nome,
       e.data_inicio AS "dataInicio",
       e.data_final AS "dataFinal",
       e.horario_inicio AS "horarioInicio",
       e.horario_final AS "horarioFinal",
       e.data_montagem AS "dataMontagem",
       e.data_desmontagem AS "dataDesmontagem",
       e.local_evento AS "localEvento",
       e.cep,
       e.logradouro,
       e.numero_end AS "numeroEndereco",
       e.bairro,
       e.cidade,
       e.uf_estado AS "ufEstado",
       e.margem_lucro AS "margemLucro",
       e.pub_minimo AS "pubMinimo",
       e.pub_esperado AS "pubEsperado",
       e.pub_maximo AS "pubMaximo",
       e.outros_custos AS "outrosCustos",
       e.ticket_equilibrio AS "ticketEquilibrio",
       e.ticket_medio AS "ticketMedio",
       e.descricao,
       e.criado_em AS "criadoEm",
       c.nome_fantasia AS "nomeFantasia",
       COALESCE(
         (
           SELECT json_agg(
             json_build_object(
               'codItem', ic.cod_item,
               'categoria', ic.categoria,
               'quantidade', ic.quantidade,
               'informacaoGeral', ic.informacao_geral,
               'status', ic.status,
               'propostas',
                 CASE
                   WHEN $2 IN ('admin', 'organizador') THEN COALESCE(
                     (
                       SELECT json_agg(
                         json_build_object(
                           'nomeFantasia', fornecedor.nome_fantasia,
                           'valor', p.valor,
                           'validade', p.validade,
                           'descricao', p.descricao,
                           'status', p.status
                         )
                         ORDER BY p.criado_em
                       )
                       FROM proposta p
                       JOIN cliente fornecedor ON fornecedor.id_cliente = p.id_fornecedor
                       WHERE p.cod_item = ic.cod_item
                     ),
                     '[]'::json
                   )
                   ELSE '[]'::json
                 END
             )
             ORDER BY ic.cod_item
           )
           FROM item_custo ic
           WHERE ic.id_evento = e.cod_evento
         ),
         '[]'::json
       ) AS "itensCusto",
       CASE
         WHEN $2 IN ('admin', 'organizador') THEN COALESCE(
           (
             SELECT SUM(p.valor)
             FROM item_custo ic
             JOIN proposta p ON p.cod_item = ic.cod_item
             WHERE ic.id_evento = e.cod_evento
               AND p.status = 'aprovada'
           ),
           0
         )
         ELSE NULL
       END AS "totalPropostasAprovadas"
     FROM evento e
     JOIN cliente c ON c.id_cliente = e.id_organizador
     WHERE e.cod_evento = $1
       AND ($2 <> 'organizador' OR e.id_organizador = $3)
       AND ($2 <> 'fornecedor' OR e.status = 'planejamento')`,
    [idEvento, perfil, idCliente]
  );

  return resultado.rows[0] ?? null;
}

export async function listarEventos() {
  const resultado = await pool.query(
    `SELECT
       e.cod_evento AS "codEvento",
       c.nome_fantasia AS "nomeFantasia",
       e.nome,
       e.status,
       e.data_inicio AS "dataInicio",
       e.data_final AS "dataFinal",
       e.cidade,
       e.uf_estado AS "ufEstado",
       e.local_evento AS "localEvento",
       COUNT(ic.cod_item)::INT AS "totalItensCusto"
     FROM evento e
     JOIN cliente c ON c.id_cliente = e.id_organizador
     LEFT JOIN item_custo ic ON ic.id_evento = e.cod_evento
     GROUP BY
       e.cod_evento,
       c.nome_fantasia,
       e.nome,
       e.status,
       e.data_inicio,
       e.data_final,
       e.cidade,
       e.uf_estado,
       e.local_evento`
  );

  return resultado.rows;
}

export async function buscarEventosPorIdOrg(id_organizador) {
  const resultado = await pool.query(
    `SELECT
       e.cod_evento AS "codEvento",
       e.nome,
       e.status,
       e.data_inicio AS "dataInicio",
       e.data_final AS "dataFinal",
       e.cidade,
       e.uf_estado AS "ufEstado",
       e.local_evento AS "localEvento",
       COUNT(ic.cod_item)::INT AS "totalItensCusto"
     FROM evento e
     LEFT JOIN item_custo ic ON ic.id_evento = e.cod_evento
     WHERE e.id_organizador = $1
     GROUP BY
       e.cod_evento,
       e.nome,
       e.status,
       e.data_inicio,
       e.data_final,
       e.cidade,
       e.uf_estado,
       e.local_evento`,
    [id_organizador]
  );

  return resultado.rows;
}

export async function buscarEventosPlan() {
  const resultado = await pool.query(
    `SELECT
       cod_evento AS "codEvento",
       nome,
       data_inicio AS "dataInicio",
       data_final AS "dataFinal",
       cidade,
       uf_estado AS "ufEstado",
       pub_esperado AS "pubEsperado"
     FROM evento
     WHERE status = 'planejamento'`
  );

  return resultado.rows;
}