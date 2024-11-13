import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => this.log(req, res));
    next();
  }

  private log(req: Request, res: Response) {
    const { method, originalUrl, query, body } = req;
    const { statusCode } = res;

    const message = this.createLogMessage(
      method,
      statusCode,
      originalUrl,
      query,
      body,
    );

    if (statusCode >= 500) {
      this.logger.error(message);
    } else if (statusCode >= 400) {
      this.logger.warn(message);
    } else {
      this.logger.log(message);
    }
  }

  private createLogMessage(
    method: string,
    statusCode: number,
    url: string,
    query: any,
    body: any,
  ): string {
    let queryStr = '';
    let bodyStr = '';

    try {
      queryStr = JSON.stringify(query);
      bodyStr = JSON.stringify(body);
    } catch (error) {
      this.logger.warn(`Failed to stringify request data: ${error}`);
    }

    return `[${method.toUpperCase()} ${statusCode} ${url}] - [Body: ${bodyStr} | Query: ${queryStr}]`;
  }
}
