import { PrismaService } from "src/providers/prisma/prisma.service";
import { CreateImageData } from "../interfaces/create_image.data";
import { UsersImagesResponse } from "../interfaces/users_images.response";
export declare class UsersImagesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(createImageData: CreateImageData): Promise<UsersImagesResponse>;
    findAll(): Promise<UsersImagesResponse[]>;
    findOne(id: string): Promise<UsersImagesResponse>;
    remove(id: string): Promise<UsersImagesResponse>;
}
