import { AuthError } from "./auth-error";

export class AuthNotFoundError extends AuthError {
	constructor(message?: string) {
		super(message ? message : "Não receubeu token.", "NOT_FOUND");
	}
}
