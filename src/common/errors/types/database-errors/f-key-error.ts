import { Prisma } from "@prisma/client";
import { ConflictError } from "./conflict-errror";

export class FKeyError extends ConflictError {
  public field: string;
  constructor(e: Prisma.PrismaClientKnownRequestError) {
    const field = e.meta.field_name;

    super(`Chave estrangeira em: '${field}', não existe.`); // ConflictError
    this.field = field as string;
  }
}
