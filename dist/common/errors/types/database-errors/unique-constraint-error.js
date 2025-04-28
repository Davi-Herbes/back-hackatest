"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueConstraintError = void 0;
const conflict_errror_1 = require("./conflict-errror");
class UniqueConstraintError extends conflict_errror_1.ConflictError {
    constructor(e) {
        const uniqueField = e.meta.target;
        super(`Um salvamento com o campo '${uniqueField}' já foi feito.`);
        this.uniqueField = uniqueField;
    }
}
exports.UniqueConstraintError = UniqueConstraintError;
//# sourceMappingURL=unique-constraint-error.js.map