import { Prisma } from "@prisma/client";
import { ConflictError } from "./conflict-errror";
export declare class UniqueConstraintError extends ConflictError {
    uniqueField: string;
    constructor(e: Prisma.PrismaClientKnownRequestError);
}
