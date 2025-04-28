"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthConflictError = void 0;
const auth_error_1 = require("./auth-error");
class AuthConflictError extends auth_error_1.AuthError {
    constructor(message) {
        super(message ? message : "Conflito com os dados recebidos.", "CONFLICT");
    }
}
exports.AuthConflictError = AuthConflictError;
//# sourceMappingURL=auth-conflict.js.map