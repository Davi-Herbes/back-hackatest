import { UpdateUserDto } from "./dto/update_user.dto";
import { UsersRepository } from "./repositories/users.repository";
import { CreateUserData } from "./interfaces/create_user.data";
import { UsersResponse } from "./interfaces/users.response";
import { JwtService } from "@nestjs/jwt";
export declare class UsersService {
    private repo;
    private jwtService;
    constructor(repo: UsersRepository, jwtService: JwtService);
    create({ username, email, passwordHash }: CreateUserData): Promise<UsersResponse>;
    findAll(): Promise<UsersResponse[]>;
    findOne(id: string): Promise<UsersResponse>;
    findOneByEmail(email: string): Promise<UsersResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UsersResponse>;
    remove(id: string): Promise<UsersResponse>;
    removeAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
