import { UsersImageEntity } from "src/modules/users-images/entities/users_image.entity";
import { UserEntity } from "../entities/user.entity";
export interface UsersResponse extends UserEntity {
    images?: UsersImageEntity;
}
