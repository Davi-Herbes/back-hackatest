import { AuthError } from "./auth-error";
export declare class AuthUnauthorizedError extends AuthError {
    constructor(message?: string);
}
