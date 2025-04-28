"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthNotFoundError = void 0;
const auth_error_1 = require("./auth-error");
class AuthNotFoundError extends auth_error_1.AuthError {
    constructor(message) {
        super(message ? message : "Não receubeu token.", "NOT_FOUND");
    }
}
exports.AuthNotFoundError = AuthNotFoundError;
//# sourceMappingURL=auth-not-found.js.map