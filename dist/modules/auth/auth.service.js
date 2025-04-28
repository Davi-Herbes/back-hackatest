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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../../providers/emails/mail.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async signIn(email, password) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Usuário ou senha inválidos.");
        }
        if (!(0, bcryptjs_1.compareSync)(password, user.passwordHash)) {
            throw new common_1.UnauthorizedException("Usuário ou senha inválidos.");
        }
        const payload = { sub: user.id, username: user.username };
        const access_token = await this.jwtService.signAsync(payload);
        return access_token;
    }
    async requestRegister({ username, email, password }) {
        const userExists = !!(await this.usersService.findOneByEmail(email));
        if (userExists) {
            throw new common_1.BadRequestException({ message: "Esse email já foi cadastrado.", field: "email" });
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const code = Math.floor(100000 + Math.random() * 900000);
        console.log(code);
        const payloadToken = this.jwtService.sign({ username, email, passwordHash, code });
        this.mailService.sendUserConfirmation(username, email, code);
        return payloadToken;
    }
    async confirm(createUserData) {
        const { id, email, username, role, images } = await this.usersService.create(createUserData);
        const payload = { sub: id, email };
        const access_token = await this.jwtService.signAsync(payload);
        return { access_token, userData: { email, username, role, image: images } };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map