import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as Filter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionFilter implements Filter {
  private readonly logger = new Logger(ExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.message;

    const logMessage = this.createLogMessage(
      request.method,
      status,
      request.originalUrl,
      message,
      request.body,
      request.query,
    );

    if (status >= 500) {
      this.logger.error(logMessage);
    } else if (status >= 400) {
      this.logger.warn(logMessage);
    } else {
      this.logger.log(logMessage);
    }

    response.status(status).json({
      statusCode: status,
      message: message || 'Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private createLogMessage(
    method: string,
    statusCode: number,
    url: string,
    message: string,
    body: any,
    query: any,
  ): string {
    let bodyStr = '';
    let queryStr = '';

    try {
      bodyStr = JSON.stringify(body);
      queryStr = JSON.stringify(query);
    } catch (error) {
      this.logger.warn(`Failed to stringify request data: ${error}`);
    }

    return `[${method.toUpperCase()} ${statusCode} ${url}] - [Body: ${bodyStr} | Query: ${queryStr}] - Message: ${message}`;
  }
}
