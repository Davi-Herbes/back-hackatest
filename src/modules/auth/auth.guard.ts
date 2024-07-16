import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();

		let token = request.cookies.access_token;

		if (!token) {
			token = this.extractTokenFromHeader(request);
			if (!token) {
				throw new UnauthorizedException("Token required.");
			}
		}

		try {
			const payload = this.jwtService.verifyAsync(token, {
				secret: jwtConstants.secret,
			});
			request["user"] = payload;
		} catch (e) {
			throw new UnauthorizedException((e as Error).message);
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];

		return type === "Bearer" ? token : undefined;
	}
}
