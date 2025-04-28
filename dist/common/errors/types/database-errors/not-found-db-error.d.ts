import { Prisma } from "@prisma/client";
import { ConflictError } from "./conflict-errror";
export declare class NotFoundDbError extends ConflictError {
    constructor(e: Prisma.PrismaClientKnownRequestError);
}
