- URL local padrão: `http://localhost:5000` (porta configurável por `PORT`).
- Rotas protegidas exigem `Authorization: Bearer <token>`.
- Perfis: `admin`, `organizador` e `fornecedor`.
- Respostas e corpos usam JSON.
- Erros comuns: `400` dados inválidos, `401` autenticação inválida, `403` perfil sem permissão, `404` recurso não encontrado/sem acesso, `409` conflito de cadastro e `500` erro interno.

## Rotas

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `GET` | `/` | Público | Verifica se a API está disponível. |
| `POST` | `/auth/cadastro` | Público | Cadastra organizador ou fornecedor com status pendente de análise. Recebe dados pessoais e da empresa; valida e-mail, CPF, CNPJ, telefone, CEP e UF. |
| `POST` | `/auth/login` | Público | Autentica com e-mail e senha. Contas pendentes recebem indicação de cadastro pendente; contas ativas recebem JWT com validade de 20 minutos. |
| `GET` | `/auth/me` | Todos os perfis | Valida o JWT e retorna a identidade autenticada. |
| `POST` | `/eventos` | Organizador | Cria evento e itens de custo em uma transação. O organizador vem do token; status, IDs e timestamps são definidos pelo banco. |
| `GET` | `/eventos` | Todos os perfis | Admin lista todos; organizador lista eventos próprios; fornecedor lista eventos em planejamento. Os campos retornados variam conforme o perfil. |
| `GET` | `/eventos/:id` | Todos os perfis | Consulta evento e itens de custo. Organizador acessa eventos próprios; fornecedor, eventos em planejamento. Admin e organizador também recebem propostas e estimativas financeiras. |
| `PATCH` | `/eventos/:id/cancelar` | Admin e organizador | Altera o status do evento para cancelado. Organizador só pode cancelar eventos próprios. |
| `GET` | `/propostas` | Todos os perfis | Lista propostas visíveis ao perfil. Organizador vê propostas de seus eventos, fornecedor vê as próprias e admin vê todas. |
| `GET` | `/propostas/:codItem/:idFornecedor` | Todos os perfis | Consulta proposta, item de custo e evento associado, respeitando o acesso do perfil. |

### Observações

- A rota `GET /propostas` aceita o parâmetro opcional `itemCusto`, usado para filtrar propostas de um item por organizadores e administradores.
- Eventos são criados com status `planejamento`; os itens de custo iniciam como `pendente`.
- A estimativa de ticket é calculada na consulta dos detalhes do evento para admin e organizador.
- A API ainda não implementa rotas para criar, atualizar ou excluir propostas.
- Identificadores enviados nas rotas devem ser inteiros positivos. Erros de validação retornam uma mensagem e, quando aplicável, o campo inválido.

## Execução local

Configure `PORT`, `DATABASE_URL` e `JWT_SECRET` no ambiente do backend. Mantenha credenciais e segredos fora do repositório. Na pasta `src/Entrega 2/Backend`, instale as dependências e inicie a API:

```bash
npm install
npm run dev
```

Para iniciar sem Nodemon, use `npm start`.
