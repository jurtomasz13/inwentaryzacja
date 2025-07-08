import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  private readonly isDev = process.env.NODE_ENV === 'development';

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const internalServerError = 'Internal server error';
    const type = exception?.constructor.name;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = internalServerError;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof Error) {
      message = this.isDev ? exception.message : internalServerError;
      exception = {
        name: exception.name,
        message: exception.message,
        stack: exception.stack,
      };
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      // Include stack trace in development mode for debugging
      ...(this.isDev && {
        meta: {
          exception,
          type,
          filter: GenericExceptionFilter.name,
        },
      }),
    });
  }
}
