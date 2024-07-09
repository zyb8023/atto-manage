import * as chalk from 'chalk';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const customFormat = format.combine(
  format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
  format.align(),
  format.printf((i) => `${i.level}: [${i.context}]: ${[i.time]}: ${i.message}`),
);

const defaultOptions = {
  format: customFormat,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

export const developLog = {
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(({ context, level, message, time }) => {
          const appStr = chalk.yellow(`[NEST]`);
          const contextStr = chalk.yellow(`[${context}]`);
          return `${appStr} ${time} ${level} ${contextStr} ${message} `;
        }),
      ),
    }),
    new transports.DailyRotateFile({
      level: 'info',
      filename: 'logs/info-%DATE%.log',
      ...defaultOptions,
    }),
    new transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      ...defaultOptions,
    }),
  ],
};
