import { NestFactory } from "@nestjs/core";
import { UnauthorizedException, ValidationPipe } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import fastifyCsrfProtection from "@fastify/csrf-protection";
import helmet from "@fastify/helmet";
import fastifyMultipart from "@fastify/multipart";
import fastifyCookie from "@fastify/cookie";

import { AppModule } from "./app.module";

import { NotFoundInterceptor } from "./common/errors/interceptors/not-found.interceptor";
import { UnauthorizedInterceptor } from "./common/errors/interceptors/unauthorized.interceptor";
import { ImageProviderInterceptor } from "./common/errors/interceptors/image-provider.interceptor";
import { ConflictInterceptor } from "./common/errors/interceptors/conflict.interceptor";
import { DatabaseInterceptor } from "./common/errors/interceptors/database.interceptor";

// const whiteList = process.env.WHITE_LIST.split(",");
// const corsOptions: CorsOptions = {
// 	credentials: true,
// 	origin: (origin, callback) => {
// 		if (whiteList.indexOf(origin) !== -1 || !origin) {
// 			callback(null, false);
// 		} else {
// 			callback(new UnauthorizedException("Not allowed by CORS."), true);
// 		}
// 	},
// };

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	// Segurança
	await app.register(fastifyCsrfProtection);
	await app.register(helmet);

	// Multipart
	await app.register(fastifyMultipart);

	// cookies
	const expiresDate = new Date(Date.now());
	expiresDate.setDate(expiresDate.getDate() + 1);

	app.register(fastifyCookie, {
		secret: process.env.COOKIE_SECRET,
		parseOptions: {
			httpOnly: true,
			expires: expiresDate,
			maxAge: 60 * 60 * 24,
			path: "/",
		},
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Configurações para as validações de dados funcionarem
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useGlobalInterceptors(
		new NotFoundInterceptor(),
		new UnauthorizedInterceptor(),
		new ImageProviderInterceptor(),
		new ConflictInterceptor(),
		new DatabaseInterceptor(),
	);

	await app.listen(3000);
}
bootstrap();
