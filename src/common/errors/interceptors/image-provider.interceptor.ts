import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { ImageProviderError } from "../types/image-provider-error";

@Injectable()
export class ImageProviderInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<unknown>,
	): Observable<unknown> | Promise<Observable<unknown>> {
		return next.handle().pipe(
			// Ele vai pegar o erro que acontecer e se for um UnauthorizedError ele vai ser responsável pelo erro
			catchError((error) => {
				if (error instanceof ImageProviderError) {
					throw new BadRequestException(error.message);
				} else {
					throw error;
				}
			}),
		);
	}
}
