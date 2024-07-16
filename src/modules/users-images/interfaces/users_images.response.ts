import { UserEntity } from "src/modules/users/entities/user.entity";
import { UsersImageEntity } from "../entities/users_image.entity";

export interface UsersImagesResponse extends UsersImageEntity {
	owner?: UserEntity;
}
