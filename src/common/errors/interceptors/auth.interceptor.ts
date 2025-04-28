import {
	CallHandler,
	ConflictException,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { FastifyReply } from "fastify";
import { AuthError } from "../types/auth-errors/auth-error";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<unknown>,
	): Observable<unknown> | Promise<Observable<unknown>> {
		return next.handle().pipe(
			catchError((error) => {
				if (error instanceof AuthError) {
					const res = context.switchToHttp().getResponse<FastifyReply>();
					res.clearCookie(process.env.PAYLOAD);

					switch (error.code) {
						case "NOT_FOUND":
							throw new NotFoundException(error.message);
						case "CONFLICT":
							throw new ConflictException(error.message);
						case "UNAUTHORIZED":
							throw new UnauthorizedException(error.message);
					}
					throw error;
				} else {
					throw error;
				}
			}),
		);
	}
}
