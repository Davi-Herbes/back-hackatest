import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/sign_in.dto";
import { AuthRequest } from "./types/auth_request";
import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dto/register_user.dto";
export declare class AuthController {
    private readonly authService;
    private usersService;
    private jwtService;
    constructor(authService: AuthService, usersService: UsersService, jwtService: JwtService);
    signIn({ email, password }: CreateAuthDto, res: FastifyReply): Promise<{
        message: string;
        userData: {
            email: string;
            role: string;
            username: string;
            image: import("../users-images/entities/users_image.entity").UsersImageEntity;
        };
    }>;
    getProfile(req: AuthRequest): Promise<{
        message: string;
        userData: {
            email: string;
            role: string;
            username: string;
            image: import("../users-images/entities/users_image.entity").UsersImageEntity;
        };
    }>;
    register(registerUserDto: RegisterUserDto, res: FastifyReply): Promise<{
        message: string;
    }>;
    confirm(req: FastifyRequest, body: {
        code: number;
    }, res: FastifyReply): Promise<{
        message: string;
        userData: {
            email: string;
            username: string;
            role: string;
            image: import("../users-images/entities/users_image.entity").UsersImageEntity;
        };
    }>;
    logOut(id: string, res: FastifyReply): {
        message: string;
    };
}
