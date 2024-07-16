import { ImageProviderData } from "src/providers/images/interfaces/create_image.data";

export interface CreateImageData extends ImageProviderData {
	ownerId: string;
}
