import * as chalk from 'chalk';
import { format, transports } from 'winston';

export const developLog = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ context, level, message, time }) => {
          const appStr = chalk.yellow(`[NEST]`);
          const contextStr = chalk.yellow(`[${context}]`);
          return `${appStr} ${time} ${level} ${contextStr} ${message} `;
        }),
      ),
    }),
    new transports.File({
      format: format.combine(format.timestamp(), format.json()),
      filename: '111.log',
      dirname: 'log',
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'error.log',
      dirname: 'log',
    }),
  ],
};
