import { ErroApi } from "./ErroApi.js";

export class ErroConflito extends ErroApi {
  constructor(mensagem) {
    super(mensagem, 409);
    this.name = "ErroConflito";
  }
}