import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { UsersRepository } from "./repositories/users.repository";
import { CreateUserData } from "./interfaces/create_user.data";
import { compare, hash } from "bcryptjs";
import { UsersResponse } from "./interfaces/users.response";

@Injectable()
export class UsersService {
	constructor(private repo: UsersRepository) {}
	async create({ username, email, password }: CreateUserDto): Promise<UsersResponse> {
		const passwordHash = await hash(password, 8);

		return this.repo.create({ username, role: "student", email, passwordHash });
	}

	findAll(): Promise<UsersResponse[]> {
		return this.repo.findAll();
	}

	findOne(id: string): Promise<UsersResponse> {
		return this.repo.findOne(id);
	}

	findOneByEmail(email: string): Promise<UsersResponse> {
		return this.repo.findOneByEmail(email);
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
}
