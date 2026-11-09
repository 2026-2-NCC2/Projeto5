-- =====================================================================
-- Script de Inserção de Dados Mockados (Seed) - TrocaTicket_Tic-tic-boom
-- =====================================================================

-- 1. Inserção de Usuários (Total: 20)
-- Cobertura de status_usuario_enum: 'ativo', 'inativo', 'pendente'
INSERT INTO usuario (status, nome, email, telefone, senha_hash, cpf) VALUES
-- Administradores (IDs 1 a 2) (hash para senha 'adm12345')
('ativo', 'Admin Master', 'admin1@sistema.com', '(11) 98888-1111', '$2b$12$g5yPhWEl4W3qjaC8JDx8.ORYBoVxIB74S6IGrM5Q1PigVz8.mE10y', '111.111.111-11'),
('ativo', 'Admin Secundário', 'admin2@sistema.com', '(11) 98888-2222', '$2b$12$g5yPhWEl4W3qjaC8JDx8.ORYBoVxIB74S6IGrM5Q1PigVz8.mE10y', '222.222.222-22'),

-- Organizadores (IDs 3 a 9 - Total: 7) (hash para senha 'org67890')
('ativo', 'Carlos Organizador', 'org1@sistema.com', '(11) 97777-1111', '$2b$12$ap5cDyQkhD/qJLiwM9HcS.Wh1tvIcQnO8A4rAnC67q9sDZzaK11Jm', '333.333.333-33'),
('ativo', 'Ana Eventos', 'org2@sistema.com', '(21) 97777-2222', '$2b$12$ap5cDyQkhD/qJLiwM9HcS.Wh1tvIcQnO8A4rAnC67q9sDZzaK11Jm', '444.444.444-44'),
('pendente', 'Marcos Produções', 'org3@sistema.com', '(31) 97777-3333', '$2b$12$ap5cDyQkhD/qJLiwM9HcS.Wh1tvIcQnO8A4rAnC67q9sDZzaK11Jm', '555.555.555-55'),
('ativo', 'Beatriz Festas', 'org4@sistema.com', '(41) 97777-4444', '$2b$12$ap5cDyQkhD/qJLiwM9HcS.Wh1tvIcQnO8A4rAnC67q9sDZzaK11Jm', '666.666.666-66'),
('inativo', 'Lucas Show', 'org5@sistema.com', '(51) 97777-5111', '$2b$12$ap5cDyQkhD/qJLiwM9HcS.Wh1tvIcQnO8A4rAnC67q9sDZzaK11Jm', '777.777.777-77'),
('ativo', 'Juliana Entretenimento', 'org6@sistema.com', '(61) 97777-6111', '$2b$12$ap5cDyQkhD/qJLiwM9HcS.Wh1tvIcQnO8A4rAnC67q9sDZzaK11Jm', '888.888.888-88'),
('ativo', 'Roberto Eventos Corporativos', 'org7@sistema.com', '(71) 97777-7111', '$2b$12$ap5cDyQkhD/qJLiwM9HcS.Wh1tvIcQnO8A4rAnC67q9sDZzaK11Jm', '999.999.999-99'),

-- Fornecedores (IDs 10 a 20 - Total: 11) (hash para senha 'for09876')
('ativo', 'Som & Luz Pro', 'forn1@sistema.com', '(11) 96666-1111', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '123.456.789-01'),
('ativo', 'Buffet Saboroso', 'forn2@sistema.com', '(21) 96666-2222', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '234.567.890-12'),
('ativo', 'Decoração Encanto', 'forn3@sistema.com', '(31) 96666-3333', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '345.678.901-23'),
('inativo', 'Segurança Total', 'forn4@sistema.com', '(41) 96666-4444', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '456.789.012-34'),
('ativo', 'Locação de Palcos Mega', 'forn5@sistema.com', '(51) 96666-5555', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '567.890.123-45'),
('pendente', 'Banda Acústica Show', 'forn6@sistema.com', '(61) 96666-6666', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '678.901.234-56'),
('ativo', 'Buffet Gourmet Premium', 'forn7@sistema.com', '(71) 96666-7777', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '789.012.345-67'),
('ativo', 'Iluminação Cênica Art', 'forn8@sistema.com', '(11) 95555-1111', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '890.123.456-78'),
('ativo', 'Limpeza Express Eventos', 'forn9@sistema.com', '(21) 95555-2222', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '901.234.567-89'),
('inativo', 'Fotografia & Filme', 'forn10@sistema.com', '(31) 95555-3333', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '012.345.678-90'),
('ativo', 'Segurança VIP Guard', 'forn11@sistema.com', '(41) 95555-4444', '$2b$12$TQph21iW/BsqhHNMTmvwo.F.wK/pW99U4CDJzLvVBAqTUHcK/wsLK', '102.304.506-07');


-- 2. Inserção de Administradores (2 registros)
INSERT INTO administrador (id_usuario) VALUES
(1),
(2);


-- 3. Inserção de Clientes (7 organizadores + 11 fornecedores = 18 registros)
-- Cobertura de tipo_perfil_enum: 'organizador', 'fornecedor'
INSERT INTO cliente (id_usuario, tipo_perfil, cep, logradouro, numero_end, bairro, cidade, uf_estado, cnpj, razao_social, nome_fantasia, categoria) VALUES
-- Organizadores (IDs de usuário 3 a 9)
(3, 'organizador', '01001-000', 'Praça da Sé', '100', 'Sé', 'São Paulo', 'SP', '12.345.678/0001-01', 'Carlos Eventos LTDA', 'Carlos Org', 'Corporativo'),
(4, 'organizador', '20040-002', 'Avenida Rio Branco', '200', 'Centro', 'Rio de Janeiro', 'RJ', '22.345.678/0001-02', 'Ana Produções ME', 'Ana Eventos', 'Shows e Festivais'),
(5, 'organizador', '30110-010', 'Avenida Afonso Pena', '500', 'Centro', 'Belo Horizonte', 'MG', '33.345.678/0001-03', 'Marcos Produções LTDA', 'Marcos Show', 'Academico'),
(6, 'organizador', '80010-000', 'Rua XV de Novembro', '300', 'Centro', 'Curitiba', 'PR', '44.345.678/0001-04', 'Beatriz Festas Eireli', 'Beatriz Festas', 'Casamentos'),
(7, 'organizador', '90010-150', 'Rua dos Andradas', '400', 'Centro Histórico', 'Porto Alegre', 'RS', '55.345.678/0001-05', 'Lucas Show Business', 'Lucas Show', 'Shows'),
(8, 'organizador', '70040-010', 'Esplanada dos Ministérios', 's/n', 'Zona Cívico-Administrativa', 'Brasília', 'DF', '66.345.678/0001-06', 'Juliana Entretém S/A', 'Juliana Entretenimento', 'Corporativo'),
(9, 'organizador', '40015-000', 'Praça da Municipalidade', '50', 'Comércio', 'Salvador', 'BA', '77.345.678/0001-07', 'Roberto Corp Events', 'Roberto Eventos', 'Corporativo'),

-- Fornecedores (IDs de usuário 10 a 20)
(10, 'fornecedor', '01310-100', 'Avenida Paulista', '1000', 'Bela Vista', 'São Paulo', 'SP', '11.111.111/0001-11', 'Som e Luz Tecnologia LTDA', 'Som & Luz Pro', 'Áudio e Vídeo'),
(11, 'fornecedor', '20020-030', 'Rua do Ouvidor', '50', 'Centro', 'Rio de Janeiro', 'RJ', '22.222.222/0001-22', 'Gastronomia Saborosa ME', 'Buffet Saboroso', 'Alimentação'),
(12, 'fornecedor', '30130-110', 'Rua da Bahia', '1200', 'Lourdes', 'Belo Horizonte', 'MG', '33.333.333/0001-33', 'Decoracoes Encanto Eireli', 'Decoração Encanto', 'Decoração'),
(13, 'fornecedor', '80220-000', 'Avenida Sete de Setembro', '4500', 'Batel', 'Curitiba', 'PR', '44.444.444/0001-44', 'Seguranca Total Ltda', 'Segurança Total', 'Segurança'),
(14, 'fornecedor', '90200-210', 'Avenida Farrapos', '1500', 'São Geraldo', 'Porto Alegre', 'RS', '55.555.555/0001-55', 'Mega Estruturas Palcos', 'Locação de Palcos Mega', 'Infraestrutura'),
(15, 'fornecedor', '70390-150', 'SCS Quadra 2', 'Bl A', 'Asa Sul', 'Brasília', 'DF', '66.666.666/0001-66', 'Musica ao Vivo Produtora', 'Banda Acústica Show', 'Atração Artística'),
(16, 'fornecedor', '40260-200', 'Avenida Oceânica', '1500', 'Ondina', 'Salvador', 'BA', '77.777.777/0001-77', 'Buffet Gourmet S/A', 'Buffet Gourmet Premium', 'Alimentação'),
(17, 'fornecedor', '04543-011', 'Rua Funchal', '400', 'Vila Olímpia', 'São Paulo', 'SP', '88.888.888/0001-88', 'Iluminacao Cenica Art', 'Iluminação Cênica Art', 'Áudio e Vídeo'),
(18, 'fornecedor', '20030-050', 'Rua da Assembleia', '10', 'Centro', 'Rio de Janeiro', 'RJ', '99.999.999/0001-99', 'Limpeza Express Servicos', 'Limpeza Express Eventos', 'Limpeza'),
(19, 'fornecedor', '30140-071', 'Rua Alagoas', '600', 'Funcionários', 'Belo Horizonte', 'MG', '10.101.101/0001-10', 'Foto Filme Studio', 'Fotografia & Filme', 'Mídia'),
(20, 'fornecedor', '80020-230', 'Rua Marechal Deodoro', '200', 'Centro', 'Curitiba', 'PR', '12.121.121/0001-12', 'VIP Guard Seguranca', 'Segurança VIP Guard', 'Segurança');


-- 4. Inserção de Eventos (9 eventos variando pequeno, médio e grande porte)
-- Cobertura de status_evento_enum: 'planejamento', 'confirmado', 'cancelado', 'realizado'
INSERT INTO evento (id_organizador, status, nome, data_inicio, data_final, horario_inicio, horario_final, data_montagem, data_desmontagem, local_evento, cep, logradouro, numero_end, bairro, cidade, uf_estado, margem_lucro, pub_minimo, pub_esperado, pub_maximo, outros_custos, descricao) VALUES
-- Pequeno Porte
(1, 'confirmado', 'Workshop Inovação Tecnológica', '2026-06-10', '2026-06-10', '09:00:00', '18:00:00', '2026-06-09 08:00:00', '2026-06-10 20:00:00', 'Auditorio Tech SP', '04551-010', 'Av. das Nações Unidas', '12500', 'Itaim Bibi', 'São Paulo', 'SP', 15.00, 50, 80, 100, 1500.00, 'Workshop focado em novas tecnologias e inteligência artificial.'),
(2, 'planejamento', 'Festival de Inverno Acústico', '2026-07-15', '2026-07-17', '19:00:00', '23:30:00', '2026-07-14 10:00:00', '2026-07-18 12:00:00', 'Teatro Municipal RJ', '20021-130', 'Praça Floriano', 's/n', 'Centro', 'Rio de Janeiro', 'RJ', 20.00, 100, 200, 250, 3000.00, 'Música acústica e gastronomia local.'),
(3, 'realizado', 'Semana Acadêmica de Engenharia', '2026-03-10', '2026-03-14', '08:00:00', '17:00:00', '2026-03-09 07:00:00', '2026-03-14 20:00:00', 'Campus UFMG', '31270-901', 'Av. Pres. Antônio Carlos', '6627', 'Pampulha', 'Belo Horizonte', 'MG', 10.00, 150, 300, 400, 2000.00, 'Palestras e minicursos para estudantes de engenharia.'),

-- Médio Porte
(4, 'confirmado', 'Casamento Elegance Summer', '2026-08-20', '2026-08-20', '16:00:00', '04:00:00', '2026-08-19 14:00:00', '2026-08-21 10:00:00', 'Espaço Bella Vista', '80420-210', 'Alameda Dr. Carlos de Carvalho', '1000', 'Centro', 'Curitiba', 'PR', 25.00, 200, 300, 350, 5000.00, 'Casamento de alto padrão com recepção completa.'),
(5, 'planejamento', 'Rock Independent Festival', '2026-09-12', '2026-09-12', '14:00:00', '02:00:00', '2026-09-11 08:00:00', '2026-09-13 14:00:00', 'Pepsi On Stage', '90200-290', 'Av. Severo Dullius', '1995', 'São João', 'Porto Alegre', 'RS', 30.00, 500, 1000, 1200, 12000.00, 'Festival de bandas independentes de rock.'),
(6, 'cancelado', 'Conferência de Negócios Sul', '2026-05-05', '2026-05-06', '09:00:00', '19:00:00', '2026-05-04 08:00:00', '2026-05-06 22:00:00', 'Centro de Convenções DF', '70070-300', 'SBT, Eixo Monumental', 's/n', 'Zona Cívico-Administrativa', 'Brasília', 'DF', 15.00, 300, 600, 800, 8000.00, 'Encontro de líderes e empreendedores do Centro-Oeste.'),
(7, 'confirmado', 'Encontro Nacional de Tecnologia', '2026-10-10', '2026-10-12', '08:30:00', '18:30:00', '2026-10-09 08:00:00', '2026-10-13 12:00:00', 'Centro de Convenções Salvador', '41770-235', 'Av. Octávio Mangabeira', '5485', 'Pituaçu', 'Salvador', 'BA', 20.00, 400, 800, 1000, 10000.00, 'O maior evento de tecnologia da região Nordeste.'),

-- Grande Porte
(1, 'planejamento', 'Mega Arena Eletronic Music', '2026-11-20', '2026-11-21', '22:00:00', '10:00:00', '2026-11-18 08:00:00', '2026-11-22 18:00:00', 'Autódromo de Interlagos', '04829-300', 'Av. Senador Teotônio Vilela', '261', 'Interlagos', 'São Paulo', 'SP', 35.00, 5000, 10000, 15000, 50000.00, 'Festival de música eletrônica com DJs internacionais.'),
(2, 'confirmado', 'Virada Cultural Metropolitana', '2026-12-31', '2027-01-01', '16:00:00', '06:00:00', '2026-12-30 06:00:00', '2027-01-02 12:00:00', 'Praia de Copacabana', '22020-001', 'Av. Atlântica', 's/n', 'Copacabana', 'Rio de Janeiro', 'RJ', 10.00, 20000, 50000, 80000, 100000.00, 'Celebração de ano novo com shows e queima de fogos.');


-- 5. Inserção de Itens de Custo do Evento (21 itens)
-- Cobertura de status_item_enum: 'pendente', 'aprovado'
INSERT INTO item_custo (id_evento, categoria, quantidade, informacao_geral, status) VALUES
-- Evento 1
(1, 'Áudio e Vídeo', 1.0, 'Projetor e sistema de som básico para palestras', 'aprovado'),
(1, 'Alimentação', 80.0, 'Coffee break manhã e tarde', 'aprovado'),
(1, 'Limpeza', 2.0, 'Equipe de limpeza pós-evento', 'pendente'),

-- Evento 2
(2, 'Atração Artística', 3.0, 'Contratação de bandas acústicas locais', 'aprovado'),
(2, 'Áudio e Vídeo', 1.0, 'Sonorização e iluminação cênica de palco', 'pendente'),

-- Evento 3
(3, 'Infraestrutura', 4.0, 'Aluguel de tendas e mesas para feira de projetos', 'aprovado'),
(3, 'Segurança', 5.0, 'Seguranças para controle de acesso ao campus', 'aprovado'),

-- Evento 4
(4, 'Decoração', 1.0, 'Decoração floral completa do salão e altar', 'aprovado'),
(4, 'Alimentação', 300.0, 'Buffet completo com jantar e bebidas', 'aprovado'),
(4, 'Áudio e Vídeo', 1.0, 'DJ e iluminação de pista de dança', 'pendente'),

-- Evento 5
(5, 'Infraestrutura', 1.0, 'Montagem de palco principal e backstage', 'aprovado'),
(5, 'Segurança', 15.0, 'Equipe de segurança privada para o festival', 'pendente'),
(5, 'Áudio e Vídeo', 1.0, 'Painel de LED e som de alta potência', 'pendente'),

-- Evento 6
(6, 'Áudio e Vídeo', 1.0, 'Equipamentos de tradução simultânea', 'pendente'),
(6, 'Alimentação', 600.0, 'Almoço executivo para participantes', 'pendente'),

-- Evento 7
(7, 'Infraestrutura', 10.0, 'Stands modulares para feira de exposição', 'aprovado'),
(7, 'Segurança', 12.0, 'Segurança patrimonial e controle de fluxo', 'aprovado'),
(7, 'Mídia', 2.0, 'Cobertura fotográfica e filmagem oficial', 'pendente'),

-- Evento 8
(8, 'Infraestrutura', 1.0, 'Palco monumental e estruturas metálicas', 'pendente'),
(8, 'Segurança', 50.0, 'Seguranças credenciados para grande público', 'pendente'),

-- Evento 9
(9, 'Limpeza', 30.0, 'Equipe intensiva de limpeza pós-virada', 'aprovado');


-- 6. Inserção de Propostas (13 propostas)
-- Cobertura de status_proposta_enum: 'recusada', 'aprovada', 'expirada', 'pendente'
INSERT INTO proposta (cod_item, id_fornecedor, validade, valor, descricao, status) VALUES
-- Proposta para Item 1
(1, 8, '2026-05-30 23:59:59', 2500.00, 'Proposta para sonorização completa com projetor inclusos.', 'aprovada'),

-- Proposta para Item 2
(2, 9, '2026-05-25 23:59:59', 3200.00, 'Coffee break refinado com opções veganas e tradicionais.', 'aprovada'),

-- Proposta para Item 4 (Status Recusada)
(4, 13, '2026-06-15 23:59:59', 4500.00, 'Cachê para 3 apresentações de bandas acústicas.', 'recusada'),

-- Proposta para Item 6
(6, 12, '2026-02-15 23:59:59', 6000.00, 'Locação e montagem de tendas e mobiliário acadêmico.', 'aprovada'),

-- Proposta para Item 8
(8, 10, '2026-07-01 23:59:59', 12000.00, 'Decoração floral exclusiva com arranjos importados.', 'aprovada'),

-- Proposta para Item 9
(9, 14, '2026-07-10 23:59:59', 45000.00, 'Buffet premium com 4 tipos de carnes e ilha de sobremesas.', 'aprovada'),

-- Proposta para Item 11
(11, 12, '2026-08-01 23:59:59', 18000.00, 'Palco modulado de 12x10 metros com cobertura.', 'aprovada'),

-- Proposta para Item 12 (Status Pendente)
(12, 18, '2026-08-10 23:59:59', 7500.00, '15 profissionais treinados para grandes eventos de rock.', 'pendente'),

-- Proposta para Item 17
(17, 11, '2026-09-01 23:59:59', 8400.00, 'Equipe de 12 seguranças para convenção empresarial.', 'aprovada'),

-- Proposta para Item 18
(18, 17, '2026-09-10 23:59:59', 6000.00, 'Cobertura fotográfica completa e filmagem oficial em alta definição com edição inclusa.', 'aprovada'),

-- Proposta para Item 19 (Status Pendente)
(19, 12, '2026-10-01 23:59:59', 95000.00, 'Estrutura gigante de palco, torres de delay e camarins.', 'pendente'),

-- Proposta para Item 20 (Status Expirada)
(20, 18, '2025-10-15 23:59:59', 35000.00, 'Equipe completa de 50 seguranças com rádio comunicação.', 'expirada'),

-- Proposta para Item 21
(21, 16, '2026-12-01 23:59:59', 15000.00, 'Serviço intensivo de limpeza urbana pós-virada em Copacabana.', 'aprovada');

-- =====================================================================
-- Inserção de Novas Propostas Pendentes com Concorrência de Fornecedores
-- =====================================================================

INSERT INTO proposta (cod_item, id_fornecedor, validade, valor, descricao, status) VALUES
-- 1. Primeira proposta concorrente para o Item de Custo 3 (Limpeza - Evento 1)
(3, 16, '2026-05-20 23:59:59', 1800.00, 'Proposta de limpeza pós-evento com equipe reduzida e eficiente.', 'pendente'),

-- 2. Segunda proposta concorrente para o Item de Custo 3 (Limpeza - Evento 1)
(3, 14, '2026-05-22 23:59:59', 1600.00, 'Proposta competitiva de limpeza com kit de materiais inclusos.', 'pendente'),

-- 3. Primeira proposta concorrente para o Item de Custo 5 (Áudio e Vídeo - Evento 2)
(5, 8, '2026-06-30 23:59:59', 4200.00, 'Sonorização completa e iluminação cênica para teatro.', 'pendente'),

-- 4. Segunda proposta concorrente para o Item de Custo 5 (Áudio e Vídeo - Evento 2)
(5, 15, '2026-07-05 23:59:59', 3900.00, 'Pacote alternativo de áudio e luz focado em acústica.', 'pendente'),

-- 5. Segunda proposta concorrente para o Item de Custo 12 (Segurança - Evento 5)
-- (O item 12 já possuía a proposta do fornecedor 20; agora ganha esta do fornecedor 8)
(12, 11, '2026-08-15 23:59:59', 7200.00, 'Equipe de segurança especializada e treinada para grandes festivais.', 'pendente');