import { MultipartFile } from "@fastify/multipart";
import { BadRequestException, Injectable } from "@nestjs/common";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { ImageProviderData } from "./interfaces/create_image.data";

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

@Injectable()
export class ImagesProvider {
	upload(file: MultipartFile): Promise<ImageProviderData> {
		return new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{ resource_type: "auto" },
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						const { format, originalFilename, publicId, url } = result;
						resolve({ format, originalFilename, publicId, url });
					}
				},
			);

			file.file.pipe(stream);
		});
	}

	delete(publicId: string) {
		cloudinary.uploader.destroy(publicId);
	}
}
