import { DatabaseError } from "../types/database-errors/database-error";
import { FKeyError } from "../types/database-errors/f-key-error";
import { NotFoundDbError } from "../types/database-errors/not-found-db-error";
import { UniqueConstraintError } from "../types/database-errors/unique-constraint-error";
import { Prisma } from "@prisma/client";
export declare const handleDatabaseErrors: (e: Prisma.PrismaClientKnownRequestError) => UniqueConstraintError | NotFoundDbError | DatabaseError | FKeyError;
