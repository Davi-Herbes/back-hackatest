import { Controller, Get, Req } from "@nestjs/common";

@Controller()
export class AppController {
	@Get()
	async getHello(): Promise<string> {
		return "Hello, world!";
	}
}
