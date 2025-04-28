import { AuthError } from "./auth-error";

export class AuthConflictError extends AuthError {
	constructor(message?: string) {
		super(message ? message : "Conflito com os dados recebidos.", "CONFLICT");
	}
}
