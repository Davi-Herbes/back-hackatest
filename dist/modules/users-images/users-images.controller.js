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
exports.UsersImagesController = void 0;
const common_1 = require("@nestjs/common");
const users_images_service_1 = require("./users-images.service");
const auth_guard_1 = require("../auth/auth.guard");
let UsersImagesController = class UsersImagesController {
    constructor(usersImagesService) {
        this.usersImagesService = usersImagesService;
    }
    async create(req) {
        const file = await req.file();
        const { sub } = req.user;
        console.log(req.user);
        return this.usersImagesService.create(file, sub);
    }
    findAll() {
        return this.usersImagesService.findAll();
    }
    findOne(id) {
        return this.usersImagesService.findOne(id);
    }
    remove(id) {
        return this.usersImagesService.remove(id);
    }
};
exports.UsersImagesController = UsersImagesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersImagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersImagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersImagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersImagesController.prototype, "remove", null);
exports.UsersImagesController = UsersImagesController = __decorate([
    (0, common_1.Controller)("users-images"),
    __metadata("design:paramtypes", [users_images_service_1.UsersImagesService])
], UsersImagesController);
//# sourceMappingURL=users-images.controller.js.map