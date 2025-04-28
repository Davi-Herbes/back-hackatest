import { UsersImagesService } from "./users-images.service";
import { AuthRequest } from "../auth/types/auth_request";
export declare class UsersImagesController {
    private readonly usersImagesService;
    constructor(usersImagesService: UsersImagesService);
    create(req: AuthRequest): Promise<import("./interfaces/users_images.response").UsersImagesResponse>;
    findAll(): Promise<import("./interfaces/users_images.response").UsersImagesResponse[]>;
    findOne(id: string): Promise<import("./interfaces/users_images.response").UsersImagesResponse>;
    remove(id: string): Promise<import("./interfaces/users_images.response").UsersImagesResponse>;
}
