import { PrismaService } from "src/providers/prisma/prisma.service";
export declare class UserCodesRepository {
    prisma: PrismaService;
    constructor(prisma: PrismaService);
    create(createUserCodeData: any): import(".prisma/client").Prisma.Prisma__UserConfirmationCodeClient<{
        id: string;
        code: string;
        email: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        code: string;
        email: string;
        createdAt: Date;
    }[]>;
    findOne(email: string): import(".prisma/client").Prisma.Prisma__UserConfirmationCodeClient<{
        id: string;
        code: string;
        email: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserConfirmationCodeClient<{
        id: string;
        code: string;
        email: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
