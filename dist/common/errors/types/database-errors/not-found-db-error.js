"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundDbError = void 0;
const conflict_errror_1 = require("./conflict-errror");
class NotFoundDbError extends conflict_errror_1.ConflictError {
    constructor(e) {
        const message = !e.meta ? e.message : e.meta.cause;
        super(`${message}`);
    }
}
exports.NotFoundDbError = NotFoundDbError;
//# sourceMappingURL=not-found-db-error.js.map