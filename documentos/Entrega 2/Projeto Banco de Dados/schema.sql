-- Script PostgreSQL - Projeto TrocaTicket_Tic-tic-boom

-- Criação dos tipos enumerados (ENUM)
CREATE TYPE status_usuario_enum AS ENUM ('ativo', 'inativo', 'pendente');
CREATE TYPE tipo_perfil_enum AS ENUM ('organizador', 'fornecedor');
CREATE TYPE status_evento_enum AS ENUM ('planejamento', 'confirmado', 'cancelado', 'realizado');
CREATE TYPE status_item_enum AS ENUM ('pendente', 'aprovado');
CREATE TYPE status_proposta_enum AS ENUM ('recusada', 'aprovada', 'expirada', 'pendente');

-- 1. Tabela base de Usuários
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    status status_usuario_enum NOT NULL DEFAULT 'pendente',
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(30),
    senha_hash VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Administradores
CREATE TABLE administrador (
    id_adm SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- 3. Tabela de Clientes (unifica Organizador/Fornecedor)
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    tipo_perfil tipo_perfil_enum NOT NULL,
    cep VARCHAR(10),
    logradouro VARCHAR(150),
    numero_end VARCHAR(20),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf_estado VARCHAR(2),
    cnpj VARCHAR(20),
    razao_social VARCHAR(150),
    nome_fantasia VARCHAR(150),
    categoria VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Eventos
CREATE TABLE evento (
    cod_evento SERIAL PRIMARY KEY,
    id_organizador INT NOT NULL REFERENCES cliente(id_cliente) ON DELETE CASCADE,
    status status_evento_enum NOT NULL DEFAULT 'planejamento',
    nome VARCHAR(150) NOT NULL,
    data_inicio DATE NOT NULL,
    data_final DATE NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_final TIME NOT NULL,
    data_montagem TIMESTAMP,
    data_desmontagem TIMESTAMP,
    local_evento VARCHAR(150),
    cep VARCHAR(10),
    logradouro VARCHAR(150),
    numero_end VARCHAR(20),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf_estado VARCHAR(2),
    margem_lucro DECIMAL(5, 2) NOT NULL DEFAULT 0.00 CHECK (margem_lucro >= 0 AND margem_lucro <= 40),
    pub_minimo INT CHECK (pub_minimo >= 0),
    pub_esperado INT CHECK (pub_esperado >= 0),
    pub_maximo INT CHECK (pub_maximo >= 0),
    outros_custos FLOAT CHECK (outros_custos >= 0),
    ticket_equilibrio DECIMAL(10, 2) CHECK (ticket_equilibrio >= 0),
    ticket_medio DECIMAL(10, 2) CHECK (ticket_medio >= 0),
    descricao VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Validações lógicas
    CONSTRAINT chk_datas_evento CHECK (data_inicio <= data_final),
    CONSTRAINT chk_faixa_publico CHECK (pub_minimo <= pub_esperado AND pub_esperado <= pub_maximo)
);

-- 5. Tabela de Itens de Custo do Evento
CREATE TABLE item_custo (
    cod_item SERIAL PRIMARY KEY,
    id_evento INT NOT NULL REFERENCES evento(cod_evento) ON DELETE CASCADE,
    categoria VARCHAR(100) NOT NULL,
    quantidade FLOAT NOT NULL CHECK (quantidade > 0),
    informacao_geral VARCHAR(255),
    status status_item_enum NOT NULL DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabela de Propostas
CREATE TABLE proposta (
    cod_item INT NOT NULL REFERENCES item_custo(cod_item) ON DELETE CASCADE,
    id_fornecedor INT NOT NULL REFERENCES cliente(id_cliente) ON DELETE CASCADE,
    validade TIMESTAMP NOT NULL,
    valor FLOAT NOT NULL CHECK (valor >= 0),
    descricao VARCHAR(255),
    PRIMARY KEY (cod_item, id_fornecedor),
    status status_proposta_enum NOT NULL DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================================
-- Automação de UPDATE em Timestamps

-- Função genérica executada pelo gatilho
CREATE OR REPLACE FUNCTION atualizar_coluna_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Gatilho para a tabela 'usuario'
CREATE TRIGGER trg_atualiza_usuario
    BEFORE UPDATE ON usuario
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_coluna_atualizado_em();

-- Gatilho para a tabela 'cliente'
CREATE TRIGGER trg_atualiza_cliente
    BEFORE UPDATE ON cliente
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_coluna_atualizado_em();

-- Gatilho para a tabela 'evento'
CREATE TRIGGER trg_atualiza_evento
    BEFORE UPDATE ON evento
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_coluna_atualizado_em();

-- Gatilho para a tabela 'item_custo'
CREATE TRIGGER trg_atualiza_item_custo
    BEFORE UPDATE ON item_custo
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_coluna_atualizado_em();

-- Gatilho para a tabela 'proposta'
CREATE TRIGGER trg_atualiza_proposta
    BEFORE UPDATE ON proposta
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_coluna_atualizado_em();