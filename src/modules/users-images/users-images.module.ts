import { Module } from "@nestjs/common";
import { UsersImagesService } from "./users-images.service";
import { UsersImagesController } from "./users-images.controller";
import { UsersImagesRepository } from "./repositories/users-images.repository";
import { ImagesProvider } from "src/providers/images/images.provider";
import { PrismaService } from "src/providers/prisma/prisma.service";

@Module({
	controllers: [UsersImagesController],
	providers: [PrismaService, UsersImagesService, UsersImagesRepository, ImagesProvider],
})
export class UsersImagesModule {}
