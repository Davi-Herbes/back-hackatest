import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { UsersImagesModule } from "./modules/users-images/users-images.module";

@Module({
	imports: [ConfigModule.forRoot(), UsersModule, AuthModule, UsersImagesModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
