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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./repositories/users.repository");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
    }
    async create({ username, email, passwordHash }) {
        return this.repo.create({ username, role: "student", email, passwordHash });
    }
    findAll() {
        return this.repo.findAll();
    }
    findOne(id) {
        return this.repo.findOne(id);
    }
    findOneByEmail(email) {
        return this.repo.findOneByEmail(email, true);
    }
    async update(id, updateUserDto) {
        if (Object.keys(updateUserDto).length === 0) {
            throw new common_1.BadRequestException("Ao menos um campo deve ser passado.");
        }
        const { username, role, email, password } = updateUserDto;
        let passwordHash;
        if (password) {
            passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        }
        return this.repo.update(id, { username, role, email, passwordHash });
    }
    remove(id) {
        return this.repo.remove(id);
    }
    removeAll() {
        return this.repo.removeAll();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map