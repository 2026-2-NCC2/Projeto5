É dessa forma que a estrutura do banco de dados se relaciona com o site e sustenta as regras de negócio do TrocaTicket:

### 1. Controle de Acesso e Perfis
O sistema possui um controle de acesso bem estruturado, dividido em três tabelas principais:
* **`usuario`**: É a tabela base de autenticação (guarda e-mail, senha criptografada, CPF e status). Todo mundo que acessa o sistema está aqui. O uso do ENUM `status_usuario_enum` ('ativo', 'inativo', 'pendente') mostra que o sistema exige aprovação de contas.
* **`administrador`**: Usuários com poder de gestão da plataforma.
* **`cliente`**: Unifica os dois perfis que movimentam o negócio através do ENUM `tipo_perfil_enum`:
  * **Organizadores:** Empresas que criam os eventos.
  * **Fornecedores:** Empresas de serviços (som, buffet, segurança, limpeza) que buscam oportunidades.
  * *Nota:* A tabela guarda dados jurídicos (`cnpj`, `razao_social`), o que reforça que o TrocaTicket é voltado para o mercado corporativo (B2B).

### 2. A Lógica de Eventos e Demandas
A lógica de criação de eventos é o motor da plataforma para os Organizadores:
* **`evento`**: O organizador cadastra o evento definindo todo o escopo logístico (datas de montagem, realização e desmontagem) e geográfico (localização). Além disso, a tabela possui forte viés de gestão financeira, incluindo controle de `margem_lucro`, público esperado, `ticket_medio` e `ticket_equilibrio` (break-even point).
* **`item_custo`**: Funciona como o "carrinho de compras" ou o "mural de vagas" do evento. Em vez de contratar um fornecedor diretamente, o organizador cadastra necessidades (ex: 300 pessoas para Alimentação, 15 profissionais de Segurança). O status de cada item dita se a demanda já foi atendida ('aprovado') ou se ainda precisa de fornecedores ('pendente').

### 3. A Relação entre Organizadores e Fornecedores
A relação entre organizadores e fornecedores acontece na tabela **`proposta`**:
* Esta é a tabela associativa que liga o Fornecedor ao Item de Custo do Evento.
* **Como funciona na prática:** Os fornecedores entram na plataforma, visualizam os itens de custo (`item_custo`) que estão pendentes nos eventos, e enviam suas cotações/orçamentos (`valor`, `descricao`, `validade`).
* **Concorrência:** O sistema permite múltiplas propostas pendentes para um mesmo item (ex: duas empresas de limpeza cobrando valores diferentes para o mesmo evento). O organizador então avalia e muda o status da proposta vencedora para 'aprovada', alterando as demais para 'recusada'.

### 4. Integridade e Automação
O script demonstra preocupação com a consistência dos dados do projeto:
* **Check Constraints (Validações lógicas):** O banco impede erros humanos, como cadastrar uma data de término anterior à de início (`data_inicio <= data_final`), um público mínimo maior que o máximo, ou valores financeiros negativos.
* **Triggers (Gatilhos):** A automação da coluna `atualizado_em` em todas as tabelas garante que o sistema sempre saiba exatamente quando um evento foi alterado ou quando uma proposta foi modificada, o que é crucial para auditoria e histórico em sistemas de cotação.

**Resumo:** O banco de dados materializa o TrocaTicket como uma ponte digital. Ele permite que Organizadores estruturem financeiramente e logisticamente seus eventos, publiquem suas demandas, e que Fornecedores disputem essas demandas enviando propostas comerciais, tudo de forma rastreável e centralizada.
