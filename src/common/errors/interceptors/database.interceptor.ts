import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { DatabaseError } from "../types/database-errors/database-error";
import { isPrismaError } from "../utils/is-prisma-error";
import { handleDatabaseErrors } from "../utils/handle-database-errors";

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<unknown> | Promise<Observable<unknown>> {
		return next.handle().pipe(
			// Ele vai pegar o erro que acontecer e se for um UnauthorizedError ele vai ser responsável pelo erro
			catchError((reciviedError) => {
				let error = reciviedError;
				if (isPrismaError(reciviedError)) {
					// error vai ser definido a partir do código dele
					error = handleDatabaseErrors(reciviedError);
				}
				if (error instanceof DatabaseError) {
					throw new BadRequestException();
				} else {
					// Se o erro não for do DatabaseError vai ter outro interceptor para pega-lo
					throw error;
				}
			}),
		);
	}
}
