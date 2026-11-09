import { ErroValidacao } from "../erros/ErroValidacao.js";

const PERFIS_CLIENTE = ["organizador", "fornecedor"];
const UFS_VALIDAS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
  "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
  "RR", "SC", "SP", "SE", "TO",
];

function textoObrigatorio(dados, campo, rotulo, limite) {
  const valor = dados[campo];
  if (typeof valor !== "string" || !valor.trim()) {
    throw new ErroValidacao(`${rotulo} é obrigatório.`, campo);
  }

  const valorNormalizado = valor.trim();
  if (valorNormalizado.length > limite) {
    throw new ErroValidacao(`${rotulo} deve ter no máximo ${limite} caracteres.`, campo);
  }

  return valorNormalizado;
}

function apenasDigitos(valor) {
  return valor.replace(/\D/g, "");
}

function validarCaracteresNumericos(valor, campo, rotulo) {
  if (!/^[\d\s()./-]+$/.test(valor)) {
    throw new ErroValidacao(`${rotulo} contém caracteres inválidos.`, campo);
  }
}

export function validarDadosCadastro(dados) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    throw new ErroValidacao("Informe os dados do cadastro.");
  }

  const tipo_perfil = dados.tipo_perfil;
  if (!PERFIS_CLIENTE.includes(tipo_perfil)) {
    throw new ErroValidacao("Selecione um tipo de atuação válido.", "tipo_perfil");
  }

  const nome = textoObrigatorio(dados, "nome", "Nome completo", 150);
  const email = textoObrigatorio(dados, "email", "E-mail", 150).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ErroValidacao("Informe um e-mail válido.", "email");
  }

  const telefoneInformado = textoObrigatorio(dados, "telefone", "Telefone", 30);
  validarCaracteresNumericos(telefoneInformado, "telefone", "Telefone");
  const telefoneDigitos = apenasDigitos(telefoneInformado);
  if (telefoneDigitos.length < 10 || telefoneDigitos.length > 11) {
    throw new ErroValidacao("Informe um telefone com DDD válido.", "telefone");
  }

  const cpfInformado = textoObrigatorio(dados, "cpf", "CPF", 14);
  validarCaracteresNumericos(cpfInformado, "cpf", "CPF");
  const cpf = apenasDigitos(cpfInformado);
  if (cpf.length !== 11) {
    throw new ErroValidacao("Informe um CPF com 11 dígitos.", "cpf");
  }

  const senha = dados.senha;
  if (typeof senha !== "string" || senha.length < 8) {
    throw new ErroValidacao("A senha deve ter pelo menos 8 caracteres.", "senha");
  }
  if (Buffer.byteLength(senha, "utf8") > 72) {
    throw new ErroValidacao("A senha deve ter no máximo 72 bytes.", "senha");
  }

  const cnpjInformado = textoObrigatorio(dados, "cnpj", "CNPJ", 20);
  validarCaracteresNumericos(cnpjInformado, "cnpj", "CNPJ");
  const cnpj = apenasDigitos(cnpjInformado);
  if (cnpj.length !== 14) {
    throw new ErroValidacao("Informe um CNPJ com 14 dígitos.", "cnpj");
  }

  const cepInformado = textoObrigatorio(dados, "cep", "CEP", 10);
  validarCaracteresNumericos(cepInformado, "cep", "CEP");
  const cep = apenasDigitos(cepInformado);
  if (cep.length !== 8) {
    throw new ErroValidacao("Informe um CEP com 8 dígitos.", "cep");
  }

  const uf_estado = textoObrigatorio(dados, "uf_estado", "UF", 2).toUpperCase();
  if (!UFS_VALIDAS.includes(uf_estado)) {
    throw new ErroValidacao("Informe uma UF brasileira válida.", "uf_estado");
  }

  return {
    dadosUsuario: {
      nome,
      email,
      telefone: telefoneDigitos,
      cpf,
      senha,
    },
    dadosCliente: {
      tipo_perfil,
      cep,
      logradouro: textoObrigatorio(dados, "logradouro", "Logradouro", 150),
      numero_end: textoObrigatorio(dados, "numero_end", "Número", 20),
      bairro: textoObrigatorio(dados, "bairro", "Bairro", 100),
      cidade: textoObrigatorio(dados, "cidade", "Cidade", 100),
      uf_estado,
      cnpj,
      razao_social: textoObrigatorio(dados, "razao_social", "Razão social", 150),
      nome_fantasia: textoObrigatorio(dados, "nome_fantasia", "Nome fantasia", 150),
      categoria: textoObrigatorio(dados, "categoria", "Categoria", 100),
    },
  };
}
