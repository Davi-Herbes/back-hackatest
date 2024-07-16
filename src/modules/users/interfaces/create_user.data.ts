export interface CreateUserData {
	username: string;
	role: "supervisor" | "monitor" | "student";
	email: string;
	passwordHash: string;
}
