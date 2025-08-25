/**
 * Logger utility using Winston.
 *
 * - Provides a centralized logging system for the application.
 * - Supports different log levels (info, warn, error, etc.).
 * - Configured with console transport (can be extended with file or external transports).
 * - Formats logs with timestamp and colors for readability.
 */

import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

/**
 * Custom log output format.
 */
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

/**
 * Winston logger instance.
 *
 * Example usage:
 * ```ts
 * logger.info("Server started");
 * logger.error("An error occurred");
 * ```
 */
export const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    /**
     * Example: enable file logging
     * new winston.transports.File({ filename: "app.log" }),
     */
  ],
});
