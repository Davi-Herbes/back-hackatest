"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUnauthorizedError = void 0;
const auth_error_1 = require("./auth-error");
class AuthUnauthorizedError extends auth_error_1.AuthError {
    constructor(message) {
        super(message ? message : "Não autorizado.", "UNAUTHORIZED");
    }
}
exports.AuthUnauthorizedError = AuthUnauthorizedError;
//# sourceMappingURL=auth-unauthorized.js.map