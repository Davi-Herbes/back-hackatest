import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compareSync, hash } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { CreateUserData } from "../users/interfaces/create_user.data";
import { NotFoundError } from "src/common/errors/types/not-found-error";
import { RegisterUserDto } from "./dto/register_user.dto";
import { MailService } from "src/providers/emails/mail.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private mailService: MailService,
	) {}
	async signIn(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);

		if (!user) {
			throw new UnauthorizedException("Usuário ou senha inválidos.");
		}

		if (!compareSync(password, user.passwordHash)) {
			throw new UnauthorizedException("Usuário ou senha inválidos.");
		}

		const payload = { sub: user.id, username: user.username };

		const access_token = await this.jwtService.signAsync(payload);

		return access_token;
	}

	async requestRegister({ username, email, password }: RegisterUserDto): Promise<string> {
		const userExists = !!(await this.usersService.findOneByEmail(email));

		if (userExists) {
			throw new BadRequestException({ message: "Esse email já foi cadastrado.", field: "email" });
		}

		const passwordHash = await hash(password, 8);

		const code = Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
		console.log(code);

		const payloadToken = this.jwtService.sign({ username, email, passwordHash, code });

		this.mailService.sendUserConfirmation(username, email, code);

		return payloadToken;
	}

	async confirm(createUserData: CreateUserData) {
		const { id, email, username, role, images } = await this.usersService.create(createUserData);

		const payload = { sub: id, email };

		const access_token = await this.jwtService.signAsync(payload);

		return { access_token, userData: { email, username, role, image: images } };
	}
}
