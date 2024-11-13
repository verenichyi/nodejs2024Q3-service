import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
} from '@nestjs/common';
import { join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { mkdir, writeFile, stat } from 'node:fs/promises';

import 'dotenv/config';

enum LogLevel {
  ERROR = 'error', // index 0
  WARN = 'warn', // index 1
  LOG = 'log', // index 2
  VERBOSE = 'verbose', // index 3
  DEBUG = 'debug', // index 4
}

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logLevel: number;
  private readonly maxFileSizeKB: number;
  private readonly logDirectory: string;
  private logPrefix: number;

  constructor(context: string, options: ConsoleLoggerOptions) {
    super(context, { ...options, logLevels: Object.values(LogLevel) });

    this.logLevel = Number(process.env.LOG_LEVEL) || 2;
    this.maxFileSizeKB = Number(process.env.MAX_LOG_SIZE_KB) || 10;
    this.logPrefix = Date.now();
    this.logDirectory = join(process.cwd(), 'logs');

    this.initProcessEvents();
  }

  async error(message: string, context?: string) {
    await this.logMessage(LogLevel.ERROR, message, context);
  }

  async warn(message: string, context?: string) {
    await this.logMessage(LogLevel.WARN, message, context);
  }

  async log(message: string, context?: string) {
    await this.logMessage(LogLevel.LOG, message, context);
  }

  async verbose(message: string, context?: string) {
    await this.logMessage(LogLevel.VERBOSE, message, context);
  }

  async debug(message: string, context?: string) {
    await this.logMessage(LogLevel.DEBUG, message, context);
  }

  private initProcessEvents() {
    process.on('unhandledRejection', (error) =>
      this.handleProcessError('Unhandled Rejection', error),
    );
    process.on('uncaughtException', (error) => {
      this.handleProcessError('Uncaught Exception', error);
      process.exit(1);
    });
  }

  private handleProcessError(label: string, error: any) {
    const stack = error instanceof Error ? error.stack : String(error);
    this.error(`${label}: ${stack}`);
  }

  private async logMessage(level: LogLevel, message: string, context?: string) {
    if (this.shouldLog(level)) {
      const formattedMessage = this.formatMessage(level, message, context);
      super[level](formattedMessage);
      await this.writeToFile(level, formattedMessage);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levelIndex = Object.values(LogLevel).indexOf(level);
    return levelIndex <= this.logLevel;
  }

  private async writeToFile(level: LogLevel, message: string) {
    try {
      if (!existsSync(this.logDirectory)) {
        await mkdir(this.logDirectory, { recursive: true });
      }

      let filePath = this.getLogFilePath(level);
      const { size } = await stat(filePath).catch(() => ({ size: 0 }));

      if (size / 1000 >= this.maxFileSizeKB) {
        this.logPrefix = Date.now();
        filePath = this.getLogFilePath(level);
      }

      await writeFile(filePath, message, { flag: 'a' });
    } catch (error) {
      super.error(`Failed to write log: ${error}`);
    }
  }

  private getLogFilePath(level: LogLevel): string {
    const fileName = `${this.logPrefix}-${
      level === LogLevel.ERROR ? 'errors' : 'logs'
    }.log`;
    return resolve(this.logDirectory, fileName);
  }

  public formatMessage(
    level: LogLevel,
    message: string,
    context?: string,
  ): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${
      context || ''
    }] - ${message}\n`;
  }
}
