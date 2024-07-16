export class NotFoundError extends Error {
  message: string = this.message ? this.message : "Campo não encontrado.";
}
