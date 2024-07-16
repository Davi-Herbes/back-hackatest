import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create_user.dto";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsNotEmpty()
	@IsString()
	@IsIn(["supervisor", "student", "monitor"])
	role: "supervisor" | "student" | "monitor";
}
