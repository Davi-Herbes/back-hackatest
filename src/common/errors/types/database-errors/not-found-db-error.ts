import { Prisma } from "@prisma/client";
import { ConflictError } from "./conflict-errror";

export class NotFoundDbError extends ConflictError {
  constructor(e: Prisma.PrismaClientKnownRequestError) {
    // No caso de vir o P2025 ele pode retornar a mensagem de erro no e.meta.cause ou no e.message
    const message = !e.meta ? e.message : e.meta.cause;

    super(`${message}`); // ConflictError
  }
}
