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
exports.UsersImagesService = void 0;
const common_1 = require("@nestjs/common");
const users_images_repository_1 = require("./repositories/users-images.repository");
const images_provider_1 = require("../../providers/images/images.provider");
let UsersImagesService = class UsersImagesService {
    constructor(repo, imagesProvider) {
        this.repo = repo;
        this.imagesProvider = imagesProvider;
    }
    async create(file, ownerId) {
        const data = await this.imagesProvider.upload(file);
        return this.repo.create({ ownerId, ...data });
    }
    findAll() {
        return this.repo.findAll();
    }
    findOne(id) {
        return this.repo.findOne(id);
    }
    async remove(id) {
        const image = await this.repo.remove(id);
        this.imagesProvider.delete(image.publicId);
        return image;
    }
};
exports.UsersImagesService = UsersImagesService;
exports.UsersImagesService = UsersImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_images_repository_1.UsersImagesRepository,
        images_provider_1.ImagesProvider])
], UsersImagesService);
//# sourceMappingURL=users-images.service.js.map