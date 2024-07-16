import { Prisma } from "@prisma/client";
import { ConflictError } from "./conflict-errror";

export class UniqueConstraintError extends ConflictError {
  public uniqueField: string;
  constructor(e: Prisma.PrismaClientKnownRequestError) {
    const uniqueField = e.meta.target;

    super(`Um salvamento com o campo '${uniqueField}' já foi feito.`); // ConflictError
    this.uniqueField = uniqueField as string;
  }
}
