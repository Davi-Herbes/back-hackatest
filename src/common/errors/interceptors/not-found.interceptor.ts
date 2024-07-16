import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	NotFoundException,
} from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { NotFoundError } from "../types/not-found-error";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<unknown>,
	): Observable<unknown> | Promise<Observable<unknown>> {
		return next.handle().pipe(
			// Ele vai pegar o erro que acontecer e se for um UnauthorizedError ele vai ser responsável pelo erro
			catchError((error) => {
				if (error instanceof NotFoundError) {
					throw new NotFoundException(error.message);
				} else {
					throw error;
				}
			}),
		);
	}
}
