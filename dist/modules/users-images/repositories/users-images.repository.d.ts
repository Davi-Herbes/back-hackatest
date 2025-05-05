import { PrismaService } from "src/providers/prisma/prisma.service";
import { CreateImageData } from "../interfaces/create_image.data";
import { UsersImagesResponse } from "../interfaces/users_images.response";
export declare class UsersImagesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(createImageData: CreateImageData): Promise<UsersImagesResponse>;
    findAll(): Promise<UsersImagesResponse[]>;
    findOneByOwnerId(id: string): import(".prisma/client").Prisma.Prisma__UsersImagesClient<{
        id: string;
        publicId: string;
        originalFilename: string;
        format: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOne(id: string): Promise<UsersImagesResponse>;
    remove(id: string): Promise<UsersImagesResponse>;
}
