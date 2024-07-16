import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CreateUserData } from "../interfaces/create_user.data";
import { UpdateUserData } from "../interfaces/update_user.data";
import { UsersResponse } from "../interfaces/users.response";

@Injectable()
export class UsersRepository {
	constructor(private readonly prisma: PrismaService) {}

	create(createUserData: CreateUserData): Promise<UsersResponse> {
		return this.prisma.user.create({ data: createUserData });
	}

	findAll(): Promise<UsersResponse[]> {
		return this.prisma.user.findMany();
	}

	findOne(id: string): Promise<UsersResponse> {
		return this.prisma.user.findUniqueOrThrow({ where: { id } });
	}

	findOneByEmail(email: string): Promise<UsersResponse> {
		return this.prisma.user.findUniqueOrThrow({ where: { email } });
	}

	update(id: string, updateUserData: UpdateUserData): Promise<UsersResponse> {
		return this.prisma.user.update({ where: { id }, data: updateUserData });
	}

	remove(id: string): Promise<UsersResponse> {
		return this.prisma.user.delete({ where: { id } });
	}
}
