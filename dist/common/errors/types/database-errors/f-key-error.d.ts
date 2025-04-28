import { Prisma } from "@prisma/client";
import { ConflictError } from "./conflict-errror";
export declare class FKeyError extends ConflictError {
    field: string;
    constructor(e: Prisma.PrismaClientKnownRequestError);
}
