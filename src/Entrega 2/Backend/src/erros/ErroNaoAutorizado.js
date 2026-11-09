import { ErroApi } from "./ErroApi.js";

export class ErroNaoAutorizado extends ErroApi {
  constructor(mensagem) {
    super(mensagem, 401);
    this.name = "ErroNaoAutorizado";
  }
}