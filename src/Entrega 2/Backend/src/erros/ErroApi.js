export class ErroApi extends Error {
  constructor(mensagem, statusCode) {
    super(mensagem);
    this.name = "ErroApi";
    this.statusCode = statusCode;
  }
}