import { PrismaService } from "src/providers/prisma/prisma.service";
import { CreateUserData } from "../interfaces/create_user.data";
import { UpdateUserData } from "../interfaces/update_user.data";
import { UsersResponse } from "../interfaces/users.response";
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserData: CreateUserData): Promise<UsersResponse>;
    findAll(): Promise<UsersResponse[]>;
    findOne(id: string): Promise<UsersResponse>;
    findOneByEmail(email: string, withoutError?: boolean): Promise<UsersResponse>;
    update(id: string, updateUserData: UpdateUserData): Promise<UsersResponse>;
    remove(id: string): Promise<UsersResponse>;
    removeAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
