import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@boardpefocus/database';

interface ErrorResponseBody {
  error: string;
  message: string | string[];
  path: string;
  statusCode: number;
  timestamp: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<{ method: string; url: string }>();
    const response = ctx.getResponse<{
      status(code: number): { send(body: ErrorResponseBody): void };
    }>();

    const { body, statusCode } = this.buildResponseBody(exception, request.url);
    this.logException(exception, request.method, request.url, statusCode);

    response.status(statusCode).send(body);
  }

  private buildResponseBody(
    exception: unknown,
    path: string,
  ): { body: ErrorResponseBody; statusCode: number } {
    const timestamp = new Date().toISOString();

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          return {
            statusCode: HttpStatus.CONFLICT,
            body: {
              error: 'Conflict',
              message: 'A record with the same value already exists.',
              path,
              statusCode: HttpStatus.CONFLICT,
              timestamp,
            },
          };
        case 'P2025':
          return {
            statusCode: HttpStatus.NOT_FOUND,
            body: {
              error: 'Not Found',
              message: 'The requested record was not found.',
              path,
              statusCode: HttpStatus.NOT_FOUND,
              timestamp,
            },
          };
        default:
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            body: {
              error: 'Bad Request',
              message: 'The database request could not be completed.',
              path,
              statusCode: HttpStatus.BAD_REQUEST,
              timestamp,
            },
          };
      }
    }

    if (
      exception instanceof Prisma.PrismaClientValidationError ||
      exception instanceof Prisma.PrismaClientInitializationError
    ) {
      const statusCode =
        exception instanceof Prisma.PrismaClientInitializationError
          ? HttpStatus.SERVICE_UNAVAILABLE
          : HttpStatus.BAD_REQUEST;

      return {
        statusCode,
        body: {
          error:
            statusCode === HttpStatus.SERVICE_UNAVAILABLE
              ? 'Service Unavailable'
              : 'Bad Request',
          message:
            statusCode === HttpStatus.SERVICE_UNAVAILABLE
              ? 'Database connectivity is unavailable.'
              : 'The request payload is invalid for this operation.',
          path,
          statusCode,
          timestamp,
        },
      };
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        return {
          statusCode,
          body: {
            error: exception.name,
            message: exceptionResponse,
            path,
            statusCode,
            timestamp,
          },
        };
      }

      const error =
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'error' in exceptionResponse &&
        typeof exceptionResponse.error === 'string'
          ? exceptionResponse.error
          : exception.name;

      const message =
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
          ? (exceptionResponse.message as string | string[])
          : exception.message;

      return {
        statusCode,
        body: {
          error,
          message,
          path,
          statusCode,
          timestamp,
        },
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred.',
        path,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp,
      },
    };
  }

  private logException(
    exception: unknown,
    method: string,
    path: string,
    statusCode: number,
  ) {
    const message = `${method} ${path} -> ${statusCode}`;
    const trace =
      exception instanceof Error ? exception.stack : JSON.stringify(exception);

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(message, trace);
      return;
    }

    this.logger.warn(message);
  }
}
