import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

type ErrorPayload = {
  error?: unknown;
  message?: unknown;
};

function isErrorPayload(value: unknown): value is ErrorPayload {
  return typeof value === 'object' && value !== null;
}

function getMessage(payload: unknown, status: number): string | string[] {
  if (typeof payload === 'string') {
    return payload;
  }

  if (isErrorPayload(payload)) {
    if (typeof payload.message === 'string') {
      return payload.message;
    }

    if (
      Array.isArray(payload.message) &&
      payload.message.every((message) => typeof message === 'string')
    ) {
      return payload.message;
    }
  }

  return status === HttpStatus.INTERNAL_SERVER_ERROR
    ? 'Internal server error'
    : 'Request failed';
}

function getError(payload: unknown, status: number): string {
  if (isErrorPayload(payload) && typeof payload.error === 'string') {
    return payload.error;
  }

  const statusName = HttpStatus[status];
  return typeof statusName === 'string' ? statusName : 'Error';
}

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException ? exception.getResponse() : undefined;

    response.status(status).json({
      statusCode: status,
      error: getError(payload, status),
      message: getMessage(payload, status),
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
    });
  }
}
