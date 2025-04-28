import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./constants";
import { MailService } from "src/providers/emails/mail.service";

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: 60 * 60 },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, MailService],
	exports: [AuthService],
})
export class AuthModule {}
