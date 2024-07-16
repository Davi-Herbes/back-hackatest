import { DatabaseError } from "../types/database-errors/database-error";
import { FKeyError } from "../types/database-errors/f-key-error";
import { NotFoundDbError } from "../types/database-errors/not-found-db-error";
import { UniqueConstraintError } from "../types/database-errors/unique-constraint-error";
import { Prisma } from "@prisma/client";

enum PrismaErrors {
  UniqueConstraintFail = "P2002",
  FKeyFail = "P2003",
  NotFoundFail = "P2025",
}

// Vai receber o erro, e a partir do código dele ele retorna um erro diferente
export const handleDatabaseErrors = (e: Prisma.PrismaClientKnownRequestError) => {
  console.log(e);
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e); // Precisa passar no construtor um PrismaClientError.
    case PrismaErrors.FKeyFail:
      return new FKeyError(e);
    case PrismaErrors.NotFoundFail:
      return new NotFoundDbError(e);
    default:
      return new DatabaseError(e.message);
  }
};
