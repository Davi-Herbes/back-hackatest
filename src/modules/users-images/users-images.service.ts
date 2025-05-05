import { Injectable } from "@nestjs/common";
import { UsersImagesRepository } from "./repositories/users-images.repository";
import { MultipartFile } from "@fastify/multipart";
import { ImagesProvider } from "src/providers/images/images.provider";
import { UsersImagesResponse } from "./interfaces/users_images.response";

@Injectable()
export class UsersImagesService {
	constructor(
		private repo: UsersImagesRepository,
		private imagesProvider: ImagesProvider,
	) {}

	async create(file: MultipartFile, ownerId: string): Promise<UsersImagesResponse> {
		const stockedImage = await this.repo.findOneByOwnerId(ownerId);

		if (stockedImage !== null) {
			this.imagesProvider.delete(stockedImage.publicId);
			await this.repo.remove(stockedImage.id);
		}

		return this.uploadAndCreate(file, ownerId);
	}

	async uploadAndCreate(file: MultipartFile, ownerId: string) {
		const data = await this.imagesProvider.upload(file);

		return this.repo.create({ ownerId, ...data });
	}

	findAll(): Promise<UsersImagesResponse[]> {
		return this.repo.findAll();
	}

	findOne(id: string): Promise<UsersImagesResponse> {
		return this.repo.findOne(id);
	}

	async remove(id: string): Promise<UsersImagesResponse> {
		const image = await this.repo.remove(id);
		this.imagesProvider.delete(image.publicId);

		return image;
	}
}
