import { ErroApi } from "./ErroApi.js";

export class ErroProibido extends ErroApi {
  constructor(mensagem) {
    super(mensagem, 403);
    this.name = "ErroProibido";
  }
}