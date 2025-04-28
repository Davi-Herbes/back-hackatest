import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "../auth/dto/register_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { UsersRepository } from "./repositories/users.repository";
import { CreateUserData } from "./interfaces/create_user.data";
import { compare, hash } from "bcryptjs";
import { UsersResponse } from "./interfaces/users.response";
import { MailService } from "src/providers/emails/mail.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
	constructor(
		private repo: UsersRepository,
		private jwtService: JwtService,
	) {}
	async create({ username, email, passwordHash }: CreateUserData): Promise<UsersResponse> {
		return this.repo.create({ username, role: "student", email, passwordHash });
	}
	findAll(): Promise<UsersResponse[]> {
		return this.repo.findAll();
	}

	findOne(id: string): Promise<UsersResponse> {
		return this.repo.findOne(id);
	}

	findOneByEmail(email: string): Promise<UsersResponse> {
		return this.repo.findOneByEmail(email, true);
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<UsersResponse> {
		// Checa se o corpo está vazio
		if (Object.keys(updateUserDto).length === 0) {
			throw new BadRequestException("Ao menos um campo deve ser passado.");
		}

		const { username, role, email, password } = updateUserDto;

		let passwordHash: string;
		if (password) {
			passwordHash = await hash(password, 8);
		}

		return this.repo.update(id, { username, role, email, passwordHash });
	}

	remove(id: string): Promise<UsersResponse> {
		return this.repo.remove(id);
	}
	removeAll() {
		return this.repo.removeAll();
	}
}
