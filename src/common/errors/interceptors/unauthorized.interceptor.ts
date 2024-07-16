import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	UnauthorizedException,
} from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { UnauthorizedError } from "../types/unauthorized-error";

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<unknown>,
	): Observable<unknown> | Promise<Observable<unknown>> {
		return next.handle().pipe(
			// Ele vai pegar o erro que acontecer e se for um UnauthorizedError ele vai ser responsável pelo erro
			catchError((error) => {
				if (error instanceof UnauthorizedError) {
					throw new UnauthorizedException(error.message);
				} else {
					throw error;
				}
			}),
		);
	}
}
