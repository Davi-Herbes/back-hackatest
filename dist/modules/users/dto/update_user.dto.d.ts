import { RegisterUserDto } from "../../auth/dto/register_user.dto";
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<RegisterUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    role: "supervisor" | "student" | "monitor";
}
export {};
