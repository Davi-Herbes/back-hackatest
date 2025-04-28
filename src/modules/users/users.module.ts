import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./repositories/users.repository";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { MailService } from "src/providers/emails/mail.service";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: 60 * 60 },
		}),
	],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, PrismaService],
	exports: [UsersService],
})
export class UsersModule {}
