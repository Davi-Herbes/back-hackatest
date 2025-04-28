"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.message = this.message ? this.message : "Campo não encontrado.";
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found-error.js.map