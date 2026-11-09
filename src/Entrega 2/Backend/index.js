import { criarApp } from "./src/app.js";

const app = criarApp();
const PORTA = process.env.PORT || 5000;

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});