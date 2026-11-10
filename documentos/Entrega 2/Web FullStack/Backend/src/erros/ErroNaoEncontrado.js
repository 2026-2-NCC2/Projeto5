import { ErroApi } from "./ErroApi.js";

export class ErroNaoEncontrado extends ErroApi {
  constructor(mensagem) {
    super(mensagem, 404);
    this.name = "ErroNaoEncontrado";
  }
}