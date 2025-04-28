import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/providers/prisma/prisma.service";
import { CreateImageData } from "../interfaces/create_image.data";
import { UsersImagesResponse } from "../interfaces/users_images.response";

@Injectable()
export class UsersImagesRepository {
	constructor(private prisma: PrismaService) {}

	create(createImageData: CreateImageData): Promise<UsersImagesResponse> {
		return this.prisma.usersImages.create({ data: createImageData, include: { owner: true } });
	}

	findAll(): Promise<UsersImagesResponse[]> {
		return this.prisma.usersImages.findMany({ include: { owner: true } });
	}

	findOne(id: string): Promise<UsersImagesResponse> {
		return this.prisma.usersImages.findUniqueOrThrow({ where: { id }, include: { owner: true } });
	}

	remove(id: string): Promise<UsersImagesResponse> {
		return this.prisma.usersImages.delete({ where: { id }, include: { owner: true } });
	}
}
