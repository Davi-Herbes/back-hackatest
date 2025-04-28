export class AuthError extends Error {
	constructor(
		public message: string,
		public code: string,
	) {
		super(message);
	}
}
