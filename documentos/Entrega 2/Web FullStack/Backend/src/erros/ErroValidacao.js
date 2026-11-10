import { ErroApi } from "./ErroApi.js";

export class ErroValidacao extends ErroApi {
  constructor(mensagem, campo) {
    super(mensagem, 400);
    this.name = "ErroValidacao";
    this.campo = campo;
  }
}
