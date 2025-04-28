"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const auth_error_1 = require("../types/auth-errors/auth-error");
let AuthInterceptor = class AuthInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.catchError)((error) => {
            if (error instanceof auth_error_1.AuthError) {
                const res = context.switchToHttp().getResponse();
                res.clearCookie(process.env.PAYLOAD);
                switch (error.code) {
                    case "NOT_FOUND":
                        throw new common_1.NotFoundException(error.message);
                    case "CONFLICT":
                        throw new common_1.ConflictException(error.message);
                    case "UNAUTHORIZED":
                        throw new common_1.UnauthorizedException(error.message);
                }
                throw error;
            }
            else {
                throw error;
            }
        }));
    }
};
exports.AuthInterceptor = AuthInterceptor;
exports.AuthInterceptor = AuthInterceptor = __decorate([
    (0, common_1.Injectable)()
], AuthInterceptor);
//# sourceMappingURL=auth.interceptor.js.map