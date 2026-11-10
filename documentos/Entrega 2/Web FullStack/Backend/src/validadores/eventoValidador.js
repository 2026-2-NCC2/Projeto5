import { ErroValidacao } from "../erros/ErroValidacao.js";

function textoObrigatorio(dados, campo, rotulo, limite) {
  const valor = dados[campo];
  if (typeof valor !== "string" || !valor.trim()) {
    throw new ErroValidacao(`${rotulo} é obrigatório.`, campo);
  }

  const normalizado = valor.trim();
  if (normalizado.length > limite) {
    throw new ErroValidacao(`${rotulo} deve ter no máximo ${limite} caracteres.`, campo);
  }

  return normalizado;
}

function numeroObrigatorio(
  dados,
  campo,
  rotulo,
  { minimo = 0, maximo = Number.MAX_SAFE_INTEGER, inteiro = false, minimoExclusivo = false } = {}
) {
  const valor = dados[campo];
  if (valor === undefined || valor === null || valor === "") {
    throw new ErroValidacao(`${rotulo} é obrigatório.`, campo);
  }

  const numero = Number(valor);
  if (
    !Number.isFinite(numero)
    || (minimoExclusivo ? numero <= minimo : numero < minimo)
    || numero > maximo
    || (inteiro && !Number.isInteger(numero))
  ) {
    const faixa = minimoExclusivo
      ? `maior que ${minimo} e menor ou igual a ${maximo}`
      : `entre ${minimo} e ${maximo}`;
    throw new ErroValidacao(`${rotulo} deve ser ${inteiro ? "um número inteiro" : "um número"} ${faixa}.`, campo);
  }

  return numero;
}

function validarData(dados, campo, rotulo) {
  const valor = textoObrigatorio(dados, campo, rotulo, 10);
  const correspondencia = valor.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!correspondencia) {
    throw new ErroValidacao(`${rotulo} deve ser uma data válida.`, campo);
  }

  const [, ano, mes, dia] = correspondencia;
  const data = new Date(Date.UTC(Number(ano), Number(mes) - 1, Number(dia)));
  if (
    data.getUTCFullYear() !== Number(ano)
    || data.getUTCMonth() !== Number(mes) - 1
    || data.getUTCDate() !== Number(dia)
  ) {
    throw new ErroValidacao(`${rotulo} deve ser uma data válida.`, campo);
  }

  return valor;
}

function validarDataHora(dados, campo, rotulo) {
  const valor = textoObrigatorio(dados, campo, rotulo, 16);
  const correspondencia = valor.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})$/);
  if (!correspondencia) {
    throw new ErroValidacao(`${rotulo} deve conter uma data e horário válidos.`, campo);
  }

  validarData({ data: correspondencia[1] }, "data", rotulo);
  const hora = Number(correspondencia[2]);
  const minuto = Number(correspondencia[3]);
  if (hora > 23 || minuto > 59) {
    throw new ErroValidacao(`${rotulo} deve conter uma data e horário válidos.`, campo);
  }

  return valor.replace("T", " ");
}

function validarHorario(dados, campo, rotulo) {
  const valor = textoObrigatorio(dados, campo, rotulo, 5);
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(valor)) {
    throw new ErroValidacao(`${rotulo} deve ser um horário válido.`, campo);
  }
  return valor;
}

export function validarDadosEvento(dados) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    throw new ErroValidacao("Informe os dados do evento.");
  }

  if (!Array.isArray(dados.itensCusto) || dados.itensCusto.length === 0) {
    throw new ErroValidacao("Informe ao menos um item de custo.", "itensCusto");
  }

  const evento = {
    nome: textoObrigatorio(dados, "nome", "Nome do evento", 150),
    data_inicio: validarData(dados, "data_inicio", "Data de início"),
    data_final: validarData(dados, "data_final", "Data final"),
    horario_inicio: validarHorario(dados, "horario_inicio", "Horário de início"),
    horario_final: validarHorario(dados, "horario_final", "Horário final"),
    data_montagem: validarDataHora(dados, "data_montagem", "Data e horário de montagem"),
    data_desmontagem: validarDataHora(dados, "data_desmontagem", "Data e horário de desmontagem"),
    local_evento: textoObrigatorio(dados, "local_evento", "Local do evento", 150),
    cep: textoObrigatorio(dados, "cep", "CEP", 10),
    logradouro: textoObrigatorio(dados, "logradouro", "Logradouro", 150),
    numero_end: textoObrigatorio(dados, "numero_end", "Número", 20),
    bairro: textoObrigatorio(dados, "bairro", "Bairro", 100),
    cidade: textoObrigatorio(dados, "cidade", "Cidade", 100),
    uf_estado: textoObrigatorio(dados, "uf_estado", "UF", 2).toUpperCase(),
    margem_lucro: numeroObrigatorio(dados, "margem_lucro", "Margem de lucro", { maximo: 40 }),
    pub_minimo: numeroObrigatorio(dados, "pub_minimo", "Público mínimo", { maximo: 2147483647, inteiro: true }),
    pub_esperado: numeroObrigatorio(dados, "pub_esperado", "Público esperado", { maximo: 2147483647, inteiro: true }),
    pub_maximo: numeroObrigatorio(dados, "pub_maximo", "Público máximo", { maximo: 2147483647, inteiro: true }),
    outros_custos: numeroObrigatorio(dados, "outros_custos", "Outros custos"),
    descricao: textoObrigatorio(dados, "descricao", "Descrição", 255),
  };

  if (evento.data_inicio > evento.data_final) {
    throw new ErroValidacao("A data final deve ser igual ou posterior à data de início.", "data_final");
  }
  if (!(evento.pub_minimo <= evento.pub_esperado && evento.pub_esperado <= evento.pub_maximo)) {
    throw new ErroValidacao("Informe o público em ordem crescente: mínimo, esperado e máximo.", "pub_esperado");
  }
  if (!/^[A-Z]{2}$/.test(evento.uf_estado)) {
    throw new ErroValidacao("Informe a UF com duas letras.", "uf_estado");
  }
  if (!/^[\d\s.-]+$/.test(evento.cep)) {
    throw new ErroValidacao("Informe um CEP válido.", "cep");
  }

  const itensCusto = dados.itensCusto.map((item, indice) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new ErroValidacao(`Informe os dados do item de custo ${indice + 1}.`, "itensCusto");
    }

    return {
      categoria: textoObrigatorio(item, "categoria", `Categoria do item ${indice + 1}`, 100),
      quantidade: numeroObrigatorio(item, "quantidade", `Quantidade do item ${indice + 1}`, { minimoExclusivo: true }),
      informacao_geral: textoObrigatorio(item, "informacao_geral", `Descrição do item ${indice + 1}`, 255),
    };
  });

  return { evento, itensCusto };
}
