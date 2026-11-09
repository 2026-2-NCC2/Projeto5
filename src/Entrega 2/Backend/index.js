import { criarApi } from ".src/bancoDados.js";

const app = criarApi();
const PORTA = process.env.PORT || 5000;

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});