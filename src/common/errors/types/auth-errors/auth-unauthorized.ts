import { AuthError } from "./auth-error";

export class AuthUnauthorizedError extends AuthError {
	constructor(message?: string) {
		super(message ? message : "Não autorizado.", "UNAUTHORIZED");
	}
}
