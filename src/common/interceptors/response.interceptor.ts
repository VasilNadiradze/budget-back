import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { HttpException } from '@nestjs/common';
  import { Observable, of, throwError } from 'rxjs';
  import { catchError, map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => ({
          success: true,
          statusCode: 200,
          message: "დასრულდა წარმატებით",
          data,
        })),
        catchError((error) => {
          if (error instanceof HttpException) {
            const statusCode = error.getStatus();
            const response = error.getResponse();
            const message =
              typeof response === 'string'
                ? response
                : (response as { message?: string }).message || 'დაუმუშავებელი შეცდომა';
  
            return throwError(
              () =>
                new HttpException(
                  {
                    success: false,
                    statusCode: statusCode,
                    message,
                  },
                  statusCode
                )
            );
          }
  
          return throwError(() =>
            of({
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'დაუმუშავებელი შეცდომა',
            })
          );
        })
      );
    }
  }
  