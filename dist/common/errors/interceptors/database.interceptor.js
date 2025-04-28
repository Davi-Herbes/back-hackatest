"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const database_error_1 = require("../types/database-errors/database-error");
const is_prisma_error_1 = require("../utils/is-prisma-error");
const handle_database_errors_1 = require("../utils/handle-database-errors");
let DatabaseInterceptor = class DatabaseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.catchError)((reciviedError) => {
            let error = reciviedError;
            if ((0, is_prisma_error_1.isPrismaError)(reciviedError)) {
                error = (0, handle_database_errors_1.handleDatabaseErrors)(reciviedError);
            }
            if (error instanceof database_error_1.DatabaseError) {
                throw new common_1.BadRequestException();
            }
            else {
                throw error;
            }
        }));
    }
};
exports.DatabaseInterceptor = DatabaseInterceptor;
exports.DatabaseInterceptor = DatabaseInterceptor = __decorate([
    (0, common_1.Injectable)()
], DatabaseInterceptor);
//# sourceMappingURL=database.interceptor.js.map