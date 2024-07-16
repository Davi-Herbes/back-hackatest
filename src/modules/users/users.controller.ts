import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { MultipartFile } from "@fastify/multipart";
import { FastifyRequest } from "fastify";
import { ImagesProvider } from "src/providers/images/images.provider";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(id);
	}

	@Post("/images")
	async image(@Req() req: FastifyRequest) {
		const file = await req.file();
		const images = new ImagesProvider();
		if (file) {
			return images.upload(file);
		}
	}
}
