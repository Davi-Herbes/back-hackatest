"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const sign_in_dto_1 = require("./dto/sign_in.dto");
const auth_guard_1 = require("./auth.guard");
const users_service_1 = require("../users/users.service");
const auth_not_found_1 = require("../../common/errors/types/auth-errors/auth-not-found");
const auth_unauthorized_1 = require("../../common/errors/types/auth-errors/auth-unauthorized");
const jwt_1 = require("@nestjs/jwt");
const register_user_dto_1 = require("./dto/register_user.dto");
let AuthController = class AuthController {
    constructor(authService, usersService, jwtService) {
        this.authService = authService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn({ email, password }, res) {
        const access_token = await this.authService.signIn(email, password);
        res.setCookie("access_token", access_token);
        const { role, username, usersImages } = await this.usersService.findOneByEmail(email);
        return { message: "Usuário logado.", userData: { email, role, username, image: usersImages } };
    }
    async getProfile(req) {
        const { sub } = req.user;
        const { email, role, username, usersImages } = await this.usersService.findOne(sub);
        return { message: "Success", userData: { email, role, username, image: usersImages } };
    }
    async register(registerUserDto, res) {
        const token = await this.authService.requestRegister(registerUserDto);
        res.setCookie(process.env.PAYLOAD, token, {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
        });
        return { message: "Solicitado." };
    }
    async confirm(req, body, res) {
        const payloadToken = req.cookies[process.env.PAYLOAD];
        const { code } = body;
        if (!payloadToken) {
            console.log("!payloadToken");
            throw new auth_not_found_1.AuthNotFoundError("Não tem cookie salvo");
        }
        const payload = this.jwtService.verify(payloadToken);
        const { code: savedCode, ...createUserData } = payload;
        if (!payload) {
            console.log("!payload");
            throw new auth_unauthorized_1.AuthUnauthorizedError("Seção expirada.");
        }
        if (savedCode !== code) {
            throw new auth_unauthorized_1.AuthUnauthorizedError("Código inválido.");
        }
        const { access_token, userData } = await this.authService.confirm(createUserData);
        res.clearCookie(process.env.PAYLOAD);
        res.setCookie("access_token", access_token);
        return { message: "Usuário registrado.", userData };
    }
    logOut(id, res) {
        res.clearCookie("access_token");
        return { message: "Usuário deslogado." };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.CreateAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("confirm"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirm", null);
__decorate([
    (0, common_1.Delete)("logout"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map