import { UsersImagesRepository } from "./repositories/users-images.repository";
import { MultipartFile } from "@fastify/multipart";
import { ImagesProvider } from "src/providers/images/images.provider";
import { UsersImagesResponse } from "./interfaces/users_images.response";
export declare class UsersImagesService {
    private repo;
    private imagesProvider;
    constructor(repo: UsersImagesRepository, imagesProvider: ImagesProvider);
    create(file: MultipartFile, ownerId: string): Promise<UsersImagesResponse>;
    uploadAndCreate(file: MultipartFile, ownerId: string): Promise<UsersImagesResponse>;
    findAll(): Promise<UsersImagesResponse[]>;
    findOne(id: string): Promise<UsersImagesResponse>;
    remove(id: string): Promise<UsersImagesResponse>;
}
