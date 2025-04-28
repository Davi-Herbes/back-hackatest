import { UsersImages } from "@prisma/client";
export declare class UsersImageEntity implements UsersImages {
    id: string;
    publicId: string;
    url: string;
    originalFilename: string;
    format: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
}
