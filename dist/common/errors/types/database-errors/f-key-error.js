"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FKeyError = void 0;
const conflict_errror_1 = require("./conflict-errror");
class FKeyError extends conflict_errror_1.ConflictError {
    constructor(e) {
        const field = e.meta.field_name;
        super(`Chave estrangeira em: '${field}', não existe.`);
        this.field = field;
    }
}
exports.FKeyError = FKeyError;
//# sourceMappingURL=f-key-error.js.map