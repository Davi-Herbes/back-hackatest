import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/providers/prisma/prisma.service";

@Injectable()
export class UserCodesRepository {
	constructor(public prisma: PrismaService) {}

	create(createUserCodeData) {
		return this.prisma.userConfirmationCode.create({ data: createUserCodeData });
	}

	findAll() {
		return this.prisma.userConfirmationCode.findMany();
	}

	findOne(email: string) {
		return this.prisma.userConfirmationCode.findUniqueOrThrow({ where: { id: email } });
	}

	remove(id: string) {
		return this.prisma.userConfirmationCode.delete({ where: { id } });
	}
}
