import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./repositories/users.repository";
import { PrismaService } from "src/providers/prisma/prisma.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, PrismaService],
	exports: [UsersService],
})
export class UsersModule {}
