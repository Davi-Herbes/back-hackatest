"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesProvider = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
let ImagesProvider = class ImagesProvider {
    upload(file) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    const { format, originalFilename, publicId, url } = result;
                    resolve({ format, originalFilename, publicId, url });
                }
            });
            file.file.pipe(stream);
        });
    }
    delete(publicId) {
        cloudinary_1.v2.uploader.destroy(publicId);
    }
};
exports.ImagesProvider = ImagesProvider;
exports.ImagesProvider = ImagesProvider = __decorate([
    (0, common_1.Injectable)()
], ImagesProvider);
//# sourceMappingURL=images.provider.js.map