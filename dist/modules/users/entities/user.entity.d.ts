import { User } from "@prisma/client";
export declare class UserEntity implements User {
    role: string;
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}
