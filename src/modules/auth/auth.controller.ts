import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Req,
	Res,
	Headers,
	HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/sign_in.dto";
import { AuthGuard } from "./auth.guard";
import { AuthRequest } from "./types/auth_request";
import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "../users/users.service";
import { AuthNotFoundError } from "src/common/errors/types/auth-errors/auth-not-found";
import { AuthUnauthorizedError } from "src/common/errors/types/auth-errors/auth-unauthorized";
import { CreateUserData } from "../users/interfaces/create_user.data";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dto/register_user.dto";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	@HttpCode(200)
	@Post("login")
	async signIn(
		@Body() { email, password }: CreateAuthDto,
		@Res({ passthrough: true }) res: FastifyReply,
	) {
		const access_token = await this.authService.signIn(email, password);

		res.setCookie("access_token", access_token);

		const { role, username, usersImages } = await this.usersService.findOneByEmail(email);

		return { message: "Usuário logado.", userData: { email, role, username, image: usersImages } };
	}

	@UseGuards(AuthGuard)
	@Get("profile")
	async getProfile(@Req() req: AuthRequest) {
		const { sub } = req.user;
		const { email, role, username, usersImages } = await this.usersService.findOne(sub);

		return { message: "Success", userData: { email, role, username, image: usersImages } };
	}

	@Post("register")
	@HttpCode(200)
	async register(
		@Body() registerUserDto: RegisterUserDto,
		@Res({ passthrough: true }) res: FastifyReply,
	) {
		const token = await this.authService.requestRegister(registerUserDto);

		res.setCookie(process.env.PAYLOAD, token, {
			path: "/",
			httpOnly: true,
			secure: false, // Apenas HTTPS em produção
			sameSite: "lax", // Permite o envio de cookies entre domínios
			maxAge: 60 * 60 * 24, // Em segundos
		});

		return { message: "Solicitado." };
	}

	@Post("confirm")
	async confirm(
		@Req() req: FastifyRequest,
		@Body() body: { code: number },
		@Res({ passthrough: true }) res: FastifyReply,
	) {
		const payloadToken = req.cookies[process.env.PAYLOAD];
		const { code } = body;

		if (!payloadToken) {
			console.log("!payloadToken");
			throw new AuthNotFoundError("Não tem cookie salvo");
		}

		const payload = this.jwtService.verify<CreateUserData & { code: number }>(payloadToken);

		const { code: savedCode, ...createUserData } = payload;

		if (!payload) {
			console.log("!payload");
			// res.clearCookie(process.env.PAYLOAD);

			throw new AuthUnauthorizedError("Seção expirada.");
		}

		if (savedCode !== code) {
			throw new AuthUnauthorizedError("Código inválido.");
		}

		const { access_token, userData } = await this.authService.confirm(createUserData);

		res.clearCookie(process.env.PAYLOAD);
		res.setCookie("access_token", access_token);

		return { message: "Usuário registrado.", userData };
	}

	@Delete("logout")
	logOut(@Param("id") id: string, @Res({ passthrough: true }) res: FastifyReply) {
		res.clearCookie("access_token");
		return { message: "Usuário deslogado." };
	}
}
