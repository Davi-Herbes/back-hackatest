import { MultipartFile } from "@fastify/multipart";
import { ImageProviderData } from "./interfaces/create_image.data";
export declare class ImagesProvider {
    upload(file: MultipartFile): Promise<ImageProviderData>;
    delete(publicId: string): void;
}
