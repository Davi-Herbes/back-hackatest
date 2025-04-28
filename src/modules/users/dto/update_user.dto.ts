import { PartialType } from "@nestjs/mapped-types";
import { RegisterUserDto } from "../../auth/dto/register_user.dto";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(RegisterUserDto) {
	@IsNotEmpty()
	@IsString()
	@IsIn(["supervisor", "student", "monitor"])
	role: "supervisor" | "student" | "monitor";
}
