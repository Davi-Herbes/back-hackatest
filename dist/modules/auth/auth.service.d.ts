import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserData } from "../users/interfaces/create_user.data";
import { RegisterUserDto } from "./dto/register_user.dto";
import { MailService } from "src/providers/emails/mail.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    signIn(email: string, password: string): Promise<string>;
    requestRegister({ username, email, password }: RegisterUserDto): Promise<string>;
    confirm(createUserData: CreateUserData): Promise<{
        access_token: string;
        userData: {
            email: string;
            username: string;
            role: string;
            image: import("../users-images/entities/users_image.entity").UsersImageEntity;
        };
    }>;
}
