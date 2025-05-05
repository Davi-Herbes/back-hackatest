import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { UsersImagesService } from "./users-images.service";
import { AuthGuard } from "../auth/auth.guard";
import { AuthRequest } from "../auth/types/auth_request";

@Controller("users-images")
export class UsersImagesController {
	constructor(private readonly usersImagesService: UsersImagesService) {}

	@UseGuards(AuthGuard)
	@Post()
	async create(@Req() req: AuthRequest) {
		const file = await req.file();
		const { sub } = req.user;

		console.log(req.user);

		return this.usersImagesService.create(file, sub);
	}

	@Get()
	findAll() {
		return this.usersImagesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersImagesService.findOne(id);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersImagesService.remove(id);
	}
}
