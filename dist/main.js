"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const csrf_protection_1 = require("@fastify/csrf-protection");
const helmet_1 = require("@fastify/helmet");
const multipart_1 = require("@fastify/multipart");
const cookie_1 = require("@fastify/cookie");
const app_module_1 = require("./app.module");
const not_found_interceptor_1 = require("./common/errors/interceptors/not-found.interceptor");
const unauthorized_interceptor_1 = require("./common/errors/interceptors/unauthorized.interceptor");
const image_provider_interceptor_1 = require("./common/errors/interceptors/image-provider.interceptor");
const conflict_interceptor_1 = require("./common/errors/interceptors/conflict.interceptor");
const database_interceptor_1 = require("./common/errors/interceptors/database.interceptor");
const auth_interceptor_1 = require("./common/errors/interceptors/auth.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    await app.register(csrf_protection_1.default);
    await app.register(helmet_1.default);
    await app.register(multipart_1.default);
    const expiresDate = new Date(Date.now());
    expiresDate.setDate(expiresDate.getDate() + 1);
    app.register(cookie_1.default, {
        secret: process.env.COOKIE_SECRET,
        parseOptions: {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            expires: expiresDate,
            maxAge: 60 * 60 * 24,
            path: "/",
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new auth_interceptor_1.AuthInterceptor(), new not_found_interceptor_1.NotFoundInterceptor(), new unauthorized_interceptor_1.UnauthorizedInterceptor(), new image_provider_interceptor_1.ImageProviderInterceptor(), new conflict_interceptor_1.ConflictInterceptor(), new database_interceptor_1.DatabaseInterceptor());
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map