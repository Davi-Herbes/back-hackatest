import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	ConflictException,
	BadRequestException,
	NotFoundException,
} from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { ConflictError } from "../types/database-errors/conflict-errror";
import { UniqueConstraintError } from "../types/database-errors/unique-constraint-error";
import { NotFoundDbError } from "../types/database-errors/not-found-db-error";

@Injectable()
export class ConflictInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<unknown>,
	): Observable<unknown> | Promise<Observable<unknown>> {
		return next.handle().pipe(
			// Ele vai pegar o erro que acontecer e se for um UnauthorizedError ele vai ser responsável por esse erro
			catchError((error) => {
				if (error instanceof UniqueConstraintError) {
					throw new BadRequestException({
						message: error.message,
						field: error.uniqueField,
					});
				} else if (error instanceof NotFoundDbError) {
					throw new NotFoundException(error.message);
				} else if (error instanceof ConflictError) {
					throw new ConflictException(error.message);
				} else {
					throw error;
				}
			}),
		);
	}
}
