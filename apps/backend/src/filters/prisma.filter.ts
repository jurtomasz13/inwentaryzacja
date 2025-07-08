import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientValidationError
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly isDev = process.env.NODE_ENV === 'development';

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const internalServerError = 'Internal server error';
    const type = exception?.constructor.name;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = internalServerError;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (exception.code) {
        case 'P2002': // Unique constraint failed
          status = HttpStatus.CONFLICT;

          // eslint-disable-next-line no-case-declarations
          const fields = Array.isArray(exception.meta?.target)
            ? exception.meta.target.join(', ')
            : exception.meta?.target || 'unknown field';

          message = this.isDev
            ? `Unique constraint failed on fields: ${exception.meta?.target}`
            : `An entry with the same ${fields} already exists. Please use different value(s).`;
          break;

        case 'P2025': // Record not found
          status = HttpStatus.NOT_FOUND;
          message = this.isDev ? exception.message : 'Resource not found.';
          break;

        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = this.isDev
            ? `Prisma error [${exception.code}]: ${exception.message}`
            : internalServerError;
          break;
      }
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = this.isDev ? exception.message : internalServerError;
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = this.isDev
        ? `Prisma engine panic: ${exception.message}`
        : internalServerError;
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = this.isDev
        ? `Prisma initialization error: ${exception.message}`
        : internalServerError;
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = this.isDev ? exception.message : 'Validation error.';
    }

    // Send response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...(this.isDev &&
        typeof exception === 'object' && {
          meta: { exception, type, filter: PrismaExceptionFilter.name },
        }),
    });
  }
}
