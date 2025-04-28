import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update_user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./interfaces/users.response").UsersResponse[]>;
    findOne(id: string): Promise<import("./interfaces/users.response").UsersResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./interfaces/users.response").UsersResponse>;
    remove(id: string): Promise<import("./interfaces/users.response").UsersResponse>;
    removeAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
